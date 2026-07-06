import { env } from "@/config/env";

export const siteConfig = {
  name: "Harsh Patel",
  description: "Freelance Backend & Mobile Developer Portfolio",
  url: env.siteUrl,
} as const;
