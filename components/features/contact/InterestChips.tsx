"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "@/components/features/contact/icons";
import { PROJECT_INTERESTS } from "@/components/features/contact/contact-data";
import { cn } from "@/lib/utils/cn";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface InterestChipsProps {
  selected: string[];
  onToggle: (label: string) => void;
  reduceMotion: boolean;
}

/** Multi-select "I'm interested in..." chip picker shown above the Contact form. */
export function InterestChips({ selected, onToggle, reduceMotion }: InterestChipsProps) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
        I&rsquo;m interested in
      </p>
      <div
        role="group"
        aria-label="Project interests"
        className="mt-4 flex flex-wrap gap-2.5 sm:gap-3"
      >
        {PROJECT_INTERESTS.map((label, index) => {
          const isSelected = selected.includes(label);
          return (
            <motion.button
              key={label}
              type="button"
              layout
              aria-pressed={isSelected}
              onClick={() => onToggle(label)}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: reduceMotion ? 0 : 0.05 * index,
                ease: EASE_PREMIUM,
              }}
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "focus-visible:ring-accent/40 flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ease-out focus-visible:ring-2 focus-visible:outline-none sm:text-base",
                isSelected
                  ? "bg-accent border-accent text-white shadow-[0_10px_24px_-8px_rgba(129,140,248,0.55)]"
                  : "border-transparent bg-zinc-100 text-zinc-500 hover:bg-zinc-200/80 hover:text-zinc-900"
              )}
            >
              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                    className="flex size-4 shrink-0 items-center justify-center rounded-full bg-white/20"
                  >
                    <CheckIcon className="size-2.5" />
                  </motion.span>
                )}
              </AnimatePresence>
              {label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
