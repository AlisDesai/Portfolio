import { COMPANY_CONTACT } from "@/components/features/contact/contact-data";
import { siteConfig } from "@/config/metadata";
import { escapeHtml, type ContactFormData } from "@/lib/validators/contact";

const RESEND_API_URL = "https://api.resend.com/emails";

export interface EmailAttachment {
  filename: string;
  /** Raw file bytes -- base64-encoded internally right before the API call. */
  content: ArrayBuffer;
  mime: string;
}

export interface ContactEmailContext {
  data: ContactFormData;
  submittedAt: Date;
  ip: string | null;
  userAgent: string | null;
  attachment?: EmailAttachment;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

/** Converts raw bytes to base64 in chunks -- spreading a large Uint8Array
 * directly into String.fromCharCode can overflow the call stack, and this
 * needs to work in the Edge runtime where Node's Buffer isn't guaranteed to
 * be available (it isn't on Cloudflare Workers without extra config). */
function bytesToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function formatDateTime(date: Date): string {
  return (
    date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }) + " UTC"
  );
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eef0f4;font-size:13px;font-weight:600;color:#6b7280;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eef0f4;font-size:15px;color:#111827;vertical-align:top;">${value}</td>
    </tr>`;
}

/** Builds the HTML body for the inquiry notification email -- a simple,
 * single-column, inline-styled layout so it renders consistently and
 * legibly across desktop and mobile mail clients. */
export function buildContactEmailHtml(context: ContactEmailContext): string {
  const { data, submittedAt, ip, userAgent, attachment } = context;

  const interestsHtml =
    data.interests.length > 0
      ? data.interests.map((interest) => escapeHtml(interest)).join(", ")
      : '<span style="color:#9ca3af;">None selected</span>';

  const rows = [
    row("Name", escapeHtml(data.name)),
    row(
      "Email",
      `<a href="mailto:${escapeHtml(data.email)}" style="color:#6366f1;text-decoration:none;">${escapeHtml(data.email)}</a>`
    ),
    row(
      "Budget",
      data.budget ? escapeHtml(data.budget) : '<span style="color:#9ca3af;">Not specified</span>'
    ),
    row(
      "Timeline",
      data.timeline
        ? escapeHtml(data.timeline)
        : '<span style="color:#9ca3af;">Not specified</span>'
    ),
    row("Interests", interestsHtml),
    row(
      "Attachment",
      attachment ? escapeHtml(attachment.filename) : '<span style="color:#9ca3af;">None</span>'
    ),
  ].join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f4f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#111827;padding:28px 32px;">
                <span style="color:#818cf8;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">New Inquiry</span>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:800;">${escapeHtml(siteConfig.name)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                <p style="font-size:13px;font-weight:600;color:#6b7280;margin:16px 0 6px;">Message</p>
                <p style="font-size:15px;line-height:1.6;color:#111827;white-space:pre-wrap;margin:0;background-color:#f9fafb;border-radius:10px;padding:16px;">${escapeHtml(data.message)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 28px;border-top:1px solid #eef0f4;">
                <p style="font-size:12px;color:#9ca3af;margin:0 0 4px;">Submitted ${escapeHtml(formatDateTime(submittedAt))}</p>
                ${ip ? `<p style="font-size:12px;color:#9ca3af;margin:0 0 4px;">IP: ${escapeHtml(ip)}</p>` : ""}
                ${userAgent ? `<p style="font-size:12px;color:#9ca3af;margin:0;">${escapeHtml(userAgent)}</p>` : ""}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Plain-text fallback -- included alongside the HTML body for
 * deliverability (some spam filters and clients prefer/require it). */
export function buildContactEmailText(context: ContactEmailContext): string {
  const { data, submittedAt, ip, userAgent, attachment } = context;
  const lines = [
    `New inquiry from ${data.name} <${data.email}>`,
    "",
    `Budget: ${data.budget ?? "Not specified"}`,
    `Timeline: ${data.timeline ?? "Not specified"}`,
    `Interests: ${data.interests.length > 0 ? data.interests.join(", ") : "None selected"}`,
    `Attachment: ${attachment ? attachment.filename : "None"}`,
    "",
    "Message:",
    data.message,
    "",
    `Submitted ${formatDateTime(submittedAt)}`,
  ];
  if (ip) lines.push(`IP: ${ip}`);
  if (userAgent) lines.push(userAgent);
  return lines.join("\n");
}

/** Sends the inquiry notification email via Resend's HTTP API -- a plain
 * `fetch` call (no SDK) so this runs unmodified on Cloudflare's edge/Workers
 * runtime, which can't open raw SMTP sockets. */
export async function sendContactEmail(context: ContactEmailContext): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Email delivery is not configured (missing RESEND_API_KEY)." };
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || COMPANY_CONTACT.email;
  // Resend requires the "from" address to be on a domain verified with
  // them. This dev fallback (their universal test sender) works out of the
  // box but must be replaced with a verified address before going live --
  // see .env.example.
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "BrightWave Inquiries <onboarding@resend.dev>";

  const payload: Record<string, unknown> = {
    from: fromEmail,
    to: [toEmail],
    reply_to: context.data.email,
    subject: `General Inquiry from ${context.data.name}`,
    html: buildContactEmailHtml(context),
    text: buildContactEmailText(context),
  };

  if (context.attachment) {
    payload.attachments = [
      {
        filename: context.attachment.filename,
        content: bytesToBase64(context.attachment.content),
      },
    ];
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, error: `Email provider responded with status ${response.status}.` };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Could not reach the email provider." };
  }
}
