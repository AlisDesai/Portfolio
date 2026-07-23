import { NextRequest, NextResponse } from "next/server";
import { sendCollaborateEmail } from "@/lib/services/collaborate-email.service";
import { checkContactRateLimit } from "@/lib/services/rate-limit.service";
import { verifyTurnstileToken } from "@/lib/services/turnstile.service";
import { CollaborateFormSchema } from "@/lib/validators/collaborate";

// Edge runtime -- same reasoning as app/api/contact/route.ts: no Node.js-only
// APIs, so this runs unmodified on Cloudflare's Workers-based Edge Runtime.
export const runtime = "edge";

// Mirrors app/api/contact/route.ts's bot-timing threshold -- kept as a
// separate literal (not imported) since these two routes are intentionally
// independent modules.
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

  // Honeypot -- see app/api/contact/route.ts for the same pattern.
  const honeypot = formData.get("company_website");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const renderedAtRaw = formData.get("form_rendered_at");
  const renderedAt = typeof renderedAtRaw === "string" ? Number.parseInt(renderedAtRaw, 10) : NaN;
  if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_SUBMIT_DELAY_MS) {
    return jsonError("Please try submitting again.", 400);
  }

  const ip = getClientIp(request);

  const turnstileToken = formData.get("turnstileToken");
  const turnstileResult = await verifyTurnstileToken(
    typeof turnstileToken === "string" ? turnstileToken : "",
    ip
  );
  if (!turnstileResult.success) {
    return jsonError(turnstileResult.error ?? "Verification failed.", 403);
  }

  const rateLimit = await checkContactRateLimit(ip);
  if (rateLimit.limited) {
    return jsonError(rateLimit.error ?? "Too many requests.", 429);
  }

  const parsed = CollaborateFormSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return jsonError(firstIssue?.message ?? "Please enter a valid email address.", 400);
  }

  const result = await sendCollaborateEmail({
    data: parsed.data,
    submittedAt: new Date(),
    ip,
    userAgent: request.headers.get("user-agent"),
  });

  if (!result.success) {
    return jsonError(result.error ?? "Could not send. Please try again.", 502);
  }

  return NextResponse.json({ success: true });
}
