"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { ArrowUpRightIcon } from "@/components/features/contact/icons";
import {
  WORK_THEME_ACCENTS,
  WORK_THEME_GRADIENTS,
  type WorkProject,
} from "@/components/features/work/work-data";
import { cn } from "@/lib/utils/cn";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface WorkHoverPreviewProps {
  project: WorkProject | null;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/** Floating project preview that follows the cursor — fine-pointer only
 * (see WorkIndex, which never mounts this on touch devices). `x`/`y` are
 * spring-smoothed motion values already tracking the pointer, passed down
 * so only one mouse listener exists for the whole list. */
export function WorkHoverPreview({ project, x, y }: WorkHoverPreviewProps) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ left: x, top: y }}
      className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2"
    >
      <AnimatePresence mode="wait">
        {project && (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            className="relative flex aspect-4/3 w-28 items-center justify-center overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-[0_20px_40px_-18px_rgba(0,0,0,0.25)] sm:w-32"
          >
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-br opacity-[0.08]",
                WORK_THEME_GRADIENTS[project.theme]
              )}
            />
            <span
              className={cn(
                "relative flex size-9 items-center justify-center rounded-full bg-current/10",
                WORK_THEME_ACCENTS[project.theme]
              )}
            >
              <ArrowUpRightIcon className="size-4" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
