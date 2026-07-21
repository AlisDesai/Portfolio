"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

import { EASE_PREMIUM } from "@/components/animations/easing";

interface SegmentedSelectorProps {
  label: string;
  options: readonly string[];
  value: string | null;
  onChange: (value: string) => void;
  /** Unique per instance — scopes the shared sliding-highlight layout animation
   * so two selectors rendered on the same page (e.g. Budget + Timeline) don't
   * cross-animate into each other. */
  name: string;
  reduceMotion: boolean;
}

/** Single-select "premium" segmented control — a sliding accent highlight
 * replaces a set of ordinary pills for scannable choices like budget or
 * timeline. */
export function SegmentedSelector({
  label,
  options,
  value,
  onChange,
  name,
  reduceMotion,
}: SegmentedSelectorProps) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">{label}</p>
      <div
        role="radiogroup"
        aria-label={label}
        className="mt-4 inline-flex flex-wrap gap-1.5 rounded-2xl bg-zinc-100 p-1.5"
      >
        {options.map((option) => {
          const isSelected = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option)}
              className="focus-visible:ring-accent/40 relative rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none sm:text-base"
            >
              {isSelected && (
                <motion.span
                  layoutId={`${name}-highlight`}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE_PREMIUM }}
                  className="bg-accent absolute inset-0 rounded-full shadow-[0_10px_24px_-8px_rgba(129,140,248,0.55)]"
                />
              )}
              <span className={cn("relative z-10", isSelected ? "text-white" : "text-zinc-500")}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
