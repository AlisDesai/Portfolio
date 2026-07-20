"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BenefitRow } from "@/components/features/benefits/BenefitRow";
import { BENEFITS } from "@/components/features/benefits/benefits-data";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";
import { BlueprintAtmosphere } from "@/components/shared/BlueprintAtmosphere";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/** "Benefits of working with us" — full-width light editorial section
 * immediately after the Services Listing, its rounded top edge peeling over
 * the Hero's dark background. A large heading spans the top, followed by a
 * full-width row list (icon + kicker + description) that reveals one row at
 * a time as the user scrolls. */
export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden rounded-t-[2.5rem] bg-white px-6 py-24 sm:rounded-t-[3.5rem] sm:px-10 md:py-32 lg:px-16"
    >
      <BlueprintAtmosphere />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="border-accent/20 bg-accent/5 text-accent rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase shadow-sm"
          >
            Why Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_PREMIUM }}
            className="font-display mt-5 text-5xl leading-[1.3] font-extrabold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl"
          >
            Benefits of
            <br />
            working with us
          </motion.h2>
        </div>

        <div className="mx-auto mt-16 max-w-5xl border-t border-zinc-200 sm:mt-20">
          {BENEFITS.map((benefit) => (
            <BenefitRow key={benefit.title} benefit={benefit} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
