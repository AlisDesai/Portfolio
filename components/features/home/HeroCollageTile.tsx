import { cn } from "@/lib/utils/cn";
import type { CollageTile } from "@/components/features/home/collage-tiles";

interface HeroCollageTileProps {
  tile: CollageTile;
  blurClassName: string;
}

/** Abstract grayscale UI mockup standing in for a real project screenshot. */
export function HeroCollageTile({ tile, blurClassName }: HeroCollageTileProps) {
  return (
    <div
      style={{ width: tile.width, transform: `rotate(${tile.rotate}deg)` }}
      className={cn(
        "aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-zinc-700/60 to-zinc-900/60 shadow-2xl",
        blurClassName
      )}
      aria-hidden="true"
    >
      {tile.variant === "browser" ? (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-2.5 py-1.5">
            <span className="size-1.5 rounded-full bg-white/30" />
            <span className="size-1.5 rounded-full bg-white/30" />
            <span className="size-1.5 rounded-full bg-white/30" />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 p-3">
            <div className="h-1.5 w-2/3 rounded-full bg-white/20" />
            <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
            <div className="mt-auto h-8 w-full rounded-md bg-white/10" />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-end gap-1.5 p-3">
          <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
      )}
    </div>
  );
}
