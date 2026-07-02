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

const PILL_GAP = 20;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLSpanElement>(null);
  const solutionsRef = useRef<HTMLSpanElement>(null);
  const builtRef = useRef<HTMLSpanElement>(null);
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
      if (!section || !tech || !solutions || !built) return;

      const sectionRect = section.getBoundingClientRect();
      const techRect = tech.getBoundingClientRect();
      const solutionsRect = solutions.getBoundingClientRect();
      const builtRect = built.getBoundingClientRect();

      // Order matches SERVICE_TAGS: Next-Gen Development, Digital Transformation, AI & ML Expertise.
      setPillStyles([
        {
          top: Math.max(8, solutionsRect.top - sectionRect.top + solutionsRect.height / 2 - 17),
          right: Math.max(8, sectionRect.right - solutionsRect.left + PILL_GAP),
        },
        {
          top: Math.max(8, techRect.top - sectionRect.top - 44),
          left: Math.max(8, techRect.right - sectionRect.left - 60),
        },
        {
          top: Math.max(8, builtRect.top - sectionRect.top + builtRect.height * 0.6 - 17),
          left: Math.max(8, builtRect.right - sectionRect.left + PILL_GAP),
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
            To Perfection
          </motion.span>
        </h1>
      </motion.div>

      <ScrollIndicator scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />
    </section>
  );
}
