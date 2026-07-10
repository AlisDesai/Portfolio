"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { WORK_PROJECTS, type WorkProject } from "@/components/features/work/work-data";
import { WorkHoverPreview } from "@/components/features/work/WorkHoverPreview";
import { WorkProjectRow } from "@/components/features/work/WorkProjectRow";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

/** Editorial project index — a typographic list rather than a card grid, with
 * a floating preview that follows the cursor on fine-pointer devices (same
 * spring-following technique already used by CustomCursor, reused here for
 * one contained section rather than the whole viewport). */
export function WorkIndex() {
  const reduceMotion = usePrefersReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [activeProject, setActiveProject] = useState<WorkProject | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const previewX = useSpring(mouseX, springConfig);
  const previewY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Synchronizing with an external system (device pointer capability),
    // same as CustomCursor's identical check — not a render-derivable value.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- external device-capability sync
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches && !reduceMotion);
  }, [reduceMotion]);

  return (
    <div
      onMouseMove={(event) => {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
      }}
    >
      {WORK_PROJECTS.map((project, index) => (
        <WorkProjectRow
          key={project.id}
          project={project}
          index={index}
          total={WORK_PROJECTS.length}
          isFinePointer={isFinePointer}
          reduceMotion={reduceMotion}
          onHoverStart={() => setActiveProject(project)}
          onHoverEnd={() => setActiveProject(null)}
        />
      ))}

      {isFinePointer && <WorkHoverPreview project={activeProject} x={previewX} y={previewY} />}
    </div>
  );
}
