"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const RING_LABEL = "CONTACT";

/**
 * Globally rendered, persistent floating avatar — fixed bottom-right on
 * every page (see app/layout.tsx). Clicking navigates to the Contact page.
 */
export function FloatingAssistant() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: EASE_PREMIUM }}
      className="fixed right-5 bottom-8 z-40 sm:right-8 sm:bottom-2"
    >
      <Link
        href={ROUTES.CONTACT}
        aria-label="Contact — go to the Contact page"
        className="group relative block"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0], scale: [1, 1.03, 1] }}
          transition={
            reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -4 }}
          whileTap={{ scale: 0.96 }}
          className="relative flex size-26 items-center justify-center sm:size-32"
        >
          {/* Soft ambient glow, pulsing gently behind the inner badge only —
              the ring area around it stays clean and airy. */}
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { opacity: [0.25, 0.45, 0.25] }}
            transition={
              reduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="bg-accent pointer-events-none absolute inset-6 rounded-full opacity-30 blur-xl sm:inset-7"
          />

          {/* Rotating "contact" text ring — loose and airy, floating with
              generous breathing room around the badge. */}
          <svg
            viewBox="0 0 100 100"
            className={
              reduceMotion
                ? "group-hover:text-accent absolute inset-0 size-full text-zinc-900 transition-colors duration-300"
                : "group-hover:text-accent absolute inset-0 size-full animate-[spin_16s_linear_infinite] text-zinc-900 transition-colors duration-300"
            }
            aria-hidden="true"
          >
            <defs>
              <path
                id="assistant-ring-path"
                d="M 50,50 m -39,0 a 39,39 0 1 1 78,0 a 39,39 0 1 1 -78,0"
              />
            </defs>
            <text
              fontSize="7"
              letterSpacing="2.75"
              fill="currentColor"
              xmlSpace="preserve"
              className="font-mono font-medium lowercase"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.45))" }}
            >
              <textPath href="#assistant-ring-path" textLength="245.04" lengthAdjust="spacing">
                {`${RING_LABEL} - ${RING_LABEL} - ${RING_LABEL} - `}
              </textPath>
            </text>
          </svg>

          {/* Inner avatar badge — the site owner's photo, cropped to a
              perfect circle. */}
          <div className="border-accent/15 relative size-14 overflow-hidden rounded-full border bg-zinc-50 shadow-[0_12px_34px_-8px_rgba(0,0,0,0.22)] transition-shadow duration-300 group-hover:shadow-[0_16px_40px_-8px_rgba(129,140,248,0.4)] sm:size-18">
            <Image
              src="/images/avatar.png"
              alt={siteConfig.name}
              fill
              sizes="(min-width: 640px) 72px, 56px"
              quality={90}
              priority
              unoptimized
              className="rounded-full object-cover"
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
