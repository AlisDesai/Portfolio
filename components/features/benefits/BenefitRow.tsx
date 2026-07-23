"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BenefitIconMark, type BenefitIconHandle } from "@/components/features/benefits/icons";
import type { Benefit } from "@/components/features/benefits/benefits-data";

import { EASE_PREMIUM } from "@/components/animations/easing";

interface BenefitRowProps {
  benefit: Benefit;
  reduceMotion: boolean;
}

/** One benefit row — icon + kicker on the left, description alongside —
 * reveals on its own, exactly when it scrolls into view (not when the
 * section as a whole does), so rows activate one at a time as the user
 * scrolls down, while earlier rows stay visible.
 *
 * The icon has two independent animation layers: a continuous subtle
 * idle drift that never stops, and the pqoqubbw/icons component's own
 * native hover animation, triggered by hovering anywhere on the row
 * (matching the kicker's existing group-hover behavior) via its exposed
 * imperative ref rather than replacing the idle motion. */
export function BenefitRow({ benefit, reduceMotion }: BenefitRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<BenefitIconHandle>(null);
  const isInView = useInView(rowRef, { once: true, amount: 0.5, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_PREMIUM }}
      onMouseEnter={() => !reduceMotion && iconRef.current?.startAnimation()}
      onMouseLeave={() => !reduceMotion && iconRef.current?.stopAnimation()}
      className="group border-b border-zinc-200 py-10 last:border-b-0 sm:py-12"
    >
      <div className="flex flex-col gap-5 sm:grid sm:grid-cols-[56px_220px_1fr] sm:items-center sm:gap-10">
        <div className="flex items-center gap-4 sm:contents">
          <motion.span
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
            className="flex size-11 shrink-0 items-center justify-center text-zinc-900 sm:size-12"
          >
            <span
              className={
                reduceMotion
                  ? "flex size-full items-center justify-center"
                  : "flex size-full animate-[benefit-icon-rotate_3.2s_ease-in-out_infinite,benefit-icon-scale_2.6s_ease-in-out_infinite] items-center justify-center"
              }
            >
              <BenefitIconMark ref={iconRef} icon={benefit.icon} className="size-full" />
            </span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
            className="group-hover:text-accent font-mono text-xs font-bold tracking-[0.15em] text-zinc-900 uppercase transition-colors duration-500 sm:text-[13px]"
          >
            {benefit.title}
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE_PREMIUM }}
          className="max-w-xl text-lg leading-relaxed text-zinc-600 sm:text-xl"
        >
          {benefit.description}
        </motion.p>
      </div>
    </motion.div>
  );
}
