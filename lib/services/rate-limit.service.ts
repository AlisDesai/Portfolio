// Minimal structural type for a Cloudflare KV namespace -- avoids taking a
// hard dependency on @cloudflare/workers-types just for one shape.
interface KVNamespaceLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

const WINDOW_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 5;

export interface RateLimitResult {
  limited: boolean;
  error?: string;
}

/** Looks for a KV binding named CONTACT_RATE_LIMIT_KV. On Cloudflare
 * (via the OpenNext or next-on-pages adapter) a bound KV namespace is
 * exposed through process.env once configured in wrangler config; until
 * that binding exists (e.g. local dev, or before it's provisioned) this
 * simply returns undefined and rate limiting is skipped rather than
 * breaking the form. */
function getRateLimitKV(): KVNamespaceLike | undefined {
  const binding = (process.env as Record<string, unknown>).CONTACT_RATE_LIMIT_KV;
  if (binding && typeof binding === "object" && "get" in binding && "put" in binding) {
    return binding as KVNamespaceLike;
  }
  return undefined;
}

/** Simple fixed-window IP rate limit: at most MAX_REQUESTS_PER_WINDOW
 * contact-form submissions per IP per WINDOW_SECONDS. Degrades to "not
 * limited" if no KV binding is present, so the form still works before KV
 * is provisioned -- see README notes in app/api/contact/route.ts. */
export async function checkContactRateLimit(ip: string | null): Promise<RateLimitResult> {
  if (!ip) return { limited: false };

  const kv = getRateLimitKV();
  if (!kv) return { limited: false };

  const key = `contact-rl:${ip}`;
  try {
    const raw = await kv.get(key);
    const count = raw ? Number.parseInt(raw, 10) : 0;

    if (count >= MAX_REQUESTS_PER_WINDOW) {
      return { limited: true, error: "Too many submissions. Please try again in a minute." };
    }

    await kv.put(key, String(count + 1), { expirationTtl: WINDOW_SECONDS });
    return { limited: false };
  } catch {
    // If KV is misbehaving, fail open rather than blocking legitimate users.
    return { limited: false };
  }
}
