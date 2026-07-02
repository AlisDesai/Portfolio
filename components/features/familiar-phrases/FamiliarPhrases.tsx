"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FAMILIAR_PHRASES } from "@/components/features/familiar-phrases/phrases-data";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";
import { cn } from "@/lib/utils/cn";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const HEADING_DELAY = 0;
const ROW_START_DELAY = 0.25;
const ROW_STAGGER = 0.15;

// Split into two rows, each scrolling in an opposite direction — matches the
// reference's continuous, edge-to-edge rotating phrase marquee.
const ROW_1 = FAMILIAR_PHRASES.slice(0, 8);
const ROW_2 = FAMILIAR_PHRASES.slice(8);

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      // Rotation lives on the icon itself (a plain SVG, not Framer-controlled),
      // so the CSS group-hover transform never competes with a motion value.
      className="text-accent size-5 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-[8deg]"
      aria-hidden="true"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

interface MarqueeRowProps {
  items: readonly string[];
  reverse: boolean;
  isInView: boolean;
  delay: number;
  reduceMotion: boolean;
}

function MarqueeRow({ items, reverse, isInView, delay, reduceMotion }: MarqueeRowProps) {
  // Rendered twice: translating the track exactly -50% loops back to a
  // pixel-identical frame, so the rotation has no visible seam or restart jump.
  const trackItems = [...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
      className="group/marquee w-full overflow-hidden"
    >
      <div
        className={cn(
          "flex w-max items-center gap-10 sm:gap-14",
          !reduceMotion &&
            cn(
              "animate-[marquee-scroll_40s_linear_infinite] group-hover/marquee:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]"
            )
        )}
      >
        {trackItems.map((text, index) => (
          <div
            key={`${text}-${index}`}
            aria-hidden={index >= items.length}
            className="group flex shrink-0 cursor-default items-center gap-2 transition-transform duration-300 ease-out hover:-translate-y-0.5"
          >
            <SparkleIcon />
            <span className="group-hover:text-accent text-base font-medium whitespace-nowrap text-zinc-600 transition-colors duration-300 ease-out sm:text-lg">
              {text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function FamiliarPhrases() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white pt-4 pb-24 md:pt-6 md:pb-32"
    >
      <div className="bg-accent pointer-events-none absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] blur-3xl" />

      <div className="relative z-10 mx-auto mb-14 flex w-full max-w-[1600px] flex-col items-center px-6 text-center sm:px-10 md:mb-16 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: HEADING_DELAY, ease: EASE_PREMIUM }}
          className="font-display text-3xl font-extrabold tracking-tight text-black sm:text-4xl md:text-5xl"
        >
          Familiar with below phrases?
        </motion.h2>
      </div>

      <div className="relative z-10 flex flex-col gap-1 md:gap-2">
        <MarqueeRow
          items={ROW_1}
          reverse={false}
          isInView={isInView}
          delay={ROW_START_DELAY}
          reduceMotion={reduceMotion}
        />
        <MarqueeRow
          items={ROW_2}
          reverse
          isInView={isInView}
          delay={ROW_START_DELAY + ROW_STAGGER}
          reduceMotion={reduceMotion}
        />
      </div>
    </section>
  );
}
