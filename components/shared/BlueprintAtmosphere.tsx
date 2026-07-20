"use client";

import { motion } from "framer-motion";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/** Shared engineering/blueprint atmosphere for the Services Page's light
 * sections (Benefits, and the footer-only Contact instance) — a fine
 * technical grid, soft accent lighting, and quiet corner registration marks
 * that continue the Services Hero's own precision/HUD visual language, so
 * the page reads as one cohesive identity instead of a distinct dark hero
 * followed by generic flat white. Purely decorative. */
export function BlueprintAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fine technical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Soft accent lighting, top-center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE_PREMIUM }}
        className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(99,102,241,0.06),transparent_70%)]"
      />

      {/* Corner registration marks — echoes the Hero's own HUD/viewfinder
          corner labels, at a much quieter scale */}
      <div className="absolute inset-6 sm:inset-10 lg:inset-16">
        <span className="absolute top-0 left-0 size-3 border-t border-l border-zinc-300" />
        <span className="absolute top-0 right-0 size-3 border-t border-r border-zinc-300" />
        <span className="absolute bottom-0 left-0 size-3 border-b border-l border-zinc-300" />
        <span className="absolute right-0 bottom-0 size-3 border-r border-b border-zinc-300" />
      </div>
    </div>
  );
}
