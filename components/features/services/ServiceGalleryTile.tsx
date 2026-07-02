import { cn } from "@/lib/utils/cn";
import type {
  GalleryPalette,
  ServiceGalleryItem,
} from "@/components/features/services/services-gallery-data";

const CHART_BARS = [45, 70, 55, 85, 60, 95, 50];

const PALETTE_CLASSES: Record<
  GalleryPalette,
  { from: string; to: string; fill: string; fillSoft: string }
> = {
  blue: {
    from: "from-blue-500",
    to: "to-blue-700",
    fill: "bg-blue-200",
    fillSoft: "bg-blue-200/40",
  },
  indigo: {
    from: "from-indigo-500",
    to: "to-indigo-700",
    fill: "bg-indigo-200",
    fillSoft: "bg-indigo-200/40",
  },
  violet: {
    from: "from-violet-500",
    to: "to-violet-700",
    fill: "bg-violet-200",
    fillSoft: "bg-violet-200/40",
  },
  teal: {
    from: "from-teal-500",
    to: "to-teal-700",
    fill: "bg-teal-200",
    fillSoft: "bg-teal-200/40",
  },
  emerald: {
    from: "from-emerald-500",
    to: "to-emerald-700",
    fill: "bg-emerald-200",
    fillSoft: "bg-emerald-200/40",
  },
  amber: {
    from: "from-amber-500",
    to: "to-amber-700",
    fill: "bg-amber-100",
    fillSoft: "bg-amber-100/40",
  },
  rose: {
    from: "from-rose-500",
    to: "to-rose-700",
    fill: "bg-rose-200",
    fillSoft: "bg-rose-200/40",
  },
  cyan: {
    from: "from-cyan-500",
    to: "to-cyan-700",
    fill: "bg-cyan-200",
    fillSoft: "bg-cyan-200/40",
  },
};

function MockUiBody({ item }: { item: ServiceGalleryItem }) {
  const { fill, fillSoft } = PALETTE_CLASSES[item.palette];

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
              <div className={cn("rounded-lg p-2", fillSoft)}>
                <span className="block h-1.5 w-1/2 rounded-full bg-white/70" />
              </div>
              <div className={cn("rounded-lg p-2", fillSoft)}>
                <span className="block h-1.5 w-1/2 rounded-full bg-white/70" />
              </div>
            </div>
            <div className="mt-auto flex h-16 items-end gap-1.5">
              {CHART_BARS.slice(0, 6).map((h, i) => (
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

    case "analytics":
      return (
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="h-2 w-1/3 rounded-full bg-white/30" />
            <span className={cn("h-2 w-10 rounded-full", fillSoft)} />
          </div>
          <div className="flex flex-1 items-end gap-1.5">
            {CHART_BARS.map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className={cn("flex-1 rounded-t-sm", i % 2 === 0 ? fill : fillSoft)}
              />
            ))}
          </div>
        </div>
      );

    case "table":
      return (
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <span className="h-2 w-1/3 rounded-full bg-white/30" />
            <span className={cn("h-4 w-12 rounded-md", fill)} />
          </div>
          <div className="mt-1 flex flex-col gap-2">
            {[0, 1, 2, 3, 4].map((row) => (
              <div key={row} className="flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="h-1.5 w-1/3 rounded-full bg-white/25" />
                <span className="h-1.5 flex-1 rounded-full bg-white/15" />
                <span className={cn("h-2 w-6 rounded-full", fillSoft)} />
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
              <div className={cn("aspect-square rounded-md", fillSoft)} />
              <span className="h-1 w-3/4 rounded-full bg-white/30" />
              <span className={cn("h-1 w-1/2 rounded-full", fill)} />
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
            <span className={cn("mt-3 size-8 self-center rounded-full", fillSoft)} />
            <div className="mt-3 flex flex-col gap-1.5 px-1">
              <span className="h-1 w-full rounded-full bg-white/25" />
              <span className="h-1 w-4/5 rounded-full bg-white/20" />
            </div>
            <div className="mt-auto flex items-center justify-around border-t border-white/15 pt-2">
              {[0, 1, 2].map((icon) => (
                <span
                  key={icon}
                  className={cn("size-1.5 rounded-full", icon === 0 ? fill : "bg-white/30")}
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
                <span className={cn("h-3 w-1/2 rounded-full", fill)} />
                <span className={cn("h-1.5 w-2/3 rounded-full", fillSoft)} />
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
