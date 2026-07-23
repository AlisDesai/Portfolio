import { z } from "zod";
import {
  BUDGET_RANGES,
  PROJECT_INTERESTS,
  PROJECT_TIMELINES,
} from "@/components/features/contact/contact-data";

/** Matches against a plain readonly string list without fighting zod's enum
 * typing across versions -- simpler and just as strict as z.enum. */
function oneOf<T extends readonly string[]>(list: T) {
  return z
    .string()
    .refine((value): value is T[number] => (list as readonly string[]).includes(value), {
      message: "Not a recognized option.",
    });
}

function isControlChar(code: number): boolean {
  return code <= 0x1f || code === 0x7f;
}

/** Strips control characters (including CR/LF) from a single-line field and
 * collapses whitespace. Without this, a field that later gets treated as an
 * email header value (subject, a "from name", etc.) could be used to inject
 * extra header lines -- classic email header injection. */
function sanitizeSingleLine(value: string): string {
  let stripped = "";
  for (const ch of value) {
    if (!isControlChar(ch.charCodeAt(0))) stripped += ch;
  }
  return stripped.replace(/\s+/g, " ").trim();
}

/** Same idea for multi-line message text, but newlines are meaningful here so
 * only non-printable control characters (not newlines) are stripped. */
function sanitizeMultiLine(value: string): string {
  let stripped = "";
  for (const ch of value) {
    if (ch === "\n" || !isControlChar(ch.charCodeAt(0))) stripped += ch;
  }
  return stripped.trim();
}

const singleLine = (min: number, max: number) =>
  z
    .string()
    .transform(sanitizeSingleLine)
    .pipe(z.string().min(min, "Required.").max(max, "Too long."));

export const ContactFormSchema = z.object({
  name: singleLine(1, 100),
  email: z.string().trim().toLowerCase().max(254).email("Enter a valid email address."),
  message: z
    .string()
    .transform(sanitizeMultiLine)
    .pipe(z.string().min(1, "Tell us a bit about your project.").max(5000, "Too long.")),
  interests: z.array(oneOf(PROJECT_INTERESTS)).max(PROJECT_INTERESTS.length).default([]),
  budget: oneOf(BUDGET_RANGES).nullable().default(null),
  timeline: oneOf(PROJECT_TIMELINES).nullable().default(null),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/** HTML-escapes user text before it's interpolated into the email template --
 * without this, a message body containing e.g. an <img onerror=...> tag
 * would execute in any mail client that renders the HTML part. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// --- Attachment security -----------------------------------------------
//
// Extensions and browser-reported MIME types are both fully attacker
// controlled (a malicious .exe can be renamed to "invoice.pdf" and its
// `type` field can be spoofed in the multipart request). The only check
// that can't be spoofed this way is inspecting the file's actual leading
// bytes ("magic numbers") and confirming they match a real file of the
// claimed type. All three checks (extension, declared MIME, signature)
// must agree before a file is accepted -- a strict allowlist, not a
// blocklist, so nothing needs to be individually banned (.exe, .php, .svg,
// .zip, etc. are all rejected simply by not being on the list).

export const ALLOWED_ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedAttachmentMime = (typeof ALLOWED_ATTACHMENT_MIME_TYPES)[number];

export const ALLOWED_ATTACHMENT_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".webp"] as const;

export const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // 8MB

const EXTENSIONS_BY_MIME: Record<AllowedAttachmentMime, string[]> = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

interface ByteSignature {
  bytes: number[];
  offset?: number;
}

const MAGIC_BYTE_SIGNATURES: Record<AllowedAttachmentMime, ByteSignature[]> = {
  "application/pdf": [{ bytes: [0x25, 0x50, 0x44, 0x46] }], // "%PDF"
  "image/jpeg": [{ bytes: [0xff, 0xd8, 0xff] }],
  "image/png": [{ bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }],
  // WEBP is a RIFF container: "RIFF" at byte 0, "WEBP" at byte 8 -- both
  // must match, since "RIFF" alone is shared with other formats (WAV, AVI).
  "image/webp": [
    { bytes: [0x52, 0x49, 0x46, 0x46] },
    { bytes: [0x57, 0x45, 0x42, 0x50], offset: 8 },
  ],
};

function bytesMatch(buffer: Uint8Array, signature: ByteSignature): boolean {
  const offset = signature.offset ?? 0;
  if (buffer.length < offset + signature.bytes.length) return false;
  return signature.bytes.every((byte, index) => buffer[offset + index] === byte);
}

export function fileExtensionOf(filename: string): string {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex === -1 ? "" : filename.slice(dotIndex).toLowerCase();
}

/** Returns the allowed MIME type whose byte signature matches the buffer's
 * actual leading bytes, or null if it matches none of them. */
export function detectMimeFromSignature(buffer: Uint8Array): AllowedAttachmentMime | null {
  for (const mime of ALLOWED_ATTACHMENT_MIME_TYPES) {
    const signatures = MAGIC_BYTE_SIGNATURES[mime];
    if (signatures.every((signature) => bytesMatch(buffer, signature))) {
      return mime;
    }
  }
  return null;
}

export interface AttachmentValidationResult {
  valid: boolean;
  error?: string;
  detectedMime?: AllowedAttachmentMime;
}

/** Full attachment validation pipeline: size, extension allowlist, actual
 * byte-signature detection, and a cross-check that the extension and the
 * detected signature agree (catches both a disguised executable AND a real
 * PDF simply renamed to dodge an extension check). */
export function validateAttachment(file: File, buffer: Uint8Array): AttachmentValidationResult {
  if (file.size <= 0) {
    return { valid: false, error: "The attached file is empty." };
  }
  if (file.size > MAX_ATTACHMENT_BYTES) {
    return {
      valid: false,
      error: `Attachments must be under ${Math.round(MAX_ATTACHMENT_BYTES / (1024 * 1024))}MB.`,
    };
  }

  const extension = fileExtensionOf(file.name);
  if (!(ALLOWED_ATTACHMENT_EXTENSIONS as readonly string[]).includes(extension)) {
    return { valid: false, error: "Only PDF, JPG, PNG, and WEBP files are allowed." };
  }

  const detectedMime = detectMimeFromSignature(buffer);
  if (!detectedMime) {
    return {
      valid: false,
      error: "This file doesn't look like a valid PDF or image. Please try a different file.",
    };
  }

  if (!EXTENSIONS_BY_MIME[detectedMime].includes(extension)) {
    return { valid: false, error: "The file's extension doesn't match its actual content." };
  }

  return { valid: true, detectedMime };
}
