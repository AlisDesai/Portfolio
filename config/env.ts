const requiredEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3008",
  // Public by design -- Turnstile's site key is meant to be embedded in the
  // page. The secret key stays server-only (read directly via
  // process.env.TURNSTILE_SECRET_KEY in lib/services/turnstile.service.ts,
  // never through this shared client-safe object).
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
} as const;

export const env = {
  siteUrl: requiredEnv.siteUrl,
  turnstileSiteKey: requiredEnv.turnstileSiteKey,
} as const;
