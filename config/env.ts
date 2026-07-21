const requiredEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3008",
} as const;

export const env = {
  siteUrl: requiredEnv.siteUrl,
} as const;
