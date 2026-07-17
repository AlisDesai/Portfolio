"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ContactInfoGrid } from "@/components/features/contact/ContactInfoGrid";
import { SOCIAL_LINKS } from "@/components/features/contact/contact-data";
import {
  AbstractLogoMark,
  ArrowUpRightIcon,
  SocialIcon,
} from "@/components/features/contact/icons";
import { siteConfig } from "@/config/metadata";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";
import { cn } from "@/lib/utils/cn";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// Staged reveal timeline (seconds): mark -> heading words (staggered) ->
// signature-line input -> send button -> footer columns (each staggered) ->
// social icons last.
const MARK_DELAY = 0.1;
const HEADING_START = 0.3;
const HEADING_STAGGER = 0.12;
const INPUT_DELAY = 0.95;
const BUTTON_DELAY = 1.15;
const COLUMNS_START_DELAY = 1.35;
const COLUMN_STAGGER = 0.12;
const SOCIALS_DELAY = 1.9;

interface ContactProps {
  /** Set to false to omit the "Let's Collaborate" CTA band and render only
   * the footer-info/social/copyright area — e.g. when the CTA already
   * appears elsewhere on the same page flow. */
  showCollaborateCta?: boolean;
}

export function Contact({ showCollaborateCta = true }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reduceMotion = usePrefersReducedMotion();

  const headingContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: HEADING_STAGGER, delayChildren: HEADING_START } },
  };

  const headingWord: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_PREMIUM } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white pt-10 md:pt-14"
    >
      {/* Full-bleed CTA band — an immersive dark canvas for the primary call
          to action (edge-to-edge, same "break out of the content container"
          technique already used by the bottom copyright bar below), distinct
          from the calm white footer-info area that follows it. */}
      {showCollaborateCta && (
        <div className="relative w-full overflow-hidden bg-black py-24 sm:py-32 lg:py-40">
          {/* Layered ambient glow — two soft blobs at different sizes/opacities
              for depth, reusing the site's existing accent color only. */}
          <div className="pointer-events-none absolute top-[-20%] right-[-15%] size-[60vw] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.18),transparent_65%)] blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-25%] left-[-15%] size-[45vw] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.08),transparent_65%)] blur-3xl" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: MARK_DELAY, ease: EASE_PREMIUM }}
              className="mb-14 flex items-center gap-3 lg:mb-20"
            >
              <AbstractLogoMark className="size-8 text-white/60" />
              <span className="font-display text-sm font-semibold tracking-wide text-white/60">
                {siteConfig.name}
              </span>
            </motion.div>

            {/* One flowing editorial statement instead of two stacked, boxed
                columns. */}
            <motion.h2
              variants={headingContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-display max-w-4xl text-[clamp(2.75rem,8vw,7rem)] leading-[1.02] font-extrabold tracking-tight wrap-break-word text-white"
            >
              <motion.span variants={headingWord} className="inline-block">
                Let&rsquo;s{" "}
              </motion.span>
              <motion.span
                variants={headingWord}
                className="text-accent inline-block max-[559px]:text-[clamp(1.625rem,calc(7.5vw+2px),2.75rem)]"
              >
                Collaborate
              </motion.span>
            </motion.h2>

            {/* Signature-line email CTA — a full-width underlined field instead
                of a boxed pill input. */}
            <motion.form
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: INPUT_DELAY, ease: EASE_PREMIUM }}
              className="focus-within:border-accent/60 mt-16 flex w-full max-w-2xl items-end gap-6 border-b border-white/20 pb-5 transition-colors duration-300 ease-out lg:mt-20"
            >
              <input
                type="email"
                placeholder="Email"
                aria-label="Email address"
                className="font-display w-full min-w-0 bg-transparent text-3xl text-white placeholder:text-white/25 placeholder:transition-opacity placeholder:duration-300 focus:outline-none sm:text-4xl"
              />

              <motion.button
                type="submit"
                aria-label="Send message"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: BUTTON_DELAY, ease: EASE_PREMIUM }}
                className="group flex size-14 shrink-0 items-center justify-center rounded-full bg-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)]"
              >
                <ArrowUpRightIcon className="size-5 text-black transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </motion.form>
          </div>
        </div>
      )}

      {/* Calm white footer-info area below the CTA band — ContactInfoGrid,
          socials, and their surrounding spacing are unchanged. */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="mt-16 sm:mt-20">
          <ContactInfoGrid
            isInView={isInView}
            reduceMotion={reduceMotion}
            startDelay={COLUMNS_START_DELAY}
            stagger={COLUMN_STAGGER}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: SOCIALS_DELAY, ease: EASE_PREMIUM }}
          className="mt-14 flex items-center justify-start gap-3 lg:justify-end"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--social-brand-color": social.brandColor } as React.CSSProperties}
              className={cn(
                "group flex size-11 items-center justify-center rounded-full bg-black text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.75 hover:shadow-lg",
                social.name === "Instagram"
                  ? "hover:bg-linear-to-tr hover:from-[#FFDC80] hover:via-[#E1306C] hover:to-[#833AB4]"
                  : "hover:bg-(--social-brand-color)"
              )}
            >
              <SocialIcon
                platform={social.name}
                className="size-4.5 transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Full-bleed bottom bar — bleeds edge-to-edge, independent of the
          section's max-w-[1400px] content container. */}
      <div className="bg-accent relative z-10 mt-12 w-full py-4 md:mt-16">
        <p className="font-jakarta text-center text-xs font-medium text-white sm:text-sm">
          &copy;{new Date().getFullYear()} {siteConfig.name} | All rights reserved
        </p>
      </div>
    </section>
  );
}
