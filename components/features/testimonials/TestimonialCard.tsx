"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/components/features/testimonials/testimonials-data";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface TestimonialCardProps {
  testimonial: Testimonial;
  isInView: boolean;
  delay: number;
  reduceMotion: boolean;
}

export function TestimonialCard({
  testimonial,
  isInView,
  delay,
  reduceMotion,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE_PREMIUM }}
    >
      {/* Hover lift/shadow live on this nested, non-Framer-controlled element —
          putting them on the motion.div above would fight its own entrance
          transform and silently get overridden. */}
      <div className="rounded-3xl bg-white p-8 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06),0_12px_24px_-8px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08),0_24px_48px_-16px_rgba(129,140,248,0.3)]">
        <p className="text-base leading-relaxed font-medium text-zinc-600">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="text-accent mt-5 text-sm font-semibold">- {testimonial.name}</p>
      </div>
    </motion.div>
  );
}
