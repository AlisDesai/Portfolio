"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import {
  AUSTRALIA_PATH,
  INDIA_PATH,
  MARKERS,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_PATH,
  WORLD_MAP_WIDTH,
} from "@/components/features/global-presence/world-map-data";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// Quadratic bezier control point: pulled toward the top of the map so the
// India <-> Australia connection reads as a gentle flight-path arc.
const CONTROL_POINT = {
  x: (MARKERS.india.x + MARKERS.australia.x) / 2,
  y: (MARKERS.india.y + MARKERS.australia.y) / 2 - 90,
};

const CONNECTION_PATH = `M${MARKERS.india.x},${MARKERS.india.y} Q${CONTROL_POINT.x},${CONTROL_POINT.y} ${MARKERS.australia.x},${MARKERS.australia.y}`;

function quadraticPoint(t: number, p0: number, p1: number, p2: number) {
  const inv = 1 - t;
  return inv * inv * p0 + 2 * inv * t * p1 + t * t * p2;
}

const LINE_START_DELAY = 0.6;
const LINE_DRAW_DURATION = 1.2;
const DOT_TRAVEL_DURATION = 4.5;
const DOT_START_DELAY = LINE_START_DELAY + LINE_DRAW_DURATION;

type MarkerPoint = { x: number; y: number; label: string };

interface GlobalPresenceMapProps {
  isInView: boolean;
  reduceMotion: boolean;
  baseDelay: number;
}

function MarkerMarks({
  marker,
  labelAlign,
}: {
  marker: MarkerPoint;
  labelAlign: "left" | "right";
}) {
  const connectorLength = 26;
  const connectorX2 =
    labelAlign === "right" ? marker.x + connectorLength : marker.x - connectorLength;

  return (
    <line
      x1={marker.x}
      y1={marker.y}
      x2={connectorX2}
      y2={marker.y}
      stroke="#60a5fa"
      strokeOpacity={0.5}
      strokeWidth={1}
    />
  );
}

function MarkerLabel({
  marker,
  isInView,
  delay,
  labelAlign,
}: {
  marker: MarkerPoint;
  isInView: boolean;
  delay: number;
  labelAlign: "left" | "right";
}) {
  const leftPercent = (marker.x / WORLD_MAP_WIDTH) * 100;
  const topPercent = (marker.y / WORLD_MAP_HEIGHT) * 100;

  return (
    <motion.div
      // Mobile: centered directly below the marker (avoids side labels running
      // off the edge of narrow viewports). Desktop: beside the marker, per design.
      className={
        labelAlign === "right"
          ? "absolute z-10 -translate-x-1/2 translate-y-4 sm:translate-x-[2.6rem] sm:translate-y-[-50%]"
          : "absolute z-10 -translate-x-1/2 translate-y-4 sm:translate-x-[calc(-2.6rem-100%)] sm:translate-y-[-50%]"
      }
      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE_PREMIUM }}
    >
      <span className="text-xs font-medium tracking-wide whitespace-nowrap text-white/80 uppercase sm:text-sm">
        {marker.label}
      </span>
    </motion.div>
  );
}

export function GlobalPresenceMap({ isInView, reduceMotion, baseDelay }: GlobalPresenceMapProps) {
  const t = useMotionValue(0);
  const dotX = useTransform(t, (v) =>
    quadraticPoint(v, MARKERS.india.x, CONTROL_POINT.x, MARKERS.australia.x)
  );
  const dotY = useTransform(t, (v) =>
    quadraticPoint(v, MARKERS.india.y, CONTROL_POINT.y, MARKERS.australia.y)
  );

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const controls = animate(t, [0, 1], {
      duration: DOT_TRAVEL_DURATION,
      delay: baseDelay + DOT_START_DELAY,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, t, baseDelay]);

  return (
    <div className="relative mx-auto w-[96%] max-w-[2200px] px-4 sm:px-12">
      <svg
        viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label="World map highlighting India and Australia"
      >
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="softGlow" x="-75%" y="-75%" width="250%" height="250%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={WORLD_MAP_PATH}
          fill="#2A2A2A"
          fillOpacity={0.7}
          stroke="#3f3f3f"
          strokeOpacity={0.4}
          strokeWidth={0.5}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: baseDelay, ease: EASE_PREMIUM }}
        />

        <motion.path
          d={INDIA_PATH}
          fill="url(#connectionGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: baseDelay + 0.4, ease: EASE_PREMIUM }}
        />
        <motion.path
          d={AUSTRALIA_PATH}
          fill="url(#connectionGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: baseDelay + 0.4, ease: EASE_PREMIUM }}
        />

        <motion.path
          d={CONNECTION_PATH}
          fill="none"
          stroke="url(#connectionGradient)"
          strokeWidth={1.5}
          strokeLinecap="round"
          filter="url(#softGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            duration: LINE_DRAW_DURATION,
            delay: baseDelay + LINE_START_DELAY,
            ease: EASE_PREMIUM,
          }}
        />

        {!reduceMotion && (
          <motion.circle
            r={6}
            fill="#93c5fd"
            filter="url(#softGlow)"
            style={{ x: dotX, y: dotY }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: baseDelay + DOT_START_DELAY }}
          />
        )}

        <MarkerMarks marker={MARKERS.india} labelAlign="left" />
        <MarkerMarks marker={MARKERS.australia} labelAlign="right" />
      </svg>

      <MarkerLabel
        marker={MARKERS.india}
        isInView={isInView}
        delay={baseDelay + 0.5}
        labelAlign="left"
      />
      <MarkerLabel
        marker={MARKERS.australia}
        isInView={isInView}
        delay={baseDelay + 0.5}
        labelAlign="right"
      />
    </div>
  );
}
