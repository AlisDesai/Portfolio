"use client";

import { motion, useScroll, type Variants } from "framer-motion";
import { useRef } from "react";
import { HeroCollage } from "@/components/features/home/HeroCollage";
import { ScrollIndicator } from "@/components/features/home/ScrollIndicator";
import { ServicePills } from "@/components/features/home/ServicePills";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const headlineContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const headlineLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // Only used for the scroll indicator's gentle fade-out — no parallax.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-zinc-950"
    >
      <HeroCollage reduceMotion={reduceMotion} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      <ServicePills reduceMotion={reduceMotion} />

      <motion.div
        variants={headlineContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto max-w-[1600px] px-6 text-center sm:px-10 lg:px-16"
      >
        <h1 className="font-display text-[clamp(2rem,5vw,5.5rem)] leading-[1.05] font-extrabold tracking-tight text-white uppercase">
          <motion.span variants={headlineLine} className="block">
            Custom Tech
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            <span className="text-accent">Solutions</span>, Built
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            To <span className="font-premium italic">Perfection</span>
          </motion.span>
        </h1>
      </motion.div>

      <ScrollIndicator scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />
    </section>
  );
}
