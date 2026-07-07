"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { ServicesFloatingPills } from "@/components/features/services-hero/ServicesFloatingPills";
import { ServicesHeroCollage } from "@/components/features/services-hero/ServicesHeroCollage";
import { ServicesMarquee } from "@/components/features/services-hero/ServicesMarquee";
import { ServicesHeroShowcase } from "@/components/features/services-hero/ServicesHeroShowcase";
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

  // Scroll mapping for the 500vh container.
  // 0.0 - 0.15 is the Intro phase.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.15], [1, 4]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0]);
  const marqueeY = useTransform(scrollYProgress, [0, 0.15], [0, 100]);

  return (
    <section ref={sectionRef} className="relative h-[500vh] w-full bg-[#080808]">
      <div className="sticky top-0 flex h-dvh min-h-[640px] w-full items-center justify-center overflow-hidden">
        {/* Intro Phase: Background Collage & Pills */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <ServicesHeroCollage reduceMotion={reduceMotion} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: SPOTLIGHT_DELAY, ease: EASE_PREMIUM }}
            className="absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(99,102,241,0.22)_0%,transparent_55%)]"
          />
          <ServicesFloatingPills reduceMotion={reduceMotion} />
        </motion.div>

        {/* Intro Phase: Massive Title */}
        <motion.div
          style={reduceMotion ? undefined : { opacity: textOpacity, scale: textScale }}
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

        {/* Intro Phase: Marquee sliding down */}
        <motion.div
          style={{ opacity: introOpacity, y: marqueeY }}
          className="absolute inset-x-0 bottom-0 z-10"
        >
          <ServicesMarquee reduceMotion={reduceMotion} />
        </motion.div>

        {/* Showcase Phase: Takes over after Intro fades */}
        <ServicesHeroShowcase scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}
