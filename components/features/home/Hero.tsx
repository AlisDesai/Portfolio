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
      if (!section || !tech || !solutions || !built || !to) return;

      const sectionRect = section.getBoundingClientRect();
      const solutionsRect = solutions.getBoundingClientRect();
      const builtRect = built.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();

      // Order matches SERVICE_TAGS: Next-Gen Development, Digital Transformation, AI & ML Expertise.
      // Anchored so the pill overlaps onto the corner of the given word (per design reference).
      setPillStyles([
        {
          top: (solutionsRect.bottom + toRect.top) / 2 - sectionRect.top,
          left: Math.min(solutionsRect.left, toRect.left) - sectionRect.left,
          transform: "translate(-30%, -50%) rotate(-11deg)",
        },
        {
          top: builtRect.top - sectionRect.top,
          left: builtRect.right - sectionRect.left,
          transform: "translate(-55%, -55%) rotate(11deg)",
        },
        {
          top: builtRect.bottom - sectionRect.top,
          left: builtRect.right - sectionRect.left,
          transform: "translate(-60%, -30%) rotate(10deg)",
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
        <h1 className="font-display w-full text-[clamp(2rem,5vw,5.5rem)] leading-[1.05] font-extrabold tracking-tight text-white uppercase">
          <motion.span variants={headlineLine} className="block">
            Custom <span ref={techRef}>Tech</span>
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            <span ref={solutionsRef} className="text-accent">
              Solutions
            </span>
            , <span ref={builtRef}>Built</span>
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            <span ref={toRef}>To</span> Perfection
          </motion.span>
        </h1>
      </motion.div>

      <ScrollIndicator scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />
    </section>
  );
}
