"use client";

import { motion } from "framer-motion";

import { EASE_PREMIUM } from "@/components/animations/easing";

interface ServicesAtmosphereProps {
  /** "dark" for the Hero/Showcase's near-black canvas, "light" for the
   * Benefits/Contact sections below — same underlying trace geometry,
   * re-toned per background so the atmosphere reads as one continuous
   * identity across the page instead of resetting at each section. */
  variant: "dark" | "light";
  reduceMotion: boolean;
}

// Sparse, rectilinear "signal trace" network — deliberately angular (rather
// than the Home Page's flowing organic waves) so the Services Page reads as
// precise and engineered instead of fluid, while still belonging to the
// same "ambient moving line" family as the rest of the brand.
const STRUCTURE_TRACES = [
  "M-80,190 L420,190 L510,280 L1080,280 L1170,190 L1680,190",
  "M-80,640 L320,640 L400,560 L760,560 L840,640 L1300,640 L1380,720 L1680,720",
  "M1640,70 L1310,70 L1220,160 L920,160",
];

// A couple of traces get an animated traveling dash — a quiet "signal in
// motion" accent, reserved for only these two so the rest of the network
// stays calm rather than everything moving at once.
const SIGNAL_TRACES = [
  "M720,-80 L720,140 L800,220 L800,460",
  "M1020,900 L1020,690 L1100,610 L1100,380",
];

const NODES = [
  { x: 510, y: 280, delay: 0 },
  { x: 840, y: 640, delay: 0.8 },
  { x: 800, y: 460, delay: 1.6 },
  { x: 1100, y: 380, delay: 2.4 },
];

export function ServicesAtmosphere({ variant, reduceMotion }: ServicesAtmosphereProps) {
  const isDark = variant === "dark";
  const structureColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(24,24,27,0.06)";
  const signalColor = isDark ? "rgba(129,140,248,0.4)" : "rgba(99,102,241,0.18)";
  const nodeColor = isDark ? "#818cf8" : "#6366f1";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {isDark && (
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_60%)]" />
      )}

      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE_PREMIUM }}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {STRUCTURE_TRACES.map((d, index) => (
          <path key={index} d={d} fill="none" stroke={structureColor} strokeWidth={1.5} />
        ))}

        {SIGNAL_TRACES.map((d, index) => (
          <path
            key={index}
            d={d}
            fill="none"
            stroke={signalColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="1 22"
            className={reduceMotion ? undefined : "animate-[dash-trace-scroll_16s_linear_infinite]"}
            style={reduceMotion ? undefined : { animationDuration: `${16 + index * 4}s` }}
          />
        ))}

        {NODES.map((node, index) => (
          <circle
            key={index}
            cx={node.x}
            cy={node.y}
            r={3}
            fill={nodeColor}
            className={
              reduceMotion ? undefined : "animate-[atmosphere-node-pulse_4s_ease-in-out_infinite]"
            }
            style={
              reduceMotion ? { opacity: 0.4 } : { opacity: 0.25, animationDelay: `${node.delay}s` }
            }
          />
        ))}
      </motion.svg>
    </div>
  );
}
