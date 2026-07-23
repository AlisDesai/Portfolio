import { COMPANY_CONTACT } from "@/components/features/contact/contact-data";
import { siteConfig } from "@/config/metadata";
import { escapeHtml } from "@/lib/validators/contact";
import type { CollaborateFormData } from "@/lib/validators/collaborate";

const RESEND_API_URL = "https://api.resend.com/emails";

// Same restrained palette as the main inquiry email (lib/services/email.service.ts)
// so the two notification emails read as one consistent brand -- kept as its
// own small copy rather than a shared import, so this feature stays fully
// independent of the main contact-form email module.
const COLOR = {
  darkBg: "#09090b",
  accent: "#818cf8",
  accentSoft: "#a5b4fc",
  ink: "#111827",
  faint: "#9ca3af",
  border: "#eef0f4",
  cardBg: "#fafafa",
} as const;

const FONT_STACK = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO_STACK = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

export interface CollaborateEmailContext {
  data: CollaborateFormData;
  submittedAt: Date;
  ip: string | null;
  userAgent: string | null;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
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

/** Builds the HTML body for the "Let's Collaborate" quick-inquiry email --
 * a lighter, single-purpose sibling of the main inquiry email template:
 * same branded dark header and card language, scaled down since there's
 * only one field of real data (the visitor's email). */
export function buildCollaborateEmailHtml(context: CollaborateEmailContext): string {
  const { data, submittedAt, ip, userAgent } = context;

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
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:20px;border:1px solid ${COLOR.border};box-shadow:0 20px 60px -24px rgba(17,24,39,0.18);">
            <tr>
              <td style="background-color:${COLOR.darkBg};padding:36px 40px;border-radius:19px 19px 0 0;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.55);">${escapeHtml(siteConfig.name)}</span>
                    </td>
                  </tr>
                </table>
                <div style="margin-top:22px;">
                  <span style="display:inline-block;padding:5px 12px;border-radius:999px;background-color:rgba(129,140,248,0.16);border:1px solid rgba(129,140,248,0.4);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${COLOR.accentSoft};">Let's Collaborate</span>
                </div>
                <h1 style="margin:16px 0 6px;font-size:22px;line-height:1.35;font-weight:800;color:#ffffff;">Someone wants to collaborate</h1>
                <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);">${escapeHtml(formatDateTime(submittedAt))}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px 8px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${COLOR.faint};">Email</p>
                <p style="margin:0;font-size:20px;font-weight:700;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color:${COLOR.accent};text-decoration:none;">${escapeHtml(data.email)}</a>
                </p>
                <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:${COLOR.ink};">
                  Submitted from the "Let&rsquo;s Collaborate" prompt on the landing page -- a quick, one-field signal of interest with no project details yet. Reach out to start the conversation.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 8px;border-top:1px solid ${COLOR.border};margin-top:24px;">
                ${metaHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;text-align:center;background-color:${COLOR.cardBg};border-radius:0 0 19px 19px;margin-top:16px;">
                <p style="margin:0;font-size:12px;color:${COLOR.faint};">Sent from the landing page at ${escapeHtml(siteConfig.url.replace(/^https?:\/\//, ""))}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Plain-text fallback, alongside the HTML body for deliverability. */
export function buildCollaborateEmailText(context: CollaborateEmailContext): string {
  const { data, submittedAt, ip, userAgent } = context;
  const lines = [
    "Someone wants to collaborate",
    "",
    `Email: ${data.email}`,
    "",
    `Submitted ${formatDateTime(submittedAt)}`,
  ];
  if (ip) lines.push(`IP: ${ip}`);
  if (userAgent) lines.push(userAgent);
  return lines.join("\n");
}

/** Sends the "Let's Collaborate" quick-inquiry email via Resend's HTTP API
 * -- mirrors lib/services/email.service.ts's sendContactEmail (plain fetch,
 * no SDK, Edge/Workers-safe), kept independent since this form has its own
 * much smaller payload (no attachments). */
export async function sendCollaborateEmail(
  context: CollaborateEmailContext
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Email delivery is not configured (missing RESEND_API_KEY)." };
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || COMPANY_CONTACT.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "BrightWave Inquiries <onboarding@resend.dev>";

  const payload = {
    from: fromEmail,
    to: [toEmail],
    reply_to: context.data.email,
    subject: `New "Let's Collaborate" inquiry from ${context.data.email}`,
    html: buildCollaborateEmailHtml(context),
    text: buildCollaborateEmailText(context),
  };

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
