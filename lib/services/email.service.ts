import { COMPANY_CONTACT } from "@/components/features/contact/contact-data";
import { siteConfig } from "@/config/metadata";
import { escapeHtml, fileExtensionOf, type ContactFormData } from "@/lib/validators/contact";

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

// --- Email template building blocks --------------------------------------
//
// All email HTML below is deliberately hand-rolled with inline styles and a
// table-based skeleton (rather than flexbox/grid or a <style> block Outlook's
// Word rendering engine would ignore). Rounded corners and shadows are used
// as progressive enhancement -- Outlook desktop simply shows flat, square
// corners instead of erroring, which is the expected, accepted tradeoff for
// this class of client. Every section stacks in a single column so nothing
// depends on a responsive breakpoint to stay readable on a phone.

const COLOR = {
  darkBg: "#09090b",
  accent: "#818cf8",
  accentSoft: "#a5b4fc",
  accentTint: "#eef0fe",
  ink: "#111827",
  muted: "#6b7280",
  faint: "#9ca3af",
  border: "#eef0f4",
  cardBg: "#fafafa",
} as const;

const FONT_STACK = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO_STACK = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

/** A section eyebrow + stacked "label above value" fields -- reuses the same
 * small-caps, letter-spaced label treatment already used site-wide (e.g. the
 * contact form's own "ATTACHMENT" / step-marker labels), so the email reads
 * as an extension of the brand rather than a generic notification. */
function fieldBlock(label: string, valueHtml: string, isLast = false): string {
  return `
    <div style="margin-bottom:${isLast ? 0 : 18}px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${COLOR.faint};">${escapeHtml(label)}</p>
      <p style="margin:0;font-size:16px;line-height:1.4;font-weight:600;color:${COLOR.ink};">${valueHtml}</p>
    </div>`;
}

function mutedValue(text: string): string {
  return `<span style="font-weight:500;color:${COLOR.faint};">${escapeHtml(text)}</span>`;
}

function pill(text: string): string {
  return `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 12px;border-radius:999px;background-color:${COLOR.accentTint};font-size:13px;font-weight:600;color:#4338ca;">${escapeHtml(text)}</span>`;
}

/** A section wrapper: small accent eyebrow title, a top divider (except the
 * very first section), generous vertical rhythm. */
function section(eyebrow: string, innerHtml: string, first = false): string {
  return `
    <tr>
      <td style="padding:${first ? "32px" : "26px"} 40px 0;${first ? "" : `border-top:1px solid ${COLOR.border};`}">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-top:${first ? 0 : 26}px;padding-bottom:26px;">
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${COLOR.accent};">${escapeHtml(eyebrow)}</p>
              ${innerHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

/** Builds the HTML body for the inquiry notification email -- a branded,
 * card-based, single-column layout: dark header (name + badge + timestamp),
 * a Contact Information section, a Project Details section (budget/timeline/
 * interests as tags), a highlighted Message card, an Attachment chip, and a
 * subtle metadata footer. */
export function buildContactEmailHtml(context: ContactEmailContext): string {
  const { data, submittedAt, ip, userAgent, attachment } = context;

  const contactSection = [
    fieldBlock("Name", escapeHtml(data.name)),
    fieldBlock(
      "Email",
      `<a href="mailto:${escapeHtml(data.email)}" style="color:${COLOR.accent};text-decoration:none;">${escapeHtml(data.email)}</a>`,
      true
    ),
  ].join("");

  const interestsHtml =
    data.interests.length > 0 ? data.interests.map(pill).join("") : mutedValue("None selected");

  const projectSection = [
    fieldBlock("Budget", data.budget ? escapeHtml(data.budget) : mutedValue("Not specified")),
    fieldBlock("Timeline", data.timeline ? escapeHtml(data.timeline) : mutedValue("Not specified")),
    fieldBlock("Services", interestsHtml, true),
  ].join("");

  const messageSection = `
    <div style="background-color:${COLOR.cardBg};border-left:3px solid ${COLOR.accent};border-radius:0 12px 12px 0;padding:20px 22px;">
      <p style="margin:0;font-size:15px;line-height:1.7;color:#1f2937;white-space:pre-wrap;word-break:break-word;overflow-wrap:break-word;">${escapeHtml(data.message)}</p>
    </div>`;

  const attachmentSection = attachment
    ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLOR.cardBg};border:1px solid ${COLOR.border};border-radius:12px;">
      <tr>
        <td style="width:56px;padding:16px 0 16px 16px;">
          <div style="width:36px;height:36px;border-radius:10px;background-color:${COLOR.darkBg};text-align:center;line-height:36px;font-size:16px;">📎</div>
        </td>
        <td style="padding:16px 16px 16px 12px;">
          <p style="margin:0 0 2px;font-size:15px;font-weight:600;color:${COLOR.ink};word-break:break-all;">${escapeHtml(attachment.filename)}</p>
          <p style="margin:0;font-size:12px;color:${COLOR.faint};">${escapeHtml(fileExtensionOf(attachment.filename).replace(".", "").toUpperCase())} · Attached to this email</p>
        </td>
      </tr>
    </table>`
    : `<p style="margin:0;font-size:14px;color:${COLOR.faint};">No attachment provided.</p>`;

  const metaLines = [`Submitted ${formatDateTime(submittedAt)}`];
  if (ip) metaLines.push(`IP ${ip}`);
  if (userAgent) metaLines.push(userAgent);

  const metaHtml = metaLines
    .map(
      (line, index) =>
        `<p style="margin:0 0 ${index === metaLines.length - 1 ? 0 : 4}px;font-family:${MONO_STACK};font-size:12px;color:${COLOR.faint};word-break:break-all;">${escapeHtml(line)}</p>`
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f4f4f6;font-family:${FONT_STACK};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:20px;border:1px solid ${COLOR.border};box-shadow:0 20px 60px -24px rgba(17,24,39,0.18);">
            <tr>
              <td style="background-color:${COLOR.darkBg};padding:36px 40px;border-radius:19px 19px 0 0;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:9px;">
                      <div style="width:8px;height:8px;border-radius:50%;background-color:${COLOR.accent};"></div>
                    </td>
                    <td>
                      <span style="font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.55);">${escapeHtml(siteConfig.name)}</span>
                    </td>
                  </tr>
                </table>
                <div style="margin-top:22px;">
                  <span style="display:inline-block;padding:5px 12px;border-radius:999px;background-color:rgba(129,140,248,0.16);border:1px solid rgba(129,140,248,0.4);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${COLOR.accentSoft};">New Inquiry</span>
                </div>
                <h1 style="margin:16px 0 6px;font-size:24px;line-height:1.35;font-weight:800;color:#ffffff;">${escapeHtml(data.name)} wants to start a project</h1>
                <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);">${escapeHtml(formatDateTime(submittedAt))}</p>
              </td>
            </tr>

            ${section("Contact Information", contactSection, true)}
            ${section("Project Details", projectSection)}
            ${section("Client Message", messageSection)}
            ${section("Attachment", attachmentSection)}

            <tr>
              <td style="padding:24px 40px 8px;border-top:1px solid ${COLOR.border};">
                ${metaHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;text-align:center;background-color:${COLOR.cardBg};border-radius:0 0 19px 19px;margin-top:16px;">
                <p style="margin:0;font-size:12px;color:${COLOR.faint};">Sent from the contact form at ${escapeHtml(siteConfig.url.replace(/^https?:\/\//, ""))}</p>
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
