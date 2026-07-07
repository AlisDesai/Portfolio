"use client";

import { motion, AnimatePresence, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
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
            {/* Left Side: Title */}
            <div className="flex w-full flex-col gap-4 text-left lg:w-[40%] xl:w-[35%]">
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
    <div className="group/feature relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_30px_-12px_rgba(255,255,255,0.1)] sm:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:12px_12px] opacity-0 transition-opacity duration-500 group-hover/feature:opacity-100" />

      <div className="relative z-10 flex items-start justify-between">
        <span className="inline-flex items-center justify-center rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm backdrop-blur-sm transition-colors duration-300 group-hover/feature:bg-white/20">
          {item.category}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/50 transition-all duration-500 group-hover/feature:scale-110 group-hover/feature:bg-white group-hover/feature:text-black">
          <svg
            className="size-4 -rotate-45 transition-transform duration-500 group-hover/feature:rotate-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-1.5">
        <span className="font-display text-lg leading-tight font-bold text-white shadow-black/50 drop-shadow-sm">
          {item.title}
        </span>
      </div>
    </div>
  );
}
