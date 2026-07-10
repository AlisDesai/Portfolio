"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";
import {
  CONTACT_FORM_FOCUS_EVENT,
  type ContactFormFocusEventDetail,
} from "@/lib/constants/assistant";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/**
 * Globally rendered, persistent floating avatar — fixed bottom-right on
 * every page (see app/layout.tsx). Clicking navigates to the Contact page.
 */
export function FloatingAssistant() {
  const reduceMotion = usePrefersReducedMotion();
  // Set true while a field on the Contact form is focused (see
  // app/contact/page.tsx), so the avatar can subtly lean into the moment.
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    function handleFocusChange(event: Event) {
      const { active } = (event as CustomEvent<ContactFormFocusEventDetail>).detail;
      setIsFormActive(active);
    }

    window.addEventListener(CONTACT_FORM_FOCUS_EVENT, handleFocusChange);
    return () => window.removeEventListener(CONTACT_FORM_FOCUS_EVENT, handleFocusChange);
  }, []);

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
        {/* Hover/tap layer — deliberately owns nothing but the gesture
            response. It never carries a looping `animate`, so it can never
            interrupt the idle layer nested inside it; a hover scale here
            just multiplies the idle motion underneath (transforms compose),
            which is what makes hover feel like it "amplifies" idle instead
            of replacing it. */}
        <motion.div
          whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          className="relative flex size-26 items-center justify-center sm:size-32"
        >
          {/* Idle layer — runs forever, untouched by hover/tap above. Four
              properties loop on four deliberately unsynchronized periods
              (6.4s / 7.8s / 9.2s / 5.6s) so their combined motion never
              lines up the same way twice in a normal viewing session,
              reading as organic drift rather than a mechanical loop. */}
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: isFormActive ? [0, -8, -3, -9, 0] : [0, -6, -2, -7, 0],
                    x: isFormActive ? [0, 2, -2, 1, 0] : [0, 2, -1.5, 1, 0],
                    rotate: isFormActive ? [-2, 2, -1, 2, -2] : [-1.5, 1.5, -1, 1.5, -1.5],
                    scale: isFormActive ? [1, 1.04, 1.01, 1.03, 1] : [1, 1.02, 1.005, 1.02, 1],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    y: { duration: isFormActive ? 3.2 : 6.4, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: isFormActive ? 4.1 : 7.8, repeat: Infinity, ease: "easeInOut" },
                    rotate: {
                      duration: isFormActive ? 3.6 : 9.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: isFormActive ? 2.6 : 5.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
            className="relative flex size-full items-center justify-center"
          >
            {/* CSS-only hover glow boost — deliberately a separate element
                from the perpetually-breathing glow below it, so the hover
                brightening never competes with Framer's inline style on the
                same property. */}
            <span
              aria-hidden="true"
              className="bg-accent pointer-events-none absolute inset-6 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40 sm:inset-7"
            />

            {/* Soft ambient glow, pulsing gently behind the inner badge only —
                the ring area around it stays clean and airy. A touch brighter
                while a Contact form field is focused, as a small, elegant
                acknowledgement of the user's attention. */}
            <motion.span
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { opacity: isFormActive ? [0.35, 0.55, 0.35] : [0.25, 0.45, 0.25] }
              }
              transition={
                reduceMotion ? undefined : { duration: 5.1, repeat: Infinity, ease: "easeInOut" }
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
        </motion.div>
      </Link>
    </motion.div>
  );
}
