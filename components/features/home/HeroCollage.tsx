"use client";

import { motion } from "framer-motion";
import { COLLAGE_TILES, getDepthStyle } from "@/components/features/home/collage-tiles";
import { HeroCollageTile } from "@/components/features/home/HeroCollageTile";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

interface HeroCollageProps {
  reduceMotion: boolean;
}

// Reveal delay is grouped (not per-tile) so the collage builds itself in small
// clusters rather than fading in as one flat wave, with a touch of natural
// variance within each group.
const COLLAGE_START = 0.1;
const GROUP_SIZE = 5;
const GROUP_STEP = 0.12;
const GROUP_JITTER = 0.03;

export function HeroCollage({ reduceMotion }: HeroCollageProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {COLLAGE_TILES.map((tile, index) => {
        const { blur, opacity } = getDepthStyle(tile.depth);
        const group = Math.floor(index / GROUP_SIZE);
        const positionInGroup = index % GROUP_SIZE;
        const delay = COLLAGE_START + group * GROUP_STEP + positionInGroup * GROUP_JITTER;

        return (
          <motion.div
            key={tile.id}
            className="absolute"
            style={{ top: tile.top, left: tile.left, opacity }}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
            animate={{ opacity, scale: 1 }}
            transition={{ duration: 0.7, delay, ease: EASE_PREMIUM }}
          >
            <HeroCollageTile tile={tile} blurClassName={blur} />
          </motion.div>
        );
      })}
    </div>
  );
}
