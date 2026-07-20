import { env } from "@/config/env";

export const siteConfig = {
  name: "BrightWave Solutions",
  description: "Freelance Backend & Mobile Developer Portfolio",
  url: env.siteUrl,
} as const;
