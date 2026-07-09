"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { SERVICES } from "@/components/features/services/services-gallery-data";
import type {
  GalleryPalette,
  ServiceItem,
} from "@/components/features/services/services-gallery-data";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface ServicesHeroShowcaseProps {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}

// Intro occupies the first ~21% of the 355vh section (still exactly 75vh,
// unchanged from before) — the rest is split evenly across every service,
// now ~70vh each instead of ~106vh, so there's no more long dead hold after
// a service has already fully revealed. Mirrors the mapping ServicesHero
// uses to unmount its own intro layer at the same 0.2113 mark.
const INTRO_END = 0.2113;
const SERVICE_SPAN = (1 - INTRO_END) / SERVICES.length;

// Ambient glow + icon-ring accent, tinted per-service using each service's
// own flagship palette — reuses the exact Tailwind colors already present
// in the gallery data, no new tokens.
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
// "Security", "Payments"...) — real data, presented as a capability list
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
      strokeWidth={2}
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
      strokeWidth={2}
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
      strokeWidth={2}
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
      strokeWidth={2}
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

// Numbered progress rail (01-04) along the left edge — a common wayfinding
// touch on premium agency portfolios, purely informational (not clickable,
// so it can't conflict with the pinned scroll mechanics above it).
function ProgressRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="pointer-events-none absolute top-1/2 left-5 z-20 hidden -translate-y-1/2 flex-col items-center gap-2.5 lg:flex xl:left-7">
      {SERVICES.map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <div key={index} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "font-mono text-[9px] tracking-widest transition-colors duration-500",
                isActive ? "text-accent" : "text-white/25"
              )}
            >
              0{index + 1}
            </span>
            <span
              className={cn(
                "w-[3px] rounded-full transition-all duration-500",
                isActive ? "bg-accent h-6" : "h-3 bg-white/15"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

// A subtle pointer-following tilt on the card — skipped entirely under
// reduced motion. Purely additive to the existing entrance transform
// (opacity/x/scale stay on the outer element; rotateX/rotateY live on this
// inner wrapper so the two never fight over the same style properties).
function TiltCard({
  reduceMotion,
  children,
}: {
  reduceMotion: boolean;
  children: React.ReactNode;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  if (reduceMotion) {
    return <div className="relative h-full w-full">{children}</div>;
  }

  return (
    <motion.div
      className="relative h-full w-full"
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * 6);
        rotateX.set(py * -6);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
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
      {/* Ambient background for the Showcase/Listing phase — subtle grid + soft glow, its own treatment distinct from the intro's collage/HUD background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.06)_0%,transparent_70%)]" />

      {activeIndex >= 0 && <ProgressRail activeIndex={activeIndex} />}

      <AnimatePresence mode="wait">
        {activeService && titleParts && capabilities && ServiceIcon && glowClass && (
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className={cn(
              "pointer-events-auto relative mx-auto flex h-full w-full max-w-[1600px] flex-col items-center justify-center gap-12 px-6 pt-24 sm:px-10 lg:flex-row lg:gap-20 lg:px-16 lg:pt-0 xl:gap-24 xl:px-20",
              activeIndex % 2 === 1 && "lg:flex-row-reverse"
            )}
          >
            {/* Text Column — a deliberate, time-based sequence: label, then
                title sliding in from the right, then the description. */}
            <div className="flex w-full min-w-0 flex-col gap-6 text-left lg:w-[42%]">
              <motion.div
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                className="flex items-center gap-3"
              >
                <span className="bg-accent h-px w-6" />
                <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase drop-shadow-md">
                  Service 0{activeIndex + 1}
                </span>
              </motion.div>
              <motion.h2
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 140 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE_PREMIUM }}
                className="font-display text-4xl leading-[1.05] tracking-tight text-white drop-shadow-xl sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                <span className="font-extrabold">{titleParts.lead} </span>
                <span className="font-normal text-white/85">{titleParts.trailing}</span>
              </motion.h2>
              <motion.p
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 90 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE_PREMIUM }}
                className="max-w-md text-lg leading-relaxed text-white/60"
              >
                {activeService.description}
              </motion.p>
            </div>

            {/* Showcase Card — a glass emblem panel: a large custom line-icon
                plus a real capability list pulled from the service's own
                data, sliding in from the left after the title has led the
                sequence. No fabricated screenshot, no browser chrome. */}
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -170, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.32, ease: EASE_PREMIUM }}
              className="relative w-full lg:w-[52%]"
            >
              <div
                className={cn(
                  "pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl",
                  glowClass
                )}
              />
              <TiltCard reduceMotion={reduceMotion}>
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-10">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px]" />

                  <div className="relative flex flex-col gap-8">
                    <div className="border-accent/25 bg-accent/10 text-accent flex size-16 items-center justify-center rounded-2xl border">
                      <ServiceIcon className="size-8" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {capabilities.map((capability) => (
                        <div
                          key={capability}
                          className="hover:border-accent/30 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors duration-300 hover:bg-white/[0.07]"
                        >
                          <span className="bg-accent size-1.5 shrink-0 rounded-full" />
                          <span className="font-display truncate text-sm font-medium text-white/85 sm:text-base">
                            {capability}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
