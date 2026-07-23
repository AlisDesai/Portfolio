import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/services/email.service";
import { checkContactRateLimit } from "@/lib/services/rate-limit.service";
import { verifyTurnstileToken } from "@/lib/services/turnstile.service";
import { ContactFormSchema, validateAttachment } from "@/lib/validators/contact";

// Edge runtime -- no Node.js APIs (fs, Buffer, net, ...), so this route runs
// unmodified on Cloudflare's Workers-based Edge Runtime once deployed.
export const runtime = "edge";

// Bots that fill the form out programmatically (rather than via the real
// UI) typically submit within a few hundred ms of the page loading. A real
// visitor needs at least this long to read the form and type something.
const MIN_SUBMIT_DELAY_MS = 1500;

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function getClientIp(request: NextRequest): string | null {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null
  );
}

export async function POST(request: NextRequest) {
  // --- Origin check --------------------------------------------------
  // Lightweight CSRF-style guard: this endpoint has no session/cookie auth
  // to exploit, but checking Origin still blocks the "some other site
  // scripts a submission using a visitor's browser" abuse case. Browsers
  // always send Origin on cross-origin AND same-origin POSTs with a body.
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return jsonError("Request origin not allowed.", 403);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonError("Could not read form data.", 400);
  }

  // --- Honeypot --------------------------------------------------------
  // Hidden field a real visitor never sees or fills; bots that blindly fill
  // every input trip it. Respond as if it succeeded so we don't teach the
  // bot which field gave it away.
  const honeypot = formData.get("company_website");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  // --- Timing check ------------------------------------------------------
  const renderedAtRaw = formData.get("form_rendered_at");
  const renderedAt = typeof renderedAtRaw === "string" ? Number.parseInt(renderedAtRaw, 10) : NaN;
  if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_SUBMIT_DELAY_MS) {
    return jsonError("Please try submitting again.", 400);
  }

  const ip = getClientIp(request);

  // --- Bot verification (Turnstile) --------------------------------------
  const turnstileToken = formData.get("turnstileToken");
  const turnstileResult = await verifyTurnstileToken(
    typeof turnstileToken === "string" ? turnstileToken : "",
    ip
  );
  if (!turnstileResult.success) {
    return jsonError(turnstileResult.error ?? "Verification failed.", 403);
  }

  // --- Rate limiting -------------------------------------------------
  const rateLimit = await checkContactRateLimit(ip);
  if (rateLimit.limited) {
    return jsonError(rateLimit.error ?? "Too many requests.", 429);
  }

  // --- Field validation ------------------------------------------------
  let interests: unknown = [];
  const interestsRaw = formData.get("interests");
  if (typeof interestsRaw === "string" && interestsRaw.length > 0) {
    try {
      interests = JSON.parse(interestsRaw);
    } catch {
      return jsonError("Invalid interests payload.", 400);
    }
  }

  const parsed = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    interests,
    budget: formData.get("budget") || null,
    timeline: formData.get("timeline") || null,
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return jsonError(firstIssue?.message ?? "Please check the form and try again.", 400);
  }

  // --- Attachment validation ------------------------------------------
  const attachmentField = formData.get("attachment");
  let attachment: { filename: string; content: ArrayBuffer; mime: string } | undefined;

  if (attachmentField instanceof File && attachmentField.size > 0) {
    const buffer = await attachmentField.arrayBuffer();
    const validation = validateAttachment(attachmentField, new Uint8Array(buffer));
    if (!validation.valid) {
      return jsonError(validation.error ?? "Invalid attachment.", 400);
    }
    attachment = {
      filename: attachmentField.name,
      content: buffer,
      mime: validation.detectedMime as string,
    };
  }

  // --- Send ---------------------------------------------------------
  const result = await sendContactEmail({
    data: parsed.data,
    submittedAt: new Date(),
    ip,
    userAgent: request.headers.get("user-agent"),
    attachment,
  });

  if (!result.success) {
    return jsonError(result.error ?? "Could not send your message. Please try again.", 502);
  }

  return NextResponse.json({ success: true });
}
