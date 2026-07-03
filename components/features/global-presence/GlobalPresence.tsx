"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GlobalPresenceMap } from "@/components/features/global-presence/GlobalPresenceMap";
import { StatCounter } from "@/components/features/global-presence/StatCounter";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";
import { GLOBAL_STATS } from "@/lib/constants/stats";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// Sequenced delays (seconds), each relative to its own element scrolling
// into view — not one shared flag from the top of this (very tall) section,
// which used to fire before the map/stats were ever actually on screen.
const BADGE_DELAY = 0;
const HEADING_DELAY = 0.15;
const DESCRIPTION_DELAY = 0.3;
const MAP_DELAY = 0.2;
const STATS_START_DELAY = 0.1;
const STATS_STAGGER = 0.15;

export function GlobalPresence() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const mapIsInView = useInView(mapRef, { once: true, amount: 0.2 });
  const statsIsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 pt-10 pb-24 md:min-h-screen md:pt-14 md:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(129,140,248,0.08)_0%,transparent_60%)]" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: BADGE_DELAY, ease: EASE_PREMIUM }}
          className="border-accent/30 text-accent rounded-full border bg-white/5 px-5 py-2 text-sm font-medium tracking-[0.2em] uppercase"
        >
          Global Presence
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: HEADING_DELAY, ease: EASE_PREMIUM }}
          className="font-display text-4xl leading-[1.4] font-extrabold text-white sm:text-6xl md:text-7xl"
        >
          Serving Businesses
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Worldwide
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: DESCRIPTION_DELAY, ease: EASE_PREMIUM }}
          className="mt-3 line-clamp-2 max-w-4xl text-base text-white/60 sm:text-lg"
        >
          We partner with businesses across continents, delivering modern digital solutions that
          scale from first launch to global growth.
        </motion.p>
      </div>

      <div ref={mapRef} className="relative z-10 mt-20 w-full md:mt-24">
        <GlobalPresenceMap
          isInView={mapIsInView}
          reduceMotion={reduceMotion}
          baseDelay={MAP_DELAY}
        />
      </div>

      <div
        ref={statsRef}
        className="relative z-10 mt-24 grid w-full max-w-7xl grid-cols-2 gap-12 md:mt-28 md:grid-cols-3 md:gap-20"
      >
        {GLOBAL_STATS.map((stat, index) => (
          <StatCounter
            key={stat.label}
            stat={stat}
            isInView={statsIsInView}
            delay={STATS_START_DELAY + index * STATS_STAGGER}
          />
        ))}
      </div>
    </section>
  );
}
