"use client";

import { MARQUEE_ITEMS } from "@/components/features/services-hero/services-hero-data";
import { cn } from "@/lib/utils/cn";

interface ServicesMarqueeProps {
  reduceMotion: boolean;
}

export function ServicesMarquee({ reduceMotion }: ServicesMarqueeProps) {
  // Multiply array to ensure it spans ultra-wide monitors without jumps
  const trackItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="group/marquee absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/[0.04] bg-black/60 py-4 backdrop-blur-xl">
      <div
        className={cn(
          "flex w-max items-center gap-16",
          !reduceMotion &&
            "animate-[marquee-scroll_90s_linear_infinite] group-hover/marquee:[animation-play-state:paused]"
        )}
      >
        {trackItems.map((text, index) => (
          <div
            key={`${text}-${index}`}
            aria-hidden={index >= MARQUEE_ITEMS.length}
            className="flex shrink-0 items-center gap-16"
          >
            <span className="text-white/20" aria-hidden="true">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 0L4.54512 3.45488L8 4L4.54512 4.54512L4 8L3.45488 4.54512L0 4L3.45488 3.45488L4 0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase sm:text-[13px]">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
