"use client";

import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ServiceGalleryTile } from "@/components/features/services/ServiceGalleryTile";
import { SERVICES } from "@/components/features/services/services-gallery-data";
import type {
  ServiceGalleryItem,
  ServiceItem,
} from "@/components/features/services/services-gallery-data";

interface ServicesHeroShowcaseProps {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}

// Intro occupies the first 15% of scroll; the rest is split evenly across
// every service so each gets the same scroll distance (mirrors the mapping
// ServicesHero uses to unmount its own intro layer at the same 0.15 mark).
const INTRO_END = 0.15;
const SERVICE_SPAN = (1 - INTRO_END) / SERVICES.length;
// Each service crossfades in/out over the first/last 30% of its own span,
// with a "hold" in between. Unlike a time-based transition, this is entirely
// scroll-linked — the visual always matches exactly where the user has
// scrolled to, at any speed or direction, with no lag and no dead zones.
const FADE_FRACTION = 0.3;
const SNAP_SETTLE_DELAY = 150;

interface SettledRange {
  from: number;
  to: number;
}

// The scroll fraction ranges where a service (or the Hero) is fully, cleanly
// visible — i.e. valid places to rest. Anything between two ranges is a
// mid-crossfade blend, which the snap controller corrects once scrolling stops.
const SETTLED_RANGES: SettledRange[] = [
  { from: 0, to: 0 },
  ...SERVICES.map((_, index) => {
    const start = INTRO_END + index * SERVICE_SPAN;
    const end = start + SERVICE_SPAN;
    const fade = SERVICE_SPAN * FADE_FRACTION;
    const isLast = index === SERVICES.length - 1;
    return { from: start + fade, to: isLast ? end : end - fade };
  }),
];

// Returns the nearest settled fraction to snap to, or null if `fraction`
// already sits inside a settled range (no correction needed).
function getSnapTarget(fraction: number, ranges: SettledRange[]): number | null {
  for (const range of ranges) {
    if (fraction >= range.from && fraction <= range.to) return null;
  }
  let lowerEdge = -Infinity;
  let upperEdge = Infinity;
  for (const range of ranges) {
    if (range.to <= fraction) lowerEdge = Math.max(lowerEdge, range.to);
    if (range.from >= fraction) upperEdge = Math.min(upperEdge, range.from);
  }
  if (!Number.isFinite(lowerEdge)) return upperEdge;
  if (!Number.isFinite(upperEdge)) return lowerEdge;
  return fraction - lowerEdge < upperEdge - fraction ? lowerEdge : upperEdge;
}

function getFlagshipGalleryItem(service: ServiceItem): ServiceGalleryItem {
  return service.gallery.find((item) => item.size === "lg") ?? service.gallery[0];
}

function useServiceLayer(
  scrollYProgress: MotionValue<number>,
  index: number,
  reduceMotion: boolean
) {
  const start = INTRO_END + index * SERVICE_SPAN;
  const end = start + SERVICE_SPAN;
  const fade = SERVICE_SPAN * FADE_FRACTION;
  const isLast = index === SERVICES.length - 1;

  // The last service only fades in — it holds at full opacity through the
  // end of the section instead of fading to nothing right before it ends.
  // Same hook call shape every time; only the output values branch on isLast.
  const opacity = useTransform(
    scrollYProgress,
    [start, start + fade, end - fade, end],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [start, start + fade], reduceMotion ? [0, 0] : [28, 0]);
  const scale = useTransform(
    scrollYProgress,
    [start, start + fade],
    reduceMotion ? [1, 1] : [0.97, 1]
  );
  const pointerEvents = useTransform(opacity, (value) => (value > 0.5 ? "auto" : "none"));

  // Coarse, infrequent state (flips at most twice per service per scroll
  // pass) so inactive/off-screen services are hidden from assistive tech
  // instead of sitting invisibly in the accessibility tree.
  const [isActive, setIsActive] = useState(false);
  useMotionValueEvent(opacity, "change", (value) => setIsActive(value > 0.5));

  return { opacity, y, scale, pointerEvents, isActive };
}

// Once the user stops scrolling, corrects the position to the nearest fully
// visible service (or the Hero) if they happened to let go mid-crossfade —
// so the viewport always settles on exactly one complete service, never a
// blend, while native scrolling itself (wheel, trackpad, touch, keyboard)
// stays completely untouched during active scrolling.
function useSnapOnSettle(
  containerRef: React.RefObject<HTMLDivElement | null>,
  scrollYProgress: MotionValue<number>,
  reduceMotion: boolean
) {
  useEffect(() => {
    const sectionEl = containerRef.current?.closest<HTMLElement>("section");
    if (!sectionEl) return;

    let settleTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const fraction = scrollYProgress.get();
        if (fraction <= 0.001 || fraction >= 0.999) return;

        const target = getSnapTarget(fraction, SETTLED_RANGES);
        if (target === null) return;

        const scrollableHeight = sectionEl.offsetHeight - window.innerHeight;
        if (scrollableHeight <= 0) return;

        const sectionTop = sectionEl.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: sectionTop + target * scrollableHeight,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }, SNAP_SETTLE_DELAY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(settleTimer);
    };
  }, [containerRef, scrollYProgress, reduceMotion]);
}

export function ServicesHeroShowcase({ scrollYProgress, reduceMotion }: ServicesHeroShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useSnapOnSettle(containerRef, scrollYProgress, reduceMotion);

  // SERVICES has a fixed length, so these are unconditional, statically
  // ordered hook calls — not a hook-in-a-loop.
  const layers = [
    useServiceLayer(scrollYProgress, 0, reduceMotion),
    useServiceLayer(scrollYProgress, 1, reduceMotion),
    useServiceLayer(scrollYProgress, 2, reduceMotion),
    useServiceLayer(scrollYProgress, 3, reduceMotion),
  ];

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
    >
      {/* Ambient background for the Showcase/Listing phase — subtle grid + soft glow, its own treatment distinct from the intro's collage/HUD background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.06)_0%,transparent_70%)]" />

      {SERVICES.map((service, index) => {
        const layer = layers[index];
        return (
          <motion.div
            key={service.id}
            aria-hidden={!layer.isActive}
            style={{
              opacity: layer.opacity,
              y: layer.y,
              scale: layer.scale,
              pointerEvents: layer.pointerEvents,
            }}
            className={cn(
              "absolute mx-auto flex h-full w-full max-w-[1600px] flex-col items-center justify-center gap-10 px-6 pt-24 sm:px-10 lg:flex-row lg:gap-16 lg:px-16 lg:pt-0",
              index % 2 === 1 && "lg:flex-row-reverse"
            )}
          >
            {/* Text Column */}
            <div className="flex w-full flex-col gap-5 text-left lg:w-[45%]">
              <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase drop-shadow-md">
                Service 0{index + 1}
              </span>
              <h2 className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-white drop-shadow-xl sm:text-5xl lg:text-6xl xl:text-7xl">
                {service.title}
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-white/60">
                {service.description}
              </p>
            </div>

            {/* Showcase Image — one flagship preview in a premium browser frame */}
            <div className="w-full lg:w-[55%]">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-5 py-3.5">
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                </div>
                <div className="aspect-[4/3] w-full sm:aspect-video">
                  <ServiceGalleryTile item={getFlagshipGalleryItem(service)} />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
