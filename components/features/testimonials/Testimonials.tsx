"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TestimonialCard } from "@/components/features/testimonials/TestimonialCard";
import {
  TESTIMONIALS,
  type Testimonial,
} from "@/components/features/testimonials/testimonials-data";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";
import { cn } from "@/lib/utils/cn";

import { EASE_PREMIUM } from "@/components/animations/easing";

const HEADING_DELAY = 0;
const SUBTITLE_DELAY = 0.1;
// Relative to the rows' own scroll trigger (see rowsIsInView below), not the
// heading above them.
const ROW_START_DELAY = 0.1;
const ROW_STAGGER = 0.15;

// Split into two rows, each scrolling in an opposite direction — a
// continuous client showcase rather than a one-by-one card reveal.
const ROW_1 = TESTIMONIALS.slice(0, 4);
const ROW_2 = TESTIMONIALS.slice(4);

interface MarqueeRowProps {
  items: Testimonial[];
  reverse: boolean;
  isInView: boolean;
  delay: number;
  reduceMotion: boolean;
}

function TestimonialMarqueeRow({ items, reverse, isInView, delay, reduceMotion }: MarqueeRowProps) {
  // Rendered twice: translating the track exactly -50% loops back to a
  // pixel-identical frame, so the loop has no visible seam, jump, or gap.
  const trackItems = [...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
      className="group/marquee w-full overflow-hidden"
    >
      <div
        className={cn(
          "flex w-max items-start gap-6 lg:gap-8",
          !reduceMotion &&
            cn(
              "animate-[marquee-scroll_30s_linear_infinite] group-hover/marquee:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]"
            )
        )}
      >
        {trackItems.map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            aria-hidden={index >= items.length}
            className="w-[320px] shrink-0 sm:w-90"
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const rowsIsInView = useInView(rowsRef, { once: true, amount: 0.1 });
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-24 md:py-32">
      {/* Decorative element — static, brand blue, independent of the cards. */}
      <div className="bg-accent pointer-events-none absolute top-[62%] right-6 size-4 rounded-full sm:right-14 md:right-24" />

      <div className="relative z-10 mx-auto mb-16 flex w-full max-w-[1600px] flex-col items-center px-6 text-center sm:px-10 md:mb-20 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: HEADING_DELAY, ease: EASE_PREMIUM }}
          className="font-display text-accent text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
        >
          Testimonials
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: SUBTITLE_DELAY, ease: EASE_PREMIUM }}
          className="mt-4 text-xl font-medium text-black sm:text-2xl"
        >
          What Our <span className="text-accent">Clients</span> Say
        </motion.p>
      </div>

      <div ref={rowsRef} className="relative z-10 flex flex-col gap-6 lg:gap-8">
        <TestimonialMarqueeRow
          items={ROW_1}
          reverse={false}
          isInView={rowsIsInView}
          delay={ROW_START_DELAY}
          reduceMotion={reduceMotion}
        />
        <TestimonialMarqueeRow
          items={ROW_2}
          reverse
          isInView={rowsIsInView}
          delay={ROW_START_DELAY + ROW_STAGGER}
          reduceMotion={reduceMotion}
        />
      </div>
    </section>
  );
}
