"use client";

import { motion } from "framer-motion";
import { SERVICE_TAGS } from "@/lib/constants/services";

export interface ServicePillStyle {
  top: number;
  left?: number;
  right?: number;
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
    <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
      {SERVICE_TAGS.map((label, index) => {
        const style = styles[index];
        return (
          <motion.div
            key={label}
            className="absolute"
            style={style}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 * index, ease: EASE_PREMIUM }}
          >
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-white/80 backdrop-blur-md">
              {label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
