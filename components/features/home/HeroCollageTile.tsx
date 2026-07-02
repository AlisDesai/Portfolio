import { cn } from "@/lib/utils/cn";
import { getPaletteClasses, type CollageTile } from "@/components/features/home/collage-tiles";

interface HeroCollageTileProps {
  tile: CollageTile;
  blurClassName: string;
}

const CHART_BARS = [45, 65, 50, 80, 60, 90, 55];
const CALENDAR_CELLS = Array.from({ length: 21 });

function TemplateBody({ tile }: { tile: CollageTile }) {
  const { fill, fillSoft, border } = getPaletteClasses(tile.palette);

  switch (tile.template) {
    case "sidebar-dashboard":
      return (
        <div className="flex h-full">
          <div className="flex w-1/5 flex-col items-center gap-2 border-r border-white/15 bg-white/10 py-3">
            <span className={cn("size-2 rounded-full", fill)} />
            <span className="h-1 w-2/3 rounded-full bg-white/30" />
            <span className="h-1 w-2/3 rounded-full bg-white/20" />
            <span className="h-1 w-2/3 rounded-full bg-white/20" />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-2.5">
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-1/2 rounded-full bg-white/30" />
              <span className="size-3 rounded-full bg-white/25" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className={cn("rounded-md p-1.5", fillSoft)}>
                <span className="block h-1 w-1/2 rounded-full bg-white/60" />
              </div>
              <div className={cn("rounded-md p-1.5", fillSoft)}>
                <span className="block h-1 w-1/2 rounded-full bg-white/60" />
              </div>
            </div>
            <div className="mt-auto flex h-8 items-end gap-1">
              {CHART_BARS.slice(0, 5).map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className={cn("flex-1 rounded-t-sm", fill)}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case "analytics-chart":
      return (
        <div className="flex h-full flex-col gap-2 p-2.5">
          <div className="flex items-center justify-between">
            <span className="h-1.5 w-1/3 rounded-full bg-white/30" />
            <span className={cn("h-1.5 w-6 rounded-full", fillSoft)} />
          </div>
          <div className="flex flex-1 items-end gap-1">
            {CHART_BARS.map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className={cn("flex-1 rounded-t-sm", i % 2 === 0 ? fill : fillSoft)}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("size-1.5 rounded-full", fill)} />
            <span className="h-1 w-1/4 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/30" />
            <span className="h-1 w-1/4 rounded-full bg-white/20" />
          </div>
        </div>
      );

    case "table-admin":
      return (
        <div className="flex h-full flex-col gap-1.5 p-2.5">
          <div className="flex items-center justify-between">
            <span className="h-1.5 w-1/3 rounded-full bg-white/30" />
            <span className={cn("h-3 w-8 rounded-md", fill)} />
          </div>
          <div className="mt-1 flex flex-col gap-1.5">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="flex items-center gap-1.5 border-b border-white/10 pb-1">
                <span className="h-1 w-1/3 rounded-full bg-white/25" />
                <span className="h-1 flex-1 rounded-full bg-white/15" />
                <span className={cn("h-1.5 w-3 rounded-full", fillSoft)} />
              </div>
            ))}
          </div>
        </div>
      );

    case "ecommerce-grid":
      return (
        <div className="grid h-full grid-cols-2 gap-1.5 p-2.5">
          {[0, 1, 2, 3].map((card) => (
            <div
              key={card}
              className="flex flex-col gap-1 rounded-md border border-white/15 bg-white/10 p-1.5"
            >
              <div className={cn("aspect-video rounded-sm", fillSoft)} />
              <span className="h-1 w-3/4 rounded-full bg-white/30" />
              <span className={cn("h-1 w-1/2 rounded-full", fill)} />
            </div>
          ))}
        </div>
      );

    case "mobile-app":
      return (
        <div className="flex h-full flex-col items-center bg-white/10 p-2">
          <div className="flex w-full items-center justify-between px-1">
            <span className="h-1 w-4 rounded-full bg-white/30" />
            <span className="size-1 rounded-full bg-white/40" />
          </div>
          <span className={cn("mt-2 size-6 rounded-full", fillSoft)} />
          <div className="mt-2 flex w-full flex-col gap-1 px-1">
            <span className="h-1 w-full rounded-full bg-white/25" />
            <span className="h-1 w-4/5 rounded-full bg-white/20" />
            <span className="h-1 w-full rounded-full bg-white/25" />
          </div>
          <div className="mt-auto flex w-full items-center justify-around border-t border-white/15 pt-1.5">
            {[0, 1, 2, 3].map((icon) => (
              <span
                key={icon}
                className={cn("size-1.5 rounded-full", icon === 0 ? fill : "bg-white/30")}
              />
            ))}
          </div>
        </div>
      );

    case "kanban":
      return (
        <div className="flex h-full gap-1.5 p-2.5">
          {[0, 1, 2].map((column) => (
            <div key={column} className="flex flex-1 flex-col gap-1.5">
              <span className="h-1 w-2/3 rounded-full bg-white/30" />
              <div className={cn("rounded-md border bg-white/10 p-1.5", border)}>
                <span className="block h-1 w-full rounded-full bg-white/25" />
                <span className="mt-1 block h-1 w-2/3 rounded-full bg-white/20" />
              </div>
              <div className="rounded-md border border-white/15 bg-white/10 p-1.5">
                <span className="block h-1 w-full rounded-full bg-white/25" />
              </div>
            </div>
          ))}
        </div>
      );

    case "form-panel":
      return (
        <div className="flex h-full flex-col gap-2 p-2.5">
          <span className="h-1.5 w-1/2 rounded-full bg-white/30" />
          <div className="flex flex-col gap-1.5">
            {[0, 1, 2].map((field) => (
              <span
                key={field}
                className="h-2.5 w-full rounded-md border border-white/15 bg-white/10"
              />
            ))}
          </div>
          <span className={cn("mt-auto h-3 w-1/3 rounded-md", fill)} />
        </div>
      );

    case "profile-stats":
      return (
        <div className="flex h-full flex-col gap-2 p-2.5">
          <div className="flex items-center gap-2">
            <span className={cn("size-5 rounded-full", fillSoft)} />
            <div className="flex flex-col gap-1">
              <span className="h-1 w-10 rounded-full bg-white/30" />
              <span className="h-1 w-6 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            {[70, 45, 85].map((width, i) => (
              <div key={i} className="h-1 w-full rounded-full bg-white/20">
                <div style={{ width: `${width}%` }} className={cn("h-full rounded-full", fill)} />
              </div>
            ))}
          </div>
        </div>
      );

    case "kpi-cards":
      return (
        <div className="flex h-full flex-col gap-2 p-2.5">
          <span className="h-1.5 w-1/2 rounded-full bg-white/30" />
          <div className="grid flex-1 grid-cols-3 gap-1.5">
            {[0, 1, 2].map((card) => (
              <div
                key={card}
                className="flex flex-col justify-between rounded-md border border-white/15 bg-white/10 p-1.5"
              >
                <span className="h-1 w-3/4 rounded-full bg-white/25" />
                <span className={cn("h-2 w-1/2 rounded-full", fill)} />
                <span className={cn("h-1 w-2/3 rounded-full", fillSoft)} />
              </div>
            ))}
          </div>
        </div>
      );

    case "calendar":
      return (
        <div className="flex h-full flex-col gap-2 p-2.5">
          <div className="flex items-center justify-between">
            <span className="h-1.5 w-1/3 rounded-full bg-white/30" />
            <span className={cn("size-2 rounded-full", fill)} />
          </div>
          <div className="grid flex-1 grid-cols-7 gap-0.75">
            {CALENDAR_CELLS.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "rounded-xs",
                  i === 9 || i === 16 ? fill : i % 5 === 0 ? fillSoft : "bg-white/15"
                )}
              />
            ))}
          </div>
        </div>
      );
  }
}

/** Grayscale-overlaid dummy project preview standing in for a real screenshot. */
export function HeroCollageTile({ tile, blurClassName }: HeroCollageTileProps) {
  return (
    <div
      style={{ width: tile.width, transform: `rotate(${tile.rotate}deg)` }}
      className={cn(
        "aspect-[4/3] overflow-hidden rounded-xl border border-white/20 bg-linear-to-br from-zinc-500/90 to-zinc-800/90 shadow-2xl grayscale",
        blurClassName
      )}
      aria-hidden="true"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-1.5 border-b border-white/15 bg-white/10 px-2 py-1">
          <span className="size-1 rounded-full bg-white/40" />
          <span className="size-1 rounded-full bg-white/40" />
          <span className="size-1 rounded-full bg-white/40" />
          <span className="ml-1 truncate text-[6px] font-medium tracking-wide text-white/60 uppercase">
            {tile.title}
          </span>
        </div>
        <div className="flex-1">
          <TemplateBody tile={tile} />
        </div>
      </div>
    </div>
  );
}
