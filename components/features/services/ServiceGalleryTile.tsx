import { cn } from "@/lib/utils/cn";
import type {
  GalleryPalette,
  ServiceGalleryItem,
} from "@/components/features/services/services-gallery-data";

const CHART_BARS = [45, 70, 55, 85, 60, 95, 50];
const CHART_PEAK_INDEX = CHART_BARS.indexOf(Math.max(...CHART_BARS));

const PALETTE_CLASSES: Record<GalleryPalette, { from: string; to: string }> = {
  blue: { from: "from-blue-500", to: "to-blue-700" },
  indigo: { from: "from-indigo-500", to: "to-indigo-700" },
  violet: { from: "from-violet-500", to: "to-violet-700" },
  teal: { from: "from-teal-500", to: "to-teal-700" },
  emerald: { from: "from-emerald-500", to: "to-emerald-700" },
  amber: { from: "from-amber-500", to: "to-amber-700" },
  rose: { from: "from-rose-500", to: "to-rose-700" },
  cyan: { from: "from-cyan-500", to: "to-cyan-700" },
};

// Shared bar chart used by the "dashboard" and "analytics" templates — the
// tallest bar is highlighted solid white with a soft glow and a peak dot, so
// there's a single clear point of emphasis instead of every bar competing
// for attention at the same flat tone.
function ChartBars({ compact }: { compact?: boolean }) {
  return (
    <div className={cn("flex flex-1 items-end gap-1.5", compact && "h-16 flex-none")}>
      {CHART_BARS.map((height, index) => {
        const isPeak = index === CHART_PEAK_INDEX;
        return (
          <div key={index} className="relative flex-1 self-end">
            {isPeak && (
              <span className="absolute -top-2 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white" />
            )}
            <span
              style={{ height: `${height}%` }}
              className={cn(
                "block rounded-t-sm",
                isPeak ? "bg-white shadow-[0_0_14px_rgba(255,255,255,0.55)]" : "bg-white/25"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

function MockUiBody({ item }: { item: ServiceGalleryItem }) {
  switch (item.template) {
    case "dashboard":
      return (
        <div className="flex h-full">
          <div className="flex w-1/5 flex-col items-center gap-2.5 border-r border-white/15 bg-white/10 py-4">
            <span className="size-2.5 rounded-full bg-white/70" />
            <span className="h-1 w-2/3 rounded-full bg-white/30" />
            <span className="h-1 w-2/3 rounded-full bg-white/20" />
            <span className="h-1 w-2/3 rounded-full bg-white/20" />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <span className="h-2 w-1/2 rounded-full bg-white/30" />
              <span className="size-4 rounded-full bg-white/25" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-white/10 p-2">
                <span className="block h-1.5 w-1/2 rounded-full bg-white/90" />
              </div>
              <div className="rounded-lg bg-white/10 p-2">
                <span className="block h-1.5 w-1/2 rounded-full bg-white/90" />
              </div>
            </div>
            <div className="mt-auto flex h-16 items-end gap-1.5">
              <ChartBars />
            </div>
          </div>
        </div>
      );

    case "analytics":
      return (
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="h-2 w-1/3 rounded-full bg-white/30" />
            <span className="h-2 w-10 rounded-full bg-white/15" />
          </div>
          <ChartBars />
        </div>
      );

    case "table":
      return (
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <span className="h-2 w-1/3 rounded-full bg-white/30" />
            <span className="h-4 w-12 rounded-md border border-white/20 bg-white/15" />
          </div>
          <div className="mt-1 flex flex-col gap-2">
            {[0, 1, 2, 3, 4].map((row) => (
              <div key={row} className="flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="h-1.5 w-1/3 rounded-full bg-white/25" />
                <span className="h-1.5 flex-1 rounded-full bg-white/15" />
                <span className="h-2 w-6 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      );

    case "ecommerce":
      return (
        <div className="grid h-full grid-cols-3 gap-2 p-4">
          {[0, 1, 2, 3, 4, 5].map((card) => (
            <div
              key={card}
              className="flex flex-col gap-1.5 rounded-lg border border-white/15 bg-white/10 p-2"
            >
              <div className="aspect-square rounded-md bg-gradient-to-br from-white/20 to-white/5" />
              <span className="h-1 w-3/4 rounded-full bg-white/30" />
              <span className="h-1 w-1/2 rounded-full bg-white/70" />
            </div>
          ))}
        </div>
      );

    case "mobile":
      return (
        <div className="flex h-full items-center justify-center p-4">
          <div className="flex h-full w-2/5 flex-col rounded-2xl border border-white/20 bg-white/10 p-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="h-1 w-5 rounded-full bg-white/40" />
              <span className="size-1.5 rounded-full bg-white/40" />
            </div>
            <span className="mt-3 size-8 self-center rounded-full border border-white/25 bg-white/10" />
            <div className="mt-3 flex flex-col gap-1.5 px-1">
              <span className="h-1 w-full rounded-full bg-white/25" />
              <span className="h-1 w-4/5 rounded-full bg-white/20" />
            </div>
            <div className="mt-auto flex items-center justify-around border-t border-white/15 pt-2">
              {[0, 1, 2].map((icon) => (
                <span
                  key={icon}
                  className={cn("size-1.5 rounded-full", icon === 0 ? "bg-white" : "bg-white/30")}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case "kpi":
      return (
        <div className="flex h-full flex-col gap-3 p-4">
          <span className="h-2 w-1/2 rounded-full bg-white/30" />
          <div className="grid flex-1 grid-cols-3 gap-2">
            {[0, 1, 2].map((card) => (
              <div
                key={card}
                className="flex flex-col justify-between rounded-lg border border-white/15 bg-white/10 p-2"
              >
                <span className="h-1.5 w-3/4 rounded-full bg-white/25" />
                <span className="h-3 w-1/2 rounded-full bg-white/85" />
                <span className="h-1.5 w-2/3 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      );
  }
}

interface ServiceGalleryTileProps {
  item: ServiceGalleryItem;
}

/** Dummy portfolio preview standing in for a real project screenshot. */
export function ServiceGalleryTile({ item }: ServiceGalleryTileProps) {
  const { from, to } = PALETTE_CLASSES[item.palette];

  return (
    <div className="group/tile relative h-full w-full cursor-pointer rounded-2xl transition-shadow duration-500 ease-out hover:shadow-2xl">
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-500 ease-out group-hover/tile:scale-[1.04] group-hover/tile:brightness-110",
            from,
            to
          )}
        >
          <MockUiBody item={item} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

        {/* Same arrow-in-circle affordance used on the homepage service
            bento cards — reused here for a consistent, premium feel. */}
        <span className="absolute top-3 right-3 z-10 flex size-7 items-center justify-center rounded-full bg-white/10 text-white/70 ring-1 ring-white/15 backdrop-blur-sm transition-all duration-500 group-hover/tile:-rotate-45 group-hover/tile:bg-white group-hover/tile:text-black group-hover/tile:ring-white">
          <svg
            className="size-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
          <span className="text-[10px] font-medium tracking-wider text-white/70 uppercase">
            {item.category}
          </span>
          <p className="font-display text-sm font-semibold text-white sm:text-base">{item.title}</p>
        </div>
      </div>
    </div>
  );
}
