import { env } from "@/config/env";

export const siteConfig = {
  name: "Portfolio",
  description: "Freelance Portfolio",
  url: env.siteUrl,
} as const;
