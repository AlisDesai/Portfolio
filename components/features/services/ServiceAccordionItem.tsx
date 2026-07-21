"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { ServiceItem } from "@/components/features/services/services-gallery-data";

import { EASE_PREMIUM } from "@/components/animations/easing";

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
        "relative flex size-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:size-14",
        isOpen
          ? "border-accent bg-accent text-white shadow-[0_0_20px_rgba(129,140,248,0.3)]"
          : "group-hover:border-accent/30 group-hover:bg-accent border-zinc-200 bg-zinc-50 text-zinc-400 group-hover:scale-105 group-hover:text-white"
      )}
    >
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.5, ease: EASE_PREMIUM }}
        className="relative block size-4"
      >
        <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current transition-colors duration-300" />
        <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-colors duration-300" />
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
      <div
        className={cn(
          "group relative overflow-hidden rounded-[2rem] border bg-white transition-all duration-500 ease-out",
          isOpen
            ? "border-accent/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1),0_0_0_1px_rgba(129,140,248,0.05)]"
            : cn(
                "border-zinc-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]",
                "hover:border-accent/40 hover:-translate-y-1 hover:bg-[#FDFDFD]",
                "hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06),0_0_0_1px_rgba(129,140,248,0.05)]"
              )
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-7 text-left min-[400px]:gap-6 min-[400px]:px-7 sm:px-10 sm:py-9"
        >
          <span
            className={cn(
              "font-display text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-3xl lg:text-4xl",
              isOpen ? "text-zinc-900" : "text-zinc-500 group-hover:text-zinc-900"
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
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="overflow-hidden"
            >
              <div className="px-6 pt-2 pb-8 sm:px-10 sm:pb-10">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {service.gallery.map((item, i) => {
                    const paletteClasses: Record<string, string> = {
                      blue: "from-blue-500/10 via-blue-500/5 to-transparent hover:border-blue-300/50 group-hover/feature:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.2)]",
                      indigo:
                        "from-indigo-500/10 via-indigo-500/5 to-transparent hover:border-indigo-300/50 group-hover/feature:shadow-[0_8px_30px_-12px_rgba(99,102,241,0.2)]",
                      violet:
                        "from-violet-500/10 via-violet-500/5 to-transparent hover:border-violet-300/50 group-hover/feature:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.2)]",
                      teal: "from-teal-500/10 via-teal-500/5 to-transparent hover:border-teal-300/50 group-hover/feature:shadow-[0_8px_30px_-12px_rgba(20,184,166,0.2)]",
                      emerald:
                        "from-emerald-500/10 via-emerald-500/5 to-transparent hover:border-emerald-300/50 group-hover/feature:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.2)]",
                      amber:
                        "from-amber-500/10 via-amber-500/5 to-transparent hover:border-amber-300/50 group-hover/feature:shadow-[0_8px_30px_-12px_rgba(245,158,11,0.2)]",
                      rose: "from-rose-500/10 via-rose-500/5 to-transparent hover:border-rose-300/50 group-hover/feature:shadow-[0_8px_30px_-12px_rgba(244,63,94,0.2)]",
                      cyan: "from-cyan-500/10 via-cyan-500/5 to-transparent hover:border-cyan-300/50 group-hover/feature:shadow-[0_8px_30px_-12px_rgba(6,182,212,0.2)]",
                    };

                    const iconColorClasses: Record<string, string> = {
                      blue: "bg-blue-100 text-blue-600",
                      indigo: "bg-indigo-100 text-indigo-600",
                      violet: "bg-violet-100 text-violet-600",
                      teal: "bg-teal-100 text-teal-600",
                      emerald: "bg-emerald-100 text-emerald-600",
                      amber: "bg-amber-100 text-amber-600",
                      rose: "bg-rose-100 text-rose-600",
                      cyan: "bg-cyan-100 text-cyan-600",
                    };

                    const colorClass = paletteClasses[item.palette] || paletteClasses.indigo;
                    const iconClass = iconColorClasses[item.palette] || iconColorClasses.indigo;

                    return (
                      <div
                        key={i}
                        className={cn(
                          "group/feature relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-gradient-to-br",
                          colorClass
                        )}
                      >
                        {/* Decorative background grid inside the bento card */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:12px_12px] opacity-0 transition-opacity duration-500 group-hover/feature:opacity-100" />

                        <div className="relative z-10 flex items-start justify-between">
                          <span
                            className={cn(
                              "inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-xs font-bold tracking-wider uppercase shadow-sm",
                              iconClass
                            )}
                          >
                            {item.category}
                          </span>
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-zinc-300 transition-all duration-500 group-hover/feature:scale-110 group-hover/feature:bg-white group-hover/feature:text-zinc-800 group-hover/feature:shadow-md">
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

                        <div className="relative z-10 mt-10 flex flex-col gap-1.5">
                          <span className="font-display text-lg leading-tight font-bold text-zinc-900">
                            {item.title}
                          </span>
                          <span className="text-sm font-medium text-zinc-500">View details</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
