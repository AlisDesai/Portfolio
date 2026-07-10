"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { WORK_THEME_GRADIENTS, type WorkProject } from "@/components/features/work/work-data";
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
            className={cn(
              "relative flex aspect-[4/3] w-40 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br shadow-[0_16px_32px_-12px_rgba(0,0,0,0.3)] sm:w-47.5",
              WORK_THEME_GRADIENTS[project.theme]
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)]" />
            <span className="rounded-full border border-white/50 bg-white/25 px-3.5 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg backdrop-blur-md">
              View Project
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
