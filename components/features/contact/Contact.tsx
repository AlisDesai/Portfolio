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

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// Staged reveal timeline (seconds): heading -> watermark -> logo -> input ->
// send button -> footer columns (each staggered) -> social icons last.
const HEADING_STAGGER = 0.15;
const WATERMARK_DELAY = 0.15;
const WATERMARK_FADE_DURATION = 1.4;
const LOGO_DELAY = 0.55;
const INPUT_DELAY = 0.75;
const BUTTON_DELAY = 0.95;
const COLUMNS_START_DELAY = 1.05;
const COLUMN_STAGGER = 0.12;
const SOCIALS_DELAY = 1.6;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reduceMotion = usePrefersReducedMotion();

  const headingContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: HEADING_STAGGER } },
  };

  const headingLine: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-28 md:py-36"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
        {/* Left: heading + watermark + logo */}
        <div className="relative flex flex-col justify-center">
          {/* Abstract brand watermark — purely decorative, bleeds past the
              section edge and is clipped by the section's own overflow-hidden. */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={
              isInView ? { opacity: 0.06, y: reduceMotion ? 0 : [0, -4, 0] } : { opacity: 0 }
            }
            transition={{
              opacity: { duration: WATERMARK_FADE_DURATION, delay: WATERMARK_DELAY },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: WATERMARK_DELAY + WATERMARK_FADE_DURATION,
              },
            }}
            className="bg-accent pointer-events-none absolute -top-24 -left-24 h-[130%] w-3/4 rounded-t-full"
          />

          <motion.h2
            variants={headingContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display relative text-[clamp(2rem,4vw,6rem)] leading-[0.95] font-extrabold tracking-tight"
          >
            <motion.span variants={headingLine} className="block text-black">
              Let&rsquo;s
            </motion.span>
            <motion.span variants={headingLine} className="text-accent block">
              Collaborate
            </motion.span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: LOGO_DELAY, ease: EASE_PREMIUM }}
            className="relative mt-14 flex items-center gap-3"
          >
            <AbstractLogoMark className="size-9 text-black sm:size-10" />
            <span className="font-display text-2xl font-bold text-black sm:text-3xl">
              {siteConfig.name}
            </span>
          </motion.div>
        </div>

        {/* Right: contact form + info grid + socials */}
        <div className="relative flex flex-col justify-center">
          <form className="flex items-end gap-4">
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Email"
                aria-label="Email address"
                className="peer w-full bg-transparent pb-3 text-lg text-black placeholder:text-black/30 placeholder:transition-opacity placeholder:duration-300 focus:outline-none sm:text-xl"
              />
              {/* Base line draws in left-to-right once on viewport entry. */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: INPUT_DELAY, ease: EASE_PREMIUM }}
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-black/10"
              />
              {/* Focus overlay — independent of the entrance animation above. */}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-black transition-transform duration-500 ease-out peer-focus:scale-x-100" />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: BUTTON_DELAY, ease: EASE_PREMIUM }}
            >
              <button
                type="submit"
                aria-label="Send message"
                className="group flex size-14 shrink-0 items-center justify-center rounded-full bg-black transition-transform duration-300 ease-out hover:scale-105"
              >
                <ArrowUpRightIcon className="size-5 text-white transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          </form>

          <div className="mt-20">
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
                className="hover:bg-accent/10 hover:text-accent flex size-10 items-center justify-center rounded-full text-black transition-all duration-300 ease-out hover:-translate-y-0.75"
              >
                <SocialIcon platform={social.name} className="size-4" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Full-bleed bottom bar — bleeds edge-to-edge, independent of the
          section's max-w-[1400px] content container. */}
      <div className="bg-accent relative z-10 mt-24 w-full py-4 md:mt-32">
        <p className="text-center text-xs font-medium text-white sm:text-sm">
          &copy;{new Date().getFullYear()} {siteConfig.name} | All rights reserved
        </p>
      </div>
    </section>
  );
}
