"use client";

import { motion } from "framer-motion";
import { COLLAGE_TILES, getDepthStyle } from "@/components/features/home/collage-tiles";
import { HeroCollageTile } from "@/components/features/home/HeroCollageTile";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface HeroCollageProps {
  reduceMotion: boolean;
}

export function HeroCollage({ reduceMotion }: HeroCollageProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {COLLAGE_TILES.map((tile) => {
        const { blur, opacity } = getDepthStyle(tile.depth);
        const delay = Number(tile.id.slice(1)) * 0.03;

        return (
          <motion.div
            key={tile.id}
            className="absolute"
            style={{ top: tile.top, left: tile.left, opacity }}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity, y: 0 }}
            transition={{ duration: 0.8, delay, ease: EASE_PREMIUM }}
          >
            <HeroCollageTile tile={tile} blurClassName={blur} />
          </motion.div>
        );
      })}
    </div>
  );
}
