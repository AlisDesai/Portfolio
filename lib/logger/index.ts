import { env } from "@/config/env";

export const logger = {
  info: (...args: unknown[]) => {
    if (env.isDevelopment) console.info("[info]", ...args);
  },
  warn: (...args: unknown[]) => {
    if (env.isDevelopment) console.warn("[warn]", ...args);
  },
  error: (...args: unknown[]) => {
    if (env.isDevelopment) console.error("[error]", ...args);
  },
};
