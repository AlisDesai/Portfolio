"use client";

import { useEffect, useState } from "react";
import { WORK_PROJECTS } from "@/components/features/work/work-data";
import { WorkProjectRow } from "@/components/features/work/WorkProjectRow";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

/** Editorial project index — a typographic list rather than a card grid.
 * Fine-pointer devices get a clean color-emphasis hover on the title
 * (handled by WorkProjectRow itself); coarse/touch pointers show a small
 * inline swatch per row instead, since there's no hover state to rely on. */
export function WorkIndex() {
  const reduceMotion = usePrefersReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Synchronizing with an external system (device pointer capability),
    // same as CustomCursor's identical check — not a render-derivable value.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- external device-capability sync
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches && !reduceMotion);
  }, [reduceMotion]);

  return (
    <div>
      {WORK_PROJECTS.map((project, index) => (
        <WorkProjectRow
          key={project.id}
          project={project}
          index={index}
          total={WORK_PROJECTS.length}
          isFinePointer={isFinePointer}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
