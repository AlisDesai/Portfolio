"use client";

import { motion, useScroll, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroCollage } from "@/components/features/home/HeroCollage";
import { ScrollIndicator } from "@/components/features/home/ScrollIndicator";
import { ServicePills, type ServicePillStyle } from "@/components/features/home/ServicePills";
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
  const techRef = useRef<HTMLSpanElement>(null);
  const solutionsRef = useRef<HTMLSpanElement>(null);
  const builtRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);
  const perfectionRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const [pillStyles, setPillStyles] = useState<ServicePillStyle[] | null>(null);

  // Only used for the scroll indicator's gentle fade-out — no parallax.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    function measure() {
      const section = sectionRef.current;
      const tech = techRef.current;
      const solutions = solutionsRef.current;
      const built = builtRef.current;
      const to = toRef.current;
      const perfection = perfectionRef.current;
      if (!section || !tech || !solutions || !built || !to || !perfection) return;

      const sectionRect = section.getBoundingClientRect();
      const techRect = tech.getBoundingClientRect();
      const solutionsRect = solutions.getBoundingClientRect();
      const builtRect = built.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();
      const perfectionRect = perfection.getBoundingClientRect();

      // Approximate letter positions within each word, by fraction of word width.
      const techCHx = techRect.left + techRect.width * 0.75; // "CH" of Tech
      const builtILx = builtRect.left + builtRect.width * 0.6; // "IL" of Built
      const solutionsSOx = solutionsRect.left + solutionsRect.width * 0.1; // "SO" of Solutions
      const toCenterX = toRect.left + toRect.width * 0.5; // center of "To"
      const builtLX = builtRect.left + builtRect.width * 0.72; // "L" of Built
      const perfectionNX = perfectionRect.left + perfectionRect.width * 0.95; // "N" of Perfection

      // Order matches SERVICE_TAGS: Next-Gen Development, Digital Transformation, AI & ML Expertise.
      setPillStyles([
        {
          // Between "SO" (Solutions) and "TO" — the seam between rows 2 and 3, left side.
          top: (solutionsRect.bottom + toRect.top) / 2 - sectionRect.top,
          left: (solutionsSOx + toCenterX) / 2 - sectionRect.left,
          transform: "translate(-50%, -50%) rotate(-11deg)",
        },
        {
          // Between "CH" (Tech) and "IL" (Built) — the seam between rows 1 and 2.
          top: (techRect.bottom + builtRect.top) / 2 - sectionRect.top,
          left: (techCHx + builtILx) / 2 - sectionRect.left,
          transform: "translate(-50%, -50%) rotate(11deg)",
        },
        {
          // Between "L" (Built) and "N" (Perfection) — the seam between rows 2 and 3, right side.
          top: (builtRect.bottom + perfectionRect.top) / 2 - sectionRect.top,
          left: (builtLX + perfectionNX) / 2 - sectionRect.left,
          transform: "translate(-50%, -50%) rotate(10deg)",
        },
      ]);
    }

    // Wait for the headline's entrance animation to finish before measuring
    // its final (settled) position.
    const timeout = setTimeout(measure, 1300);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-zinc-950"
    >
      <HeroCollage reduceMotion={reduceMotion} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      <ServicePills reduceMotion={reduceMotion} styles={pillStyles} />

      <motion.div
        variants={headlineContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto max-w-[1600px] px-6 text-center sm:px-10 lg:px-16"
      >
        <h1 className="font-display w-full text-[clamp(2.25rem,5.75vw,5.9rem)] leading-[1.2] font-extrabold tracking-tight text-white uppercase">
          <motion.span variants={headlineLine} className="block">
            Custom <span ref={techRef}>Tech</span>
          </motion.span>
          <motion.span variants={headlineLine} className="mt-12 block">
            <span ref={solutionsRef} className="text-accent">
              Solutions
            </span>
            , <span ref={builtRef}>Built</span>
          </motion.span>
          <motion.span variants={headlineLine} className="mt-12 block">
            <span ref={toRef}>To</span> <span ref={perfectionRef}>Perfection</span>
          </motion.span>
        </h1>
      </motion.div>

      <ScrollIndicator scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />
    </section>
  );
}
