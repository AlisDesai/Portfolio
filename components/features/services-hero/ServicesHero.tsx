"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { ServicesFloatingPills } from "@/components/features/services-hero/ServicesFloatingPills";
import { ServicesHeroCollage } from "@/components/features/services-hero/ServicesHeroCollage";
import { ServicesMarquee } from "@/components/features/services-hero/ServicesMarquee";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// Entrance sequence (seconds): background collage -> spotlight -> title lines
// (staggered) -> floating pills (see ServicesFloatingPills' own delay).
const TITLE_START = 0.8;
const TITLE_STAGGER = 0.3;
const TITLE_LINE_DURATION = 0.7;
const SPOTLIGHT_DELAY = 0.4;

const titleContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: TITLE_STAGGER, delayChildren: TITLE_START } },
};

const titleLine: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TITLE_LINE_DURATION, ease: EASE_PREMIUM },
  },
};

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // Content fades and lifts slightly while scrolling; the background collage
  // and vignette stay completely still (no parallax).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh min-h-[640px] w-full items-center justify-center overflow-hidden bg-[#080808]"
    >
      <ServicesHeroCollage reduceMotion={reduceMotion} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: SPOTLIGHT_DELAY, ease: EASE_PREMIUM }}
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(99,102,241,0.22)_0%,transparent_55%)]"
      />

      <ServicesFloatingPills reduceMotion={reduceMotion} />

      <motion.div
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-20 mx-auto max-w-[1600px] px-6 text-center sm:px-10 lg:px-16"
      >
        <motion.h1
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          className="font-display w-full text-[clamp(2.75rem,8vw,7.5rem)] leading-[1.05] tracking-tight uppercase"
        >
          <motion.span variants={titleLine} className="block font-extrabold text-white">
            Our
          </motion.span>
          <motion.span variants={titleLine} className="text-accent mt-2 block font-extrabold">
            Offered
          </motion.span>
          <motion.span variants={titleLine} className="mt-2 block font-normal text-white italic">
            Services
          </motion.span>
        </motion.h1>
      </motion.div>

      <ServicesMarquee reduceMotion={reduceMotion} />
    </section>
  );
}
