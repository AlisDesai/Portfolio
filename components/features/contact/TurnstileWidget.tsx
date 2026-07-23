"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { env } from "@/config/env";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onToken: (token: string) => void;
}

/** Cloudflare Turnstile in its default "managed" mode -- it renders no
 * visible UI in the vast majority of cases (a token is produced
 * automatically), and only shows a small interactive challenge if
 * Cloudflare's risk analysis actually flags the visitor as suspicious. This
 * keeps the existing form's design untouched while adding real bot
 * protection. Skips rendering entirely if no site key is configured, so
 * local development without Turnstile keys still works. */
export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.turnstile) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: env.turnstileSiteKey,
      callback: (token: string) => onToken(token),
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onToken is a stable setter from the parent
  }, [scriptLoaded]);

  if (!env.turnstileSiteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div ref={containerRef} aria-hidden="true" />
    </>
  );
}
