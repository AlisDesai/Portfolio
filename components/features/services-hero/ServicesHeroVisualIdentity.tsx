"use client";

import { motion } from "framer-motion";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface ServicesHeroVisualIdentityProps {
  reduceMotion: boolean;
}

export function ServicesHeroVisualIdentity({ reduceMotion }: ServicesHeroVisualIdentityProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Soft Ambient Depth Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: EASE_PREMIUM }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </motion.div>

      {/* Architectural Compass Lines */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 md:opacity-50">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { scaleY: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { scaleY: 1 }}
          transition={{ duration: 1.5, ease: EASE_PREMIUM }}
          className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { scaleX: 1 }}
          transition={{ duration: 1.5, ease: EASE_PREMIUM, delay: 0.2 }}
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

      {/* Precision Geometric Focus Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 md:opacity-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: EASE_PREMIUM }}
          className="relative flex items-center justify-center"
        >
          {/* Outer Technical Ring */}
          <motion.svg
            width="800"
            height="800"
            viewBox="0 0 800 800"
            className="absolute text-white/20"
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 160, ease: "linear", repeat: Infinity }}
          >
            <circle
              cx="400"
              cy="400"
              r="398"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 12"
            />
          </motion.svg>

          {/* Inner Glowing Ring */}
          <motion.svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            className="absolute text-white/10"
            animate={reduceMotion ? {} : { rotate: -360 }}
            transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          >
            <circle cx="300" cy="300" r="299" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle
              cx="300"
              cy="300"
              r="299"
              fill="none"
              stroke="url(#accent-glow)"
              strokeWidth="1.5"
              strokeDasharray="200 2000"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="accent-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(99,102,241,1)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0)" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>
      </div>

      {/* Editorial HUD / Viewfinder Typography */}
      <div className="absolute inset-0 p-8 sm:p-12 lg:p-20">
        <div className="relative h-full w-full">
          {/* Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE_PREMIUM }}
            className="absolute top-0 left-0 hidden flex-col gap-1.5 md:flex"
          >
            <span className="font-mono text-[9px] font-medium tracking-[0.3em] text-white/40 uppercase">
              01 // Architecture
            </span>
            <span className="text-xs font-semibold tracking-widest text-white/90 uppercase">
              Backend Systems
            </span>
          </motion.div>

          {/* Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE_PREMIUM }}
            className="absolute top-0 right-0 hidden flex-col items-end gap-1.5 md:flex"
          >
            <span className="font-mono text-[9px] font-medium tracking-[0.3em] text-white/40 uppercase">
              02 // Engineering
            </span>
            <span className="text-xs font-semibold tracking-widest text-white/90 uppercase">
              Mobile Dev
            </span>
          </motion.div>

          {/* Bottom Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE_PREMIUM }}
            className="absolute bottom-0 left-0 hidden flex-col gap-1.5 md:flex"
          >
            <span className="font-mono text-[9px] font-medium tracking-[0.3em] text-white/40 uppercase">
              03 // Infrastructure
            </span>
            <span className="text-xs font-semibold tracking-widest text-white/90 uppercase">
              Cloud Solutions
            </span>
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: EASE_PREMIUM }}
            className="absolute right-0 bottom-0 hidden flex-col items-end gap-1.5 md:flex"
          >
            <span className="font-mono text-[9px] font-medium tracking-[0.3em] text-white/40 uppercase">
              04 // Integration
            </span>
            <span className="text-xs font-semibold tracking-widest text-white/90 uppercase">
              API Ecosystems
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
