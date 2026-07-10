"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { ArrowUpRightIcon, CheckIcon, SpinnerIcon } from "@/components/features/contact/icons";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const SENDING_DURATION_MS = 900;
const SENT_DISPLAY_MS = 2200;

type SendStatus = "idle" | "sending" | "sent";

interface SendButtonProps {
  reduceMotion: boolean;
}

/** Premium CTA — subtle magnetic hover pull, a gradient sheen sweep, and a
 * local (UI-only, no submission endpoint exists yet) sending/sent transition. */
export function SendButton({ reduceMotion }: SendButtonProps) {
  const [status, setStatus] = useState<SendStatus>("idle");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.25);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (status !== "idle") return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), SENT_DISPLAY_MS);
    }, SENDING_DURATION_MS);
  };

  const label =
    status === "sending" ? "Sending" : status === "sent" ? "Message Sent" : "Send Message";

  return (
    <div className="relative inline-flex">
      {/* Soft idle "breathing" glow — same accent-pulse language as the
          heading's status dot, just scaled up to sit behind the CTA. Lives
          outside the button so its own overflow-hidden doesn't clip it. */}
      {status === "idle" && !reduceMotion && (
        <span
          aria-hidden="true"
          className="bg-accent/25 pointer-events-none absolute -inset-3 -z-10 animate-pulse rounded-full blur-xl"
        />
      )}

      <motion.button
        type="button"
        disabled={status !== "idle"}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={reduceMotion ? undefined : { x: springX, y: springY }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        className="group hover:bg-accent relative flex items-center gap-6 overflow-hidden rounded-full bg-zinc-900 px-8 py-5 text-xl font-bold text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(129,140,248,0.5)] disabled:pointer-events-none sm:px-10 sm:py-6 sm:text-2xl"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={{ duration: 0.25, ease: EASE_PREMIUM }}
            className="relative"
          >
            {label}
          </motion.span>
        </AnimatePresence>

        <span className="relative flex size-12 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:bg-white/20">
          {status === "sending" ? (
            <SpinnerIcon className="size-6 animate-spin text-white" />
          ) : status === "sent" ? (
            <CheckIcon className="size-6 text-white" />
          ) : (
            <ArrowUpRightIcon className="size-6 text-white" />
          )}
        </span>
      </motion.button>
    </div>
  );
}
