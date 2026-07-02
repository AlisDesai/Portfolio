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

const CONNECTOR_LENGTH = 60;

// India: line runs straight down from the country's exact visual middle
// (marker) to the label, matching the reference design.
function ConnectorLine({
  marker,
  isInView,
  delay,
}: {
  marker: MarkerPoint;
  isInView: boolean;
  delay: number;
}) {
  const y2 = marker.y + CONNECTOR_LENGTH;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE_PREMIUM }}
    >
      <line
        x1={marker.x}
        y1={marker.y}
        x2={marker.x}
        y2={y2}
        stroke="#ffffff"
        strokeOpacity={0.6}
        strokeWidth={1}
      />
      <circle cx={marker.x} cy={y2} r={2.2} fill="#ffffff" />
    </motion.g>
  );
}

// Australia: line rises from the country's exact visual middle (marker),
// then bends and runs right, clearing the coastline before the end dot —
// matches the elbow-style connector used in the reference design.
const AUSTRALIA_ELBOW_RISE = 30;
const AUSTRALIA_ELBOW_RUN = 60;

function ElbowConnectorLine({
  marker,
  isInView,
  delay,
}: {
  marker: MarkerPoint;
  isInView: boolean;
  delay: number;
}) {
  const cornerY = marker.y - AUSTRALIA_ELBOW_RISE;
  const endX = marker.x + AUSTRALIA_ELBOW_RUN;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE_PREMIUM }}
    >
      <path
        d={`M${marker.x},${marker.y} V${cornerY} H${endX}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity={0.6}
        strokeWidth={1}
      />
      <circle cx={endX} cy={cornerY} r={2.2} fill="#ffffff" />
    </motion.g>
  );
}

function MarkerLabel({
  marker,
  isInView,
  delay,
  reduceMotion,
}: {
  marker: MarkerPoint;
  isInView: boolean;
  delay: number;
  reduceMotion: boolean;
}) {
  const leftPercent = (marker.x / WORLD_MAP_WIDTH) * 100;
  const topPercent = ((marker.y + CONNECTOR_LENGTH) / WORLD_MAP_HEIGHT) * 100;

  return (
    <div
      // Centered directly below the connector line's end dot, on every
      // breakpoint — matches the reference's straight-down line + label layout.
      className="absolute z-10 -translate-x-1/2 translate-y-2"
      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
    >
      <motion.span
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
        className="font-display block text-xs font-medium whitespace-nowrap text-white sm:text-sm"
      >
        {marker.label}
      </motion.span>
    </div>
  );
}

function InlineMarkerLabel({
  marker,
  isInView,
  delay,
  reduceMotion,
}: {
  marker: MarkerPoint;
  isInView: boolean;
  delay: number;
  reduceMotion: boolean;
}) {
  const cornerY = marker.y - AUSTRALIA_ELBOW_RISE;
  const endX = marker.x + AUSTRALIA_ELBOW_RUN;
  const leftPercent = (endX / WORLD_MAP_WIDTH) * 100;
  const topPercent = (cornerY / WORLD_MAP_HEIGHT) * 100;

  return (
    <div
      // Sits directly beside the elbow connector's end dot, vertically
      // centered on it — matches the reference's inline dot + label layout.
      className="absolute z-10 translate-x-2 -translate-y-1/2"
      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
    >
      <motion.span
        initial={{ opacity: 0, x: reduceMotion ? 0 : -8 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
        className="font-display block text-xs font-medium whitespace-nowrap text-white sm:text-sm"
      >
        {marker.label}
      </motion.span>
    </div>
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
      {/* Unpadded reference box: the SVG's own rendered width (via w-full) and the
          labels' percentage-based left/top must share this exact same box, or the
          two bases (content-box vs padding-box) drift apart and produce an
          inconsistent gap between each marker and its label. */}
      <div className="relative">
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

          <ConnectorLine marker={MARKERS.india} isInView={isInView} delay={baseDelay + 0.4} />
          <ElbowConnectorLine
            marker={MARKERS.australia}
            isInView={isInView}
            delay={baseDelay + 0.4}
          />
        </svg>

        <MarkerLabel
          marker={MARKERS.india}
          isInView={isInView}
          delay={baseDelay + 0.5}
          reduceMotion={reduceMotion}
        />
        <InlineMarkerLabel
          marker={MARKERS.australia}
          isInView={isInView}
          delay={baseDelay + 0.6}
          reduceMotion={reduceMotion}
        />
      </div>
    </div>
  );
}
