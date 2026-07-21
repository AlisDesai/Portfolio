"use client";

import { motion } from "framer-motion";
import { WORK_PROJECTS } from "@/components/features/work/work-data";

import { EASE_PREMIUM } from "@/components/animations/easing";

const titleLine = {
  hidden: { opacity: 1, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: EASE_PREMIUM },
  },
};

/** Kinetic mask-wipe title reveal, layered ambient glow (same
 * radial-gradient recipe as the Contact CTA band), and a faint numeral
 * watermark using the exact bg-clip-text technique as the footer's oversized
 * "HARSH" wordmark below — so the page's one signature texture bookends top
 * and bottom instead of introducing a new visual language. */
export function WorkHero() {
  return (
    <section className="relative mx-auto w-full max-w-[1400px] overflow-hidden px-6 pt-24 pb-20 sm:px-10 sm:pt-32 sm:pb-36 lg:px-16 lg:pb-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE_PREMIUM }}
          className="absolute top-[-25%] right-[-10%] size-[45vw] max-w-[640px] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.14),transparent_65%)] blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: EASE_PREMIUM }}
          className="absolute bottom-[-30%] left-[-10%] size-[35vw] max-w-[480px] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.06),transparent_65%)] blur-3xl"
        />
      </div>

      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -top-4 right-0 -z-10 bg-gradient-to-b from-zinc-900/[0.05] to-transparent bg-clip-text text-[26vw] leading-none font-extrabold text-transparent select-none sm:-top-8 lg:-top-14"
      >
        {String(WORK_PROJECTS.length).padStart(2, "0")}
      </span>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex items-center gap-3"
      >
        <span className="bg-accent h-px w-6" />
        <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
          {String(WORK_PROJECTS.length).padStart(2, "0")} Selected Case Studies
        </span>
      </motion.div>

      <h1 className="font-display relative mt-8 text-[clamp(2.125rem,calc(12.5vw-6px),4rem)] leading-[1.05] font-extrabold tracking-tighter text-zinc-900 sm:text-[5.5rem] md:text-[7rem]">
        <motion.span initial="hidden" animate="visible" variants={titleLine} className="block">
          Selected
        </motion.span>
        <motion.span
          initial="hidden"
          animate="visible"
          variants={titleLine}
          transition={{ delay: 0.12 }}
          className="text-accent block font-normal italic"
        >
          Works.
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE_PREMIUM }}
        className="relative mt-8 max-w-2xl text-xl leading-relaxed font-medium text-zinc-500 sm:text-2xl"
      >
        A curated showcase of digital experiences, where premium design meets relentless
        engineering.
      </motion.p>
    </section>
  );
}
