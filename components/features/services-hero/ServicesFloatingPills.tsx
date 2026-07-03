"use client";

import { motion } from "framer-motion";
import { FLOATING_PILLS } from "@/components/features/services-hero/services-hero-data";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const PILLS_START_DELAY = 1.9;
const PILLS_STAGGER = 0.12;

interface ServicesFloatingPillsProps {
  reduceMotion: boolean;
}

export function ServicesFloatingPills({ reduceMotion }: ServicesFloatingPillsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
      {FLOATING_PILLS.map((pill, index) => (
        <div
          key={pill.label}
          className="absolute"
          style={{
            top: pill.top,
            left: pill.left,
            right: pill.right,
            transform: `rotate(${pill.rotate}deg)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: PILLS_START_DELAY + index * PILLS_STAGGER,
              ease: EASE_PREMIUM,
            }}
          >
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold tracking-wide whitespace-nowrap text-white shadow-lg backdrop-blur-md">
              {pill.label}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
