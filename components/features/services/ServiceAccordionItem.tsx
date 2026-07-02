"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ServiceGallery } from "@/components/features/services/ServiceGallery";
import type { ServiceItem } from "@/components/features/services/services-gallery-data";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface ServiceAccordionItemProps {
  service: ServiceItem;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
  reduceMotion: boolean;
  delay: number;
}

// A "+" rotated 45deg reads as a "x" — no separate icon/asset needed.
function PlusMinusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={cn(
        "relative flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 sm:size-12",
        isOpen ? "bg-indigo-600" : "bg-accent transition-colors group-hover:scale-105"
      )}
    >
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
        className="relative block size-4"
      >
        <span className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 rounded-full bg-white" />
        <span className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 rounded-full bg-white" />
      </motion.span>
    </span>
  );
}

export function ServiceAccordionItem({
  service,
  isOpen,
  onToggle,
  isInView,
  reduceMotion,
  delay,
}: ServiceAccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
    >
      {/* Hover/lift lives on this nested, non-Framer-controlled element —
          putting it on the motion.div above would fight the entrance
          animation's own transform and silently get overridden. */}
      <div
        className={cn(
          "group overflow-hidden rounded-4xl border bg-white transition-all duration-300 ease-out",
          isOpen
            ? "border-accent/50 shadow-lg"
            : cn(
                "border-zinc-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06),0_12px_24px_-8px_rgba(0,0,0,0.04)]",
                "hover:border-accent hover:-translate-y-1 hover:bg-stone-50",
                "hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08),0_20px_40px_-12px_rgba(129,140,248,0.35)]"
              )
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full cursor-pointer items-center justify-between gap-6 px-7 py-7 text-left sm:px-10 sm:py-9"
        >
          <span
            className={cn(
              "font-jakarta text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-3xl md:text-4xl",
              isOpen ? "text-black" : "text-zinc-800 group-hover:text-black"
            )}
          >
            {service.title}
          </span>
          <PlusMinusIcon isOpen={isOpen} />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE_PREMIUM }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-8 sm:px-10 sm:pb-10">
                <ServiceGallery items={service.gallery} reduceMotion={reduceMotion} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
