"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";

// Inner pages read calmer without the wave background — only the Landing
// Page keeps it as the brand showcase.
const WAVE_HIDDEN_ROUTES: string[] = [ROUTES.SERVICES, ROUTES.WORK, ROUTES.CONTACT];

export function ScrollWaveTheme() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  // Dramatically shift the waves vertically based on scroll progress
  const wave1Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const wave3Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Add a subtle rotation as the user scrolls for a more dynamic 3D feel
  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "4deg"]);

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.3, 0.9]);

  // Every hook above must run on every render regardless of route — this
  // component lives in the root layout and persists across client-side
  // navigation, so gating hook calls themselves (rather than just the
  // rendered output) would violate the Rules of Hooks between route changes.
  if (WAVE_HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <motion.div
      style={{ opacity, rotate }}
      className="pointer-events-none fixed inset-0 z-[1] scale-[1.1] overflow-hidden mix-blend-screen"
    >
      {/* Cinematic Noise Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[10] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Layer 1 - Giant scrolling wave */}
      <motion.div style={{ y: wave1Y }} className="absolute top-[-10%] left-0 h-[120vh] w-[200vw]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 w-[200%]"
        >
          <svg
            viewBox="0 0 4800 1000"
            className="h-full w-full"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 500 C400 200, 800 800, 1200 500 C1600 200, 2000 800, 2400 500 C2800 200, 3200 800, 3600 500 C4000 200, 4400 800, 4800 500"
              stroke="url(#scrollGrad1)"
              strokeWidth="5"
              filter="url(#scrollGlow)"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layer 2 - Fast sharp wave */}
      <motion.div style={{ y: wave2Y }} className="absolute top-[10%] left-0 h-[100vh] w-[200vw]">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 w-[200%]"
        >
          <svg
            viewBox="0 0 4800 1000"
            className="h-full w-full"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 500 C300 900, 900 100, 1200 500 C1500 900, 2100 100, 2400 500 C2700 900, 3300 100, 3600 500 C3900 900, 4500 100, 4800 500"
              stroke="url(#scrollGrad2)"
              strokeWidth="3"
              opacity="0.9"
              filter="url(#scrollGlow)"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layer 3 - Slow ambient wave */}
      <motion.div style={{ y: wave3Y }} className="absolute top-[40%] left-0 h-[100vh] w-[200vw]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 w-[200%]"
        >
          <svg
            viewBox="0 0 4800 1000"
            className="h-full w-full"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 500 C600 200, 600 800, 1200 500 C1800 200, 1800 800, 2400 500 C3000 200, 3000 800, 3600 500 C4200 200, 4200 800, 4800 500"
              stroke="url(#scrollGrad3)"
              strokeWidth="8"
              opacity="0.6"
              filter="url(#scrollGlow)"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* SVG Definitions */}
      <svg className="absolute h-0 w-0">
        <defs>
          <linearGradient id="scrollGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="scrollGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="scrollGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <filter id="scrollGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
