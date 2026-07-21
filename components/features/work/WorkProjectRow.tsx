"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  WORK_THEME_ACCENTS,
  WORK_THEME_GRADIENTS,
  type WorkProject,
} from "@/components/features/work/work-data";
import { cn } from "@/lib/utils/cn";

import { EASE_PREMIUM } from "@/components/animations/easing";

interface WorkProjectRowProps {
  project: WorkProject;
  index: number;
  total: number;
  isFinePointer: boolean;
  reduceMotion: boolean;
}

/** One row of the editorial project index. On a fine-pointer device, hovering
 * the title is a clean typographic color emphasis (group-hover below) — no
 * floating preview. On touch/coarse pointers, the row shows its own compact
 * inline swatch instead, so nothing is lost on mobile. */
export function WorkProjectRow({
  project,
  index,
  total,
  isFinePointer,
  reduceMotion,
}: WorkProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, amount: 0.3, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_PREMIUM }}
      className="group border-b border-zinc-200 py-8 first:border-t sm:py-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <span className="font-mono text-sm text-zinc-400 sm:w-16 sm:shrink-0">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <h3 className="font-display group-hover:text-accent text-3xl font-extrabold tracking-tight wrap-break-word text-zinc-900 transition-colors duration-500 sm:text-4xl lg:text-5xl">
            {project.title}
          </h3>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span
              className={cn(
                "text-sm font-bold tracking-[0.15em] uppercase",
                WORK_THEME_ACCENTS[project.theme]
              )}
            >
              {project.category}
            </span>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Touch/coarse-pointer fallback — no cursor-following preview exists
            on these devices, so the visual lives inline here instead. */}
        {!isFinePointer && (
          <div
            className={cn(
              "relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br sm:w-40",
              WORK_THEME_GRADIENTS[project.theme]
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.35)_0%,transparent_70%)]" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
