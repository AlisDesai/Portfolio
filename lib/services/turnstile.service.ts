const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileVerificationResult {
  success: boolean;
  error?: string;
}

interface TurnstileApiResponse {
  success: boolean;
  "error-codes"?: string[];
}

/** Verifies a Cloudflare Turnstile token server-side -- the free,
 * Cloudflare-native CAPTCHA alternative, chosen because it needs no
 * external state (no KV/session store) and is a first-class fit for a site
 * that's already deploying to Cloudflare. */
export async function verifyTurnstileToken(
  token: string,
  remoteIp: string | null
): Promise<TurnstileVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile isn't configured yet (e.g. local development before keys
  // are provisioned), don't hard-fail the whole form -- just skip this
  // layer of protection. In production, set TURNSTILE_SECRET_KEY.
  if (!secretKey) {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "Bot verification failed. Please try again." };
  }

  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      return { success: false, error: "Bot verification service is unavailable." };
    }

    const result = (await response.json()) as TurnstileApiResponse;
    if (!result.success) {
      return { success: false, error: "Bot verification failed. Please try again." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Bot verification service is unavailable." };
  }
}
