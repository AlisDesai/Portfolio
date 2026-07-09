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
      className="fixed right-5 bottom-5 z-40 sm:right-8 sm:bottom-8"
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
          className="relative flex size-[76px] items-center justify-center sm:size-[92px]"
        >
          {/* Soft ambient glow, pulsing gently behind the badge */}
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { opacity: [0.25, 0.45, 0.25] }}
            transition={
              reduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="bg-accent pointer-events-none absolute inset-[-14px] rounded-full opacity-30 blur-xl"
          />

          {/* Rotating "CONTACT" text ring */}
          <svg
            viewBox="0 0 100 100"
            className={
              reduceMotion
                ? "group-hover:text-accent absolute inset-0 size-full text-zinc-400 transition-colors duration-300"
                : "group-hover:text-accent absolute inset-0 size-full animate-[spin_16s_linear_infinite] text-zinc-400 transition-colors duration-300"
            }
            aria-hidden="true"
          >
            <defs>
              <path
                id="assistant-ring-path"
                d="M 50,50 m -46,0 a 46,46 0 1 1 92,0 a 46,46 0 1 1 -92,0"
              />
            </defs>
            <text
              fontSize="6"
              letterSpacing="2.5"
              fill="currentColor"
              className="font-mono uppercase"
            >
              <textPath href="#assistant-ring-path">
                {`${RING_LABEL} • ${RING_LABEL} • ${RING_LABEL} • `}
              </textPath>
            </text>
          </svg>

          {/* Inner avatar badge — the site owner's photo, cropped to a
              perfect circle. */}
          <div className="border-accent/15 relative size-[64px] overflow-hidden rounded-full border bg-zinc-50 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.15)] transition-shadow duration-300 group-hover:shadow-[0_14px_36px_-8px_rgba(129,140,248,0.35)] sm:size-[80px]">
            <Image
              src="/images/avatar.png"
              alt={siteConfig.name}
              fill
              sizes="(min-width: 640px) 80px, 64px"
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
