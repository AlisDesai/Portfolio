"use client";

import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { TestimonialCard } from "@/components/features/testimonials/TestimonialCard";
import {
  TESTIMONIALS,
  type Testimonial,
} from "@/components/features/testimonials/testimonials-data";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const HEADING_DELAY = 0;
const SUBTITLE_DELAY = 0.1;
const CARDS_START_DELAY = 0.3;
const CARD_STAGGER = 0.08;
const COLUMN_STAGGER = 0.1;

// Fixed at 4 columns (matching the desktop "4 columns x 2 cards" layout) — on
// sm/tablet these same 4 column groups simply reflow into a 2-column grid.
const COLUMN_COUNT = 4;
const COLUMNS: Testimonial[][] = Array.from({ length: COLUMN_COUNT }, (_, columnIndex) =>
  TESTIMONIALS.filter((_, index) => index % COLUMN_COUNT === columnIndex)
);

// Each column drifts vertically at a different rate as the section scrolls
// through the viewport — the subtle "waterfall" motion that makes a masonry
// grid feel alive instead of a static block.
const COLUMN_PARALLAX_RANGE: Array<[number, number]> = [
  [0, -50],
  [0, 40],
  [0, -35],
  [0, 55],
];

interface ParallaxColumnProps {
  items: Testimonial[];
  range: [number, number];
  scrollYProgress: MotionValue<number>;
  isInView: boolean;
  baseDelay: number;
  reduceMotion: boolean;
}

function ParallaxColumn({
  items,
  range,
  scrollYProgress,
  isInView,
  baseDelay,
  reduceMotion,
}: ParallaxColumnProps) {
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : range);

  return (
    <motion.div style={{ y }} className="flex flex-col gap-6 lg:gap-8">
      {items.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.name}
          testimonial={testimonial}
          isInView={isInView}
          delay={baseDelay + index * CARD_STAGGER}
          reduceMotion={reduceMotion}
        />
      ))}
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {COLUMNS.map((items, columnIndex) => (
            <ParallaxColumn
              key={columnIndex}
              items={items}
              range={COLUMN_PARALLAX_RANGE[columnIndex]}
              scrollYProgress={scrollYProgress}
              isInView={isInView}
              baseDelay={CARDS_START_DELAY + columnIndex * COLUMN_STAGGER}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
