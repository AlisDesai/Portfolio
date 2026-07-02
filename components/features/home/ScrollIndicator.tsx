"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface ScrollIndicatorProps {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}

export function ScrollIndicator({ scrollYProgress, reduceMotion }: ScrollIndicatorProps) {
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.div
      style={{ opacity: reduceMotion ? 1 : opacity }}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3"
    >
      <span className="text-[11px] tracking-[0.3em] text-white/50 uppercase">Scroll</span>
      <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
        <span className="h-1.5 w-1 rounded-full bg-white/70" />
      </div>
    </motion.div>
  );
}
