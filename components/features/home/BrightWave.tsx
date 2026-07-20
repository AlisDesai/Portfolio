"use client";

import { motion } from "framer-motion";

export function BrightWave() {
  return (
    <div 
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60 mix-blend-screen"
      style={{
        maskImage: 'radial-gradient(120% 60% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(120% 60% at 50% 50%, black 20%, transparent 100%)',
      }}
    >
      {/* Wave layer 1 - Deep blue/purple */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        className="absolute top-[30%] left-0 w-[200vw]"
      >
        <svg viewBox="0 0 2400 300" className="w-full h-[300px]" preserveAspectRatio="none" fill="none">
          <path
            d="M0 150 C 300 0, 300 300, 600 150 C 900 0, 900 300, 1200 150 C 1500 0, 1500 300, 1800 150 C 2100 0, 2100 300, 2400 150"
            stroke="url(#grad1)" strokeWidth="3" filter="url(#glow)"
          />
        </svg>
      </motion.div>

      {/* Wave layer 2 - Bright accent (slower, offset phase) */}
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        className="absolute top-[35%] left-0 w-[200vw]"
      >
        <svg viewBox="0 0 2400 300" className="w-full h-[300px]" preserveAspectRatio="none" fill="none">
          <path
            d="M0 150 C 200 300, 400 0, 600 150 C 800 300, 1000 0, 1200 150 C 1400 300, 1600 0, 1800 150 C 2000 300, 2200 0, 2400 150"
            stroke="url(#grad2)" strokeWidth="5" opacity="0.8" filter="url(#glow)"
          />
        </svg>
      </motion.div>

      {/* Wave layer 3 - Thin sharp pink line */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        className="absolute top-[25%] left-0 w-[200vw]"
      >
        <svg viewBox="0 0 2400 300" className="w-full h-[300px]" preserveAspectRatio="none" fill="none">
          <path
            d="M0 150 C 400 -50, 200 350, 600 150 C 1000 -50, 800 350, 1200 150 C 1600 -50, 1400 350, 1800 150 C 2200 -50, 2000 350, 2400 150"
            stroke="url(#grad3)" strokeWidth="2" opacity="0.9" filter="url(#glow)"
          />
        </svg>
      </motion.div>

      {/* Definitions for Gradients and Glows */}
      <svg className="w-0 h-0 absolute">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
