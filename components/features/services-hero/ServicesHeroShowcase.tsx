"use client";

import { motion, AnimatePresence, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { SERVICES } from "@/components/features/services/services-gallery-data";
import type { ServiceGalleryItem } from "@/components/features/services/services-gallery-data";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface ServicesHeroShowcaseProps {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}

export function ServicesHeroShowcase({ scrollYProgress, reduceMotion }: ServicesHeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.15) setActiveIndex(-1);
    else if (latest < 0.35) setActiveIndex(0);
    else if (latest < 0.55) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      <AnimatePresence>
        {activeIndex >= 0 && (
          <motion.div
            key="showcase-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="pointer-events-auto relative mx-auto flex h-full w-full max-w-[1600px] flex-col items-center justify-center px-6 pt-24 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:pt-0"
          >
            {/* Ambient background for the Showcase/Listing phase — subtle grid + soft glow, its own treatment distinct from the intro's collage/HUD background */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.06)_0%,transparent_70%)]" />

            {/* Left Side: Title */}
            <div className="relative flex w-full flex-col gap-4 text-left lg:w-[40%] xl:w-[35%]">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent text-sm font-bold tracking-[0.2em] uppercase drop-shadow-md"
              >
                Service 0{activeIndex + 1}
              </motion.span>
              <div className="relative h-[100px] w-full sm:h-[120px] lg:h-[240px]">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={activeIndex}
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
                    transition={{ duration: 0.7, ease: EASE_PREMIUM }}
                    className="font-display absolute inset-0 text-4xl font-extrabold tracking-tight text-white drop-shadow-xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] xl:leading-none"
                  >
                    {SERVICES[activeIndex].title}
                  </motion.h2>
                </AnimatePresence>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="hidden max-w-sm text-lg text-white/60 lg:block"
              >
                Scroll to explore our complete suite of capabilities and recent project highlights.
              </motion.p>
            </div>

            {/* Right Side: Grid */}
            <div className="mt-8 w-full lg:mt-0 lg:w-[55%] xl:w-[60%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-4"
                >
                  {SERVICES[activeIndex].gallery.slice(0, 6).map((item, i) => (
                    <motion.div
                      key={`${activeIndex}-${item.title}-${i}`}
                      initial={{ opacity: 0, scale: 0.8, y: 40, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(4px)" }}
                      transition={{
                        duration: 0.8,
                        delay: reduceMotion ? 0 : i * 0.05,
                        ease: EASE_PREMIUM,
                      }}
                      className="h-[180px] sm:h-[200px]"
                    >
                      <HeroGalleryCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroGalleryCard({ item }: { item: ServiceGalleryItem }) {
  return (
    <div className="group/feature relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.06] to-transparent p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/15 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.08)] sm:p-8">
      {/* Subtle inner ring highlight for depth */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/[0.08] transition-all duration-500 ring-inset group-hover/feature:ring-white/[0.15]" />

      {/* Elegant hover noise/texture overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)] opacity-0 transition-opacity duration-700 group-hover/feature:opacity-100" />

      {/* Top Section */}
      <div className="relative z-10 flex items-start justify-between">
        <span className="font-mono text-[10px] font-semibold tracking-[0.25em] text-white/50 uppercase transition-colors duration-300 group-hover/feature:text-white/80">
          {item.category}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/40 ring-1 ring-white/10 transition-all duration-500 ring-inset group-hover/feature:-rotate-45 group-hover/feature:bg-white group-hover/feature:text-black group-hover/feature:shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover/feature:ring-white">
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 mt-auto flex flex-col">
        <span className="font-display block text-[1.35rem] font-medium tracking-wide text-white/90 drop-shadow-sm transition-colors duration-300 group-hover/feature:text-white lg:text-[1.5rem]">
          {item.title}
        </span>
      </div>
    </div>
  );
}
