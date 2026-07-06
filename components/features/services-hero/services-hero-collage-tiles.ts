export type PreviewTemplate =
  | "sidebar-dashboard"
  | "analytics-chart"
  | "ecommerce-grid"
  | "mobile-app"
  | "kpi-cards"
  | "form-panel";

export type PreviewPalette =
  "blue" | "indigo" | "violet" | "teal" | "emerald" | "amber" | "rose" | "cyan";

export interface CollageTile {
  id: string;
  top: string;
  left: string;
  width: number;
  rotate: number;
  depth: 1 | 2 | 3;
  template: PreviewTemplate;
  palette: PreviewPalette;
  title: string;
}

// Depth 1 sits directly behind the title, so it stays calmer (lower opacity,
// slight blur). Depth 2/3 carry the outer areas at full sharpness — matches
// the same depth treatment used on the Home Hero collage.
const DEPTH_STYLE: Record<CollageTile["depth"], { blur: string; opacity: number }> = {
  1: { blur: "blur-[2px]", opacity: 0.5 },
  2: { blur: "blur-none", opacity: 0.72 },
  3: { blur: "blur-none", opacity: 0.88 },
};

// Fixed, hand-placed layout (never randomized) so server/client markup always
// matches — dummy project previews themed around this page's own services.
// TODO: Swap these dummy mockups for real project screenshots once assets are ready.
export const COLLAGE_TILES: CollageTile[] = [
  {
    id: "s1",
    top: "5%",
    left: "3%",
    width: 190,
    rotate: -6,
    depth: 3,
    template: "sidebar-dashboard",
    palette: "blue",
    title: "Booking API",
  },
  {
    id: "s2",
    top: "8%",
    left: "84%",
    width: 175,
    rotate: 5,
    depth: 3,
    template: "kpi-cards",
    palette: "violet",
    title: "Stateless Auth",
  },
  {
    id: "s3",
    top: "20%",
    left: "14%",
    width: 150,
    rotate: 4,
    depth: 2,
    template: "mobile-app",
    palette: "teal",
    title: "Material Testing",
  },
  {
    id: "s4",
    top: "16%",
    left: "68%",
    width: 160,
    rotate: -5,
    depth: 2,
    template: "analytics-chart",
    palette: "emerald",
    title: "Lab Tasks",
  },
  {
    id: "s5",
    top: "34%",
    left: "4%",
    width: 145,
    rotate: -4,
    depth: 1,
    template: "form-panel",
    palette: "amber",
    title: "VPS Setup",
  },
  {
    id: "s6",
    top: "38%",
    left: "90%",
    width: 150,
    rotate: 6,
    depth: 1,
    template: "ecommerce-grid",
    palette: "rose",
    title: "JPA/Hibernate",
  },
  {
    id: "s7",
    top: "58%",
    left: "8%",
    width: 165,
    rotate: 5,
    depth: 2,
    template: "kpi-cards",
    palette: "cyan",
    title: "Stripe Webhook",
  },
  {
    id: "s8",
    top: "62%",
    left: "78%",
    width: 155,
    rotate: -6,
    depth: 2,
    template: "sidebar-dashboard",
    palette: "indigo",
    title: "Payment Gateway",
  },
  {
    id: "s9",
    top: "74%",
    left: "22%",
    width: 140,
    rotate: -3,
    depth: 1,
    template: "mobile-app",
    palette: "blue",
    title: "OAuth2",
  },
  {
    id: "s10",
    top: "78%",
    left: "60%",
    width: 145,
    rotate: 4,
    depth: 1,
    template: "analytics-chart",
    palette: "violet",
    title: "Spring Boot",
  },
  {
    id: "s11",
    top: "88%",
    left: "6%",
    width: 150,
    rotate: 5,
    depth: 3,
    template: "form-panel",
    palette: "teal",
    title: "Flutter Apps",
  },
  {
    id: "s12",
    top: "90%",
    left: "86%",
    width: 155,
    rotate: -5,
    depth: 3,
    template: "ecommerce-grid",
    palette: "amber",
    title: "REST APIs",
  },
];

export function getDepthStyle(depth: CollageTile["depth"]) {
  return DEPTH_STYLE[depth];
}

interface PaletteClasses {
  fill: string;
  fillSoft: string;
}

const PALETTE_CLASSES: Record<PreviewPalette, PaletteClasses> = {
  blue: { fill: "bg-blue-500", fillSoft: "bg-blue-500/40" },
  indigo: { fill: "bg-indigo-500", fillSoft: "bg-indigo-500/40" },
  violet: { fill: "bg-violet-500", fillSoft: "bg-violet-500/40" },
  teal: { fill: "bg-teal-500", fillSoft: "bg-teal-500/40" },
  emerald: { fill: "bg-emerald-500", fillSoft: "bg-emerald-500/40" },
  amber: { fill: "bg-amber-500", fillSoft: "bg-amber-500/40" },
  rose: { fill: "bg-rose-500", fillSoft: "bg-rose-500/40" },
  cyan: { fill: "bg-cyan-500", fillSoft: "bg-cyan-500/40" },
};

export function getPaletteClasses(palette: PreviewPalette) {
  return PALETTE_CLASSES[palette];
}
