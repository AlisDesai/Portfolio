"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ServiceGalleryTile } from "@/components/features/services/ServiceGalleryTile";
import type { GallerySize, ServiceGalleryItem } from "@/lib/constants/services-gallery";

import { EASE_PREMIUM } from "@/components/animations/easing";

// Fixed pixel widths (rather than proportional flex-grow) so the duplicated
// track below produces an exact, seamless repeating strip for the marquee —
// ratios match the original "Medium • Small • Large" editorial sizing.
const SIZE_CLASSES: Record<GallerySize, { width: string; height: string }> = {
  sm: { width: "w-[220px]", height: "h-56 sm:h-60 lg:h-72" },
  md: { width: "w-[340px]", height: "h-56 sm:h-64 lg:h-80" },
  lg: { width: "w-[520px]", height: "h-64 sm:h-72 lg:h-[22rem]" },
};

interface ServiceGalleryProps {
  items: ServiceGalleryItem[];
  reduceMotion: boolean;
}

export function ServiceGallery({ items, reduceMotion }: ServiceGalleryProps) {
  // Duplicated once: translating the track exactly -50% lands on a
  // pixel-identical frame, so the infinite loop has no visible seam or jump.
  const trackItems = [...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className="group/marquee overflow-hidden"
    >
      <div
        className={cn(
          "flex items-stretch gap-5",
          !reduceMotion &&
            "animate-[marquee-scroll_60s_linear_infinite] group-hover/marquee:[animation-play-state:paused]"
        )}
      >
        {trackItems.map((item, index) => {
          const size = SIZE_CLASSES[item.size];
          return (
            <div
              key={`${item.title}-${index}`}
              aria-hidden={index >= items.length}
              className={cn("shrink-0", size.width, size.height)}
            >
              <ServiceGalleryTile item={item} />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
