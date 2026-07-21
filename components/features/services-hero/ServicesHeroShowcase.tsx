"use client";

import { motion, AnimatePresence, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ServicesAtmosphere } from "@/components/features/services-hero/ServicesAtmosphere";
import { SERVICES } from "@/components/features/services/services-gallery-data";
import type {
  GalleryPalette,
  ServiceItem,
} from "@/components/features/services/services-gallery-data";

import { EASE_PREMIUM } from "@/components/animations/easing";

interface ServicesHeroShowcaseProps {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}

// Intro occupies the first ~21% of the 355vh section (still exactly 75vh,
// unchanged from before) — the rest is split evenly across every service.
// Mirrors the mapping ServicesHero uses to unmount its own intro layer at
// the same 0.2113 mark.
const INTRO_END = 0.2113;
const SERVICE_SPAN = (1 - INTRO_END) / SERVICES.length;

// Ambient tint behind each service's giant background icon, using each
// service's own flagship palette — reuses the exact Tailwind colors already
// present in the gallery data, no new tokens.
const GLOW_CLASSES: Record<GalleryPalette, string> = {
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  teal: "bg-teal-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  cyan: "bg-cyan-500",
};

// Title split to match the "bold word(s) + lighter last word" treatment
// (e.g. "Backend" bold, "Development" normal weight) — the same bold/normal
// contrast the Hero's own title already uses ("Our" extrabold, "Services"
// normal), just reused here for consistency.
function splitTitle(title: string): { lead: string; trailing: string } {
  const words = title.split(" ");
  const trailing = words.pop() ?? title;
  return { lead: words.join(" "), trailing };
}

// Deduplicated categories from a service's gallery data (e.g. "Backend",
// "Security", "Payments"...) — real data, presented as a capability index
// instead of a fabricated product screenshot.
function getCapabilities(service: ServiceItem): string[] {
  const seen = new Set<string>();
  for (const item of service.gallery) {
    if (!seen.has(item.category)) seen.add(item.category);
  }
  return Array.from(seen).slice(0, 6);
}

interface IconProps {
  className?: string;
}

// Hand-drawn line icons matching the exact convention already established
// in components/features/contact/icons.tsx (viewBox 24x24, stroke
// currentColor, strokeWidth 2, round caps/joins) — one per service.
function ServerIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width={20} height={6} x={2} y={2} rx={1.5} />
      <rect width={20} height={6} x={2} y={9} rx={1.5} />
      <rect width={20} height={6} x={2} y={16} rx={1.5} />
      <line x1={6} x2={6} y1={5} y2={5} />
      <line x1={6} x2={6} y1={12} y2={12} />
      <line x1={6} x2={6} y1={19} y2={19} />
    </svg>
  );
}

function DeviceIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width={12} height={20} x={6} y={2} rx={2.5} />
      <line x1={10} x2={14} y1={19} y2={19} />
    </svg>
  );
}

function LayersIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 12l10 5 10-5" />
      <path d="M2 17l10 5 10-5" />
    </svg>
  );
}

function LinkIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <line x1={8} x2={16} y1={12} y2={12} />
    </svg>
  );
}

const SERVICE_ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  "backend-development": ServerIcon,
  "mobile-development": DeviceIcon,
  "system-architecture": LayersIcon,
  "api-integration": LinkIcon,
};

// Minimal horizontal segment tracker — a slim, unnumbered progress bar
// instead of a navigational rail, so it reads as ambient wayfinding rather
// than a menu.
function ProgressTracker({ total, activeIndex }: { total: number; activeIndex: number }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-2 sm:bottom-10">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "h-[3px] rounded-full transition-all duration-500 ease-out",
            index === activeIndex ? "bg-accent w-10" : "w-4 bg-white/20"
          )}
        />
      ))}
    </div>
  );
}

export function ServicesHeroShowcase({ scrollYProgress, reduceMotion }: ServicesHeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  // Scroll only decides WHICH service is active (discrete, evenly split).
  // The reveal itself is time-based below — not tied to scroll speed — so it
  // always plays out at the same smooth, deliberate pace no matter how fast
  // or slow the user scrolls.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < INTRO_END) {
      setActiveIndex(-1);
      return;
    }
    const relative = Math.floor((latest - INTRO_END) / SERVICE_SPAN);
    setActiveIndex(Math.min(SERVICES.length - 1, Math.max(0, relative)));
  });

  const activeService = activeIndex >= 0 ? SERVICES[activeIndex] : null;
  const titleParts = activeService ? splitTitle(activeService.title) : null;
  const capabilities = activeService ? getCapabilities(activeService) : null;
  const ServiceIcon = activeService ? SERVICE_ICONS[activeService.id] : null;
  const glowClass = activeService ? GLOW_CLASSES[activeService.gallery[0].palette] : null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      {/* Ambient background for the Showcase phase — same continuous
          atmosphere as the Hero's intro, so there's no visual break between
          phases. */}
      <ServicesAtmosphere variant="dark" reduceMotion={reduceMotion} />

      <AnimatePresence mode="wait">
        {activeService && titleParts && capabilities && ServiceIcon && glowClass && (
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="pointer-events-auto relative mx-auto flex h-full w-full max-w-[1000px] flex-col items-center justify-center gap-7 px-6 text-center sm:gap-8 sm:px-10 lg:px-16"
          >
            {/* Kicker */}
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="flex items-center gap-3"
            >
              <span className="bg-accent h-px w-6" />
              <span className="text-sm font-bold tracking-[0.35em] text-white uppercase drop-shadow-md">
                Service 0{activeIndex + 1}
              </span>
              <span className="bg-accent h-px w-6" />
            </motion.div>

            {/* Title — reveals via the same cinematic mask wipe already used
                elsewhere on this page, just at a larger, centered scale. */}
            <motion.h2
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 1, clipPath: "inset(0 100% 0 0)" }
              }
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.15, ease: EASE_PREMIUM }}
              className="font-display text-5xl leading-[1.05] tracking-tight text-balance text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.4)] sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span className="bg-linear-to-r from-indigo-400 to-blue-500 bg-clip-text font-extrabold tracking-tighter text-transparent">
                {titleParts.lead}{" "}
              </span>
              <span className="font-normal tracking-wide text-white/85">{titleParts.trailing}</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_PREMIUM }}
              className="max-w-xl text-lg leading-relaxed text-balance text-white/60 sm:text-xl"
            >
              {activeService.description}
            </motion.p>

            {/* Capabilities — an unlisted, horizontal meta line (real data
                from the service's own gallery categories) instead of a
                numbered vertical index. */}
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE_PREMIUM }}
              className="flex flex-col items-center gap-3 pt-2"
            >
              <span
                aria-hidden="true"
                className="via-accent/40 h-px w-10 bg-linear-to-r from-transparent to-transparent"
              />
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {capabilities.map((capability, index) => (
                  <span key={capability} className="flex items-center gap-4">
                    {index > 0 && (
                      <span aria-hidden="true" className="bg-accent/40 size-1 rounded-full" />
                    )}
                    <span className="text-accent/60 text-xs font-medium tracking-[0.2em] uppercase">
                      {capability}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {activeIndex >= 0 && <ProgressTracker total={SERVICES.length} activeIndex={activeIndex} />}
    </div>
  );
}
