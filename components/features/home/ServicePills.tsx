"use client";

import { motion } from "framer-motion";
import { SERVICE_TAGS } from "@/lib/constants/services";

export interface ServicePillStyle {
  top: number;
  left?: number;
  right?: number;
  /** Static anchor transform (translate % + rotate) — kept separate from the entrance animation. */
  transform?: string;
}

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface ServicePillsProps {
  reduceMotion: boolean;
  /** Pixel positions anchored to the headline words, measured by Hero. Null until measured. */
  styles: ServicePillStyle[] | null;
}

export function ServicePills({ reduceMotion, styles }: ServicePillsProps) {
  if (!styles) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
      {SERVICE_TAGS.map((label, index) => {
        const { top, left, right, transform } = styles[index];
        return (
          <div key={label} className="absolute" style={{ top, left, right, transform }}>
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 * index, ease: EASE_PREMIUM }}
            >
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/20 px-5 py-2.5 text-sm font-bold tracking-wide whitespace-nowrap text-white backdrop-blur-md">
                {label}
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
