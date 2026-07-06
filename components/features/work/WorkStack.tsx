"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { WORK_PROJECTS, type WorkProject } from "@/components/features/work/work-data";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

const THEME_STYLES: Record<WorkProject["theme"], string> = {
  blue: "from-blue-500/20 via-blue-500/5 to-transparent border-blue-500/20",
  emerald: "from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/20",
  violet: "from-violet-500/20 via-violet-500/5 to-transparent border-violet-500/20",
  amber: "from-amber-500/20 via-amber-500/5 to-transparent border-amber-500/20",
  rose: "from-rose-500/20 via-rose-500/5 to-transparent border-rose-500/20",
};

export function WorkStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-zinc-950 px-6 py-24 sm:px-10 md:py-32 lg:px-16"
    >
      {/* Background ambient light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_50%)]" />
      
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-start gap-4"
        >
          <span className="border-accent/30 text-accent rounded-full border bg-white/5 px-5 py-2 text-sm font-medium tracking-[0.2em] uppercase">
            Featured Work
          </span>
          <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Selected <span className="text-white/40">Projects</span>
          </h2>
        </motion.div>

        {/* The container needs to have enough padding at the bottom so the last card can be scrolled past */}
        <div className="flex flex-col gap-10 pb-[10vh] sm:gap-14">
          {WORK_PROJECTS.map((project, index) => (
            <WorkCard
              key={project.id}
              project={project}
              index={index}
              total={WORK_PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, index, total }: { project: WorkProject; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // Calculate sticky top offset - each card sits slightly lower than the previous one
  const stickyTop = `calc(12vh + ${index * 32}px)`;

  return (
    <div
      ref={cardRef}
      className="sticky w-full"
      style={{
        top: stickyTop,
        zIndex: 10 + index,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 50, scale: reduceMotion ? 1 : 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative overflow-hidden rounded-3xl border bg-zinc-900/80 p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-12 md:p-16",
          "bg-gradient-to-br",
          THEME_STYLES[project.theme]
        )}
      >
        <div className="absolute inset-0 bg-white/[0.01]" />
        
        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
          <div className="flex w-full flex-col gap-6 md:max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium tracking-widest text-white/50 uppercase">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-sm font-medium text-white/70">{project.category}</span>
            </div>
            
            <h3 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {project.title}
            </h3>
            
            <p className="text-lg leading-relaxed text-white/60">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner md:w-[40%] xl:w-[45%]">
            {/* A glassmorphism placeholder for the project preview */}
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]">
              <div className="size-20 rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md flex items-center justify-center">
                 <div className="size-8 rounded-full border border-white/20 bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
