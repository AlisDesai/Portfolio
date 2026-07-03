"use client";

import { MARQUEE_ITEMS } from "@/components/features/services-hero/services-hero-data";
import { cn } from "@/lib/utils/cn";

interface ServicesMarqueeProps {
  reduceMotion: boolean;
}

export function ServicesMarquee({ reduceMotion }: ServicesMarqueeProps) {
  // Rendered twice: translating the track exactly -50% loops back to a
  // pixel-identical frame, so the loop has no visible seam or restart jump.
  const trackItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="group/marquee absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 bg-black/40 py-5 backdrop-blur-sm">
      <div
        className={cn(
          "flex w-max items-center gap-12",
          !reduceMotion &&
            "animate-[marquee-scroll_45s_linear_infinite] group-hover/marquee:[animation-play-state:paused]"
        )}
      >
        {trackItems.map((text, index) => (
          <div
            key={`${text}-${index}`}
            aria-hidden={index >= MARQUEE_ITEMS.length}
            className="flex shrink-0 items-center gap-3"
          >
            <span className="text-accent text-base" aria-hidden="true">
              &#10022;
            </span>
            <span className="text-base font-medium whitespace-nowrap text-white/80 sm:text-lg">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
