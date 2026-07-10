"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

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
      className="fixed right-1 bottom-8 z-40 sm:right-3 sm:bottom-1"
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
