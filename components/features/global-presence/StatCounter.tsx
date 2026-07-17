"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";
import type { StatItem } from "@/lib/constants/stats";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface StatCounterProps {
  stat: StatItem;
  isInView: boolean;
  delay: number;
}

export function StatCounter({ stat, isInView, delay }: StatCounterProps) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    const node = valueRef.current;
    if (!node) return;

    if (reduceMotion) {
      node.textContent = `${stat.value}${stat.suffix}`;
      return;
    }

    const controls = animate(0, stat.value, {
      duration: 2.4,
      delay,
      ease: EASE_PREMIUM,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${stat.suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, stat, delay]);

  return (
    <motion.div
      className="flex flex-col items-center gap-4 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
    >
      <span
        ref={valueRef}
        className="font-display text-[clamp(2rem,calc(17.5vw_-_24px),3.75rem)] font-extrabold text-white sm:text-7xl md:text-6xl lg:text-7xl"
      >
        0{stat.suffix}
      </span>
      <span className="text-accent text-base font-medium tracking-[0.15em] uppercase">
        {stat.label}
      </span>
    </motion.div>
  );
}
