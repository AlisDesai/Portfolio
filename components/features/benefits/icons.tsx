"use client";

import { useAnimation, motion, type Variants } from "framer-motion";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import type { BenefitIcon } from "@/components/features/benefits/benefits-data";
import { cn } from "@/lib/utils/cn";

export interface BenefitIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface IconProps {
  className?: string;
}

/** Shared plumbing every pqoqubbw/icons component uses: an "animate"/"normal"
 * AnimationControls pair, exposed imperatively via ref (so a row's own hover
 * area — not just the small icon hitbox — can drive it), falling back to the
 * icon's own hover/unhover handlers when nothing external is controlling it. */
function useIconControls(ref: React.Ref<BenefitIconHandle>) {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(() => {
    if (!isControlledRef.current) controls.start("animate");
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    if (!isControlledRef.current) controls.start("normal");
  }, [controls]);

  return { controls, handleMouseEnter, handleMouseLeave };
}

// The six icons below are pqoqubbw/icons (icons.pqoqubbw.dev, MIT) — SVG
// paths and motion variants copied verbatim from their published source,
// only the import path (motion/react -> framer-motion, already installed)
// and sizing API (numeric `size` prop -> `className`, matching every other
// icon file in this codebase) are adapted.

const MessageCircleIcon = forwardRef<BenefitIconHandle, IconProps>(({ className }, ref) => {
  const { controls, handleMouseEnter, handleMouseLeave } = useIconControls(ref);
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("flex items-center justify-center", className)}
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-full"
        animate={controls}
        variants={
          {
            normal: { scale: 1, rotate: 0 },
            animate: {
              scale: 1.05,
              rotate: [0, -7, 7, 0],
              transition: {
                rotate: { duration: 0.5, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 400, damping: 10 },
              },
            },
          } satisfies Variants
        }
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </motion.svg>
    </div>
  );
});
MessageCircleIcon.displayName = "MessageCircleIcon";

const ShieldCheckIcon = forwardRef<BenefitIconHandle, IconProps>(({ className }, ref) => {
  const { controls, handleMouseEnter, handleMouseLeave } = useIconControls(ref);
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("flex items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-full"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <motion.path
          d="m9 12 2 2 4-4"
          animate={controls}
          initial="normal"
          variants={
            {
              normal: {
                opacity: 1,
                pathLength: 1,
                scale: 1,
                transition: { duration: 0.3, opacity: { duration: 0.1 } },
              },
              animate: {
                opacity: [0, 1],
                pathLength: [0, 1],
                scale: [0.5, 1],
                transition: { duration: 0.4, opacity: { duration: 0.1 } },
              },
            } satisfies Variants
          }
        />
      </svg>
    </div>
  );
});
ShieldCheckIcon.displayName = "ShieldCheckIcon";

const CompassIcon = forwardRef<BenefitIconHandle, IconProps>(({ className }, ref) => {
  const { controls, handleMouseEnter, handleMouseLeave } = useIconControls(ref);
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("flex items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-full"
      >
        <circle cx={12} cy={12} r={10} />
        <motion.polygon
          points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
          animate={controls}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          variants={{ normal: { rotate: 0 }, animate: { rotate: 360 } } satisfies Variants}
        />
      </svg>
    </div>
  );
});
CompassIcon.displayName = "CompassIcon";

const TrendingUpIcon = forwardRef<BenefitIconHandle, IconProps>(({ className }, ref) => {
  const { controls, handleMouseEnter, handleMouseLeave } = useIconControls(ref);
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("flex items-center justify-center", className)}
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-full"
        animate={controls}
        initial="normal"
        variants={
          {
            animate: {
              x: 0,
              y: 0,
              translateX: [0, 2, 0],
              translateY: [0, -2, 0],
              transition: { duration: 0.5 },
            },
          } satisfies Variants
        }
      >
        <motion.polyline
          points="22 7 13.5 15.5 8.5 10.5 2 17"
          animate={controls}
          initial="normal"
          variants={
            {
              normal: {
                opacity: 1,
                pathLength: 1,
                transition: { duration: 0.4, opacity: { duration: 0.1 } },
              },
              animate: {
                opacity: [0, 1],
                pathLength: [0, 1],
                pathOffset: [1, 0],
                transition: { duration: 0.4, opacity: { duration: 0.1 } },
              },
            } satisfies Variants
          }
        />
        <motion.polyline
          points="16 7 22 7 22 13"
          animate={controls}
          initial="normal"
          variants={
            {
              normal: {
                opacity: 1,
                pathLength: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3,
                  opacity: { duration: 0.1, delay: 0.3 },
                },
              },
              animate: {
                opacity: [0, 1],
                pathLength: [0, 1],
                pathOffset: [0.5, 0],
                transition: {
                  delay: 0.3,
                  duration: 0.3,
                  opacity: { duration: 0.1, delay: 0.3 },
                },
              },
            } satisfies Variants
          }
        />
      </motion.svg>
    </div>
  );
});
TrendingUpIcon.displayName = "TrendingUpIcon";

const HeartHandshakeIcon = forwardRef<BenefitIconHandle, IconProps>(({ className }, ref) => {
  const { controls, handleMouseEnter, handleMouseLeave } = useIconControls(ref);
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("flex items-center justify-center", className)}
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-full"
        animate={controls}
        initial="normal"
        style={{ originX: "50%", originY: "50%" }}
        variants={
          {
            normal: { scale: 1, rotate: 0 },
            animate: {
              scale: [1, 0.9, 1, 1, 1, 1, 1],
              rotate: [0, 0, 0, -7, 7, -3, 0],
              transition: {
                duration: 0.7,
                times: [0, 0.15, 0.3, 0.4, 0.55, 0.75, 1],
                ease: "easeInOut",
              },
            },
          } satisfies Variants
        }
      >
        <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" />
      </motion.svg>
    </div>
  );
});
HeartHandshakeIcon.displayName = "HeartHandshakeIcon";

// receipt-text's own variants drive "visible"/"hidden" rather than
// "animate"/"normal" — it gets its own controls wiring instead of the
// shared start/stop hook, but exposes the same imperative contract.
const ReceiptTextIcon = forwardRef<BenefitIconHandle, IconProps>(({ className }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  const replay = useCallback(async () => {
    await controls.start("hidden");
    await controls.start("visible");
  }, [controls]);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return { startAnimation: () => replay(), stopAnimation: () => controls.start("visible") };
  });

  return (
    <div
      onMouseEnter={() => !isControlledRef.current && replay()}
      onMouseLeave={() => !isControlledRef.current && controls.start("visible")}
      className={cn("flex items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-full"
      >
        <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
        <motion.g
          animate={controls}
          initial="visible"
          variants={
            {
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0 } },
              hidden: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
            } satisfies Variants
          }
        >
          {["M8 8H14", "M8 12H16", "M8 16H13"].map((d) => (
            <motion.path
              key={d}
              d={d}
              variants={
                {
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: { duration: 0.35, ease: "linear" },
                  },
                  hidden: {
                    pathLength: 0,
                    opacity: 1,
                    transition: { duration: 0.2, ease: "linear" },
                  },
                } satisfies Variants
              }
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
});
ReceiptTextIcon.displayName = "ReceiptTextIcon";

const BENEFIT_ICONS: Record<
  BenefitIcon,
  React.ForwardRefExoticComponent<IconProps & React.RefAttributes<BenefitIconHandle>>
> = {
  message: MessageCircleIcon,
  shield: ShieldCheckIcon,
  compass: CompassIcon,
  layers: TrendingUpIcon,
  lifebuoy: HeartHandshakeIcon,
  tag: ReceiptTextIcon,
};

export const BenefitIconMark = forwardRef<
  BenefitIconHandle,
  { icon: BenefitIcon; className?: string }
>(({ icon, className }, ref) => {
  const Icon = BENEFIT_ICONS[icon];
  return <Icon ref={ref} className={className} />;
});
BenefitIconMark.displayName = "BenefitIconMark";
