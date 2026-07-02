"use client";

import { motion } from "framer-motion";
import { SERVICE_TAGS } from "@/lib/constants/services";

interface PillPosition {
  className: string;
  hideOnMobile?: boolean;
  delay: number;
}

// Kept strictly in the outer margins of the viewport so they never overlap
// the centered headline, regardless of viewport width.
const PILL_POSITIONS: PillPosition[] = [
  { className: "top-[8%] right-[6%]", delay: 0.1 },
  { className: "top-[24%] left-[4%]", delay: 0.2, hideOnMobile: true },
  { className: "top-[36%] right-[3%]", delay: 0.3, hideOnMobile: true },
  { className: "bottom-[34%] left-[5%]", delay: 0.4, hideOnMobile: true },
  { className: "bottom-[24%] right-[6%]", delay: 0.5, hideOnMobile: true },
  { className: "bottom-[10%] left-[16%]", delay: 0.6 },
  { className: "bottom-[8%] right-[18%]", delay: 0.7, hideOnMobile: true },
  { className: "top-[10%] left-[14%]", delay: 0.8 },
];

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface ServicePillsProps {
  reduceMotion: boolean;
}

export function ServicePills({ reduceMotion }: ServicePillsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {SERVICE_TAGS.map((label, index) => {
        const position = PILL_POSITIONS[index];
        return (
          <motion.div
            key={label}
            className={`absolute ${position.className} ${position.hideOnMobile ? "hidden md:block" : ""}`}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 + position.delay, ease: EASE_PREMIUM }}
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
