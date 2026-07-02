export type PreviewTemplate =
  | "sidebar-dashboard"
  | "analytics-chart"
  | "table-admin"
  | "ecommerce-grid"
  | "mobile-app"
  | "kanban"
  | "form-panel"
  | "profile-stats"
  | "kpi-cards"
  | "calendar";

export type PreviewPalette =
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "orange"
  | "amber"
  | "teal"
  | "emerald"
  | "cyan"
  | "sky"
  | "red";

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

// Depth 1 sits directly behind the headline, so it stays calmer (lower
// opacity, a slight blur). Depth 2/3 carry the outer areas and stay fully
// sharp and clearly visible — only the center is ever softened.
const DEPTH_STYLE: Record<CollageTile["depth"], { blur: string; opacity: number }> = {
  1: { blur: "blur-[2px]", opacity: 0.55 },
  2: { blur: "blur-none", opacity: 0.78 },
  3: { blur: "blur-none", opacity: 0.94 },
};

// Fixed, hand-placed layout (never randomized) so server/client markup always
// matches — 22 dummy project previews covering edge to edge. The vertical/
// horizontal band directly behind the headline is kept at depth 1 (softer);
// everything else sits at depth 2/3 so the outer areas read as a rich,
// unmistakably real portfolio at a glance.
// TODO: Swap these dummy mockups for real project screenshots once assets are ready.
export const COLLAGE_TILES: CollageTile[] = [
  {
    id: "t1",
    top: "6%",
    left: "4%",
    width: 215,
    rotate: -6,
    depth: 3,
    template: "sidebar-dashboard",
    palette: "blue",
    title: "SaaS Dashboard",
  },
  {
    id: "t2",
    top: "4%",
    left: "24%",
    width: 170,
    rotate: 5,
    depth: 3,
    template: "table-admin",
    palette: "indigo",
    title: "CRM Dashboard",
  },
  {
    id: "t3",
    top: "8%",
    left: "44%",
    width: 190,
    rotate: -4,
    depth: 3,
    template: "analytics-chart",
    palette: "emerald",
    title: "Banking Dashboard",
  },
  {
    id: "t4",
    top: "3%",
    left: "64%",
    width: 180,
    rotate: 6,
    depth: 3,
    template: "kpi-cards",
    palette: "teal",
    title: "Finance Platform",
  },
  {
    id: "t5",
    top: "10%",
    left: "84%",
    width: 200,
    rotate: -7,
    depth: 3,
    template: "profile-stats",
    palette: "sky",
    title: "Healthcare Portal",
  },
  {
    id: "t6",
    top: "22%",
    left: "12%",
    width: 160,
    rotate: 4,
    depth: 2,
    template: "profile-stats",
    palette: "pink",
    title: "HR Management System",
  },
  {
    id: "t7",
    top: "26%",
    left: "92%",
    width: 150,
    rotate: -5,
    depth: 2,
    template: "calendar",
    palette: "blue",
    title: "School Management System",
  },
  {
    id: "t8",
    top: "32%",
    left: "30%",
    width: 130,
    rotate: -4,
    depth: 2,
    template: "kanban",
    palette: "orange",
    title: "Restaurant POS",
  },
  {
    id: "t9",
    top: "30%",
    left: "68%",
    width: 140,
    rotate: 6,
    depth: 2,
    template: "ecommerce-grid",
    palette: "rose",
    title: "E-commerce Admin",
  },
  {
    id: "t10",
    top: "42%",
    left: "6%",
    width: 180,
    rotate: -6,
    depth: 2,
    template: "table-admin",
    palette: "amber",
    title: "Inventory Management",
  },
  {
    id: "t11",
    top: "44%",
    left: "92%",
    width: 170,
    rotate: 5,
    depth: 2,
    template: "ecommerce-grid",
    palette: "amber",
    title: "Real Estate Portal",
  },
  {
    id: "t12",
    top: "48%",
    left: "22%",
    width: 120,
    rotate: -3,
    depth: 1,
    template: "calendar",
    palette: "purple",
    title: "Travel Booking Platform",
  },
  {
    id: "t13",
    top: "50%",
    left: "78%",
    width: 125,
    rotate: 4,
    depth: 1,
    template: "analytics-chart",
    palette: "blue",
    title: "Logistics Dashboard",
  },
  {
    id: "t14",
    top: "58%",
    left: "38%",
    width: 115,
    rotate: -5,
    depth: 1,
    template: "kpi-cards",
    palette: "fuchsia",
    title: "Marketing Analytics",
  },
  {
    id: "t15",
    top: "60%",
    left: "62%",
    width: 120,
    rotate: 6,
    depth: 1,
    template: "kanban",
    palette: "teal",
    title: "Project Management Tool",
  },
  {
    id: "t16",
    top: "68%",
    left: "8%",
    width: 175,
    rotate: -4,
    depth: 2,
    template: "form-panel",
    palette: "red",
    title: "Customer Support Dashboard",
  },
  {
    id: "t17",
    top: "72%",
    left: "90%",
    width: 165,
    rotate: 5,
    depth: 2,
    template: "mobile-app",
    palette: "sky",
    title: "Mobile App UI",
  },
  {
    id: "t18",
    top: "78%",
    left: "28%",
    width: 180,
    rotate: -6,
    depth: 2,
    template: "ecommerce-grid",
    palette: "purple",
    title: "Portfolio Website",
  },
  {
    id: "t19",
    top: "82%",
    left: "52%",
    width: 160,
    rotate: 4,
    depth: 3,
    template: "profile-stats",
    palette: "indigo",
    title: "Social Media Dashboard",
  },
  {
    id: "t20",
    top: "86%",
    left: "72%",
    width: 170,
    rotate: -5,
    depth: 3,
    template: "mobile-app",
    palette: "emerald",
    title: "Fitness Tracking App",
  },
  {
    id: "t21",
    top: "92%",
    left: "14%",
    width: 150,
    rotate: 6,
    depth: 3,
    template: "table-admin",
    palette: "cyan",
    title: "ERP System",
  },
  {
    id: "t22",
    top: "94%",
    left: "88%",
    width: 155,
    rotate: -4,
    depth: 3,
    template: "sidebar-dashboard",
    palette: "violet",
    title: "AI Analytics Dashboard",
  },
];

export function getDepthStyle(depth: CollageTile["depth"]) {
  return DEPTH_STYLE[depth];
}

interface PaletteClasses {
  fill: string;
  fillSoft: string;
  border: string;
  text: string;
}

const PALETTE_CLASSES: Record<PreviewPalette, PaletteClasses> = {
  blue: {
    fill: "bg-blue-500",
    fillSoft: "bg-blue-500/40",
    border: "border-blue-400/50",
    text: "text-blue-300",
  },
  indigo: {
    fill: "bg-indigo-500",
    fillSoft: "bg-indigo-500/40",
    border: "border-indigo-400/50",
    text: "text-indigo-300",
  },
  violet: {
    fill: "bg-violet-500",
    fillSoft: "bg-violet-500/40",
    border: "border-violet-400/50",
    text: "text-violet-300",
  },
  purple: {
    fill: "bg-purple-500",
    fillSoft: "bg-purple-500/40",
    border: "border-purple-400/50",
    text: "text-purple-300",
  },
  fuchsia: {
    fill: "bg-fuchsia-500",
    fillSoft: "bg-fuchsia-500/40",
    border: "border-fuchsia-400/50",
    text: "text-fuchsia-300",
  },
  pink: {
    fill: "bg-pink-500",
    fillSoft: "bg-pink-500/40",
    border: "border-pink-400/50",
    text: "text-pink-300",
  },
  rose: {
    fill: "bg-rose-500",
    fillSoft: "bg-rose-500/40",
    border: "border-rose-400/50",
    text: "text-rose-300",
  },
  orange: {
    fill: "bg-orange-500",
    fillSoft: "bg-orange-500/40",
    border: "border-orange-400/50",
    text: "text-orange-300",
  },
  amber: {
    fill: "bg-amber-500",
    fillSoft: "bg-amber-500/40",
    border: "border-amber-400/50",
    text: "text-amber-300",
  },
  teal: {
    fill: "bg-teal-500",
    fillSoft: "bg-teal-500/40",
    border: "border-teal-400/50",
    text: "text-teal-300",
  },
  emerald: {
    fill: "bg-emerald-500",
    fillSoft: "bg-emerald-500/40",
    border: "border-emerald-400/50",
    text: "text-emerald-300",
  },
  cyan: {
    fill: "bg-cyan-500",
    fillSoft: "bg-cyan-500/40",
    border: "border-cyan-400/50",
    text: "text-cyan-300",
  },
  sky: {
    fill: "bg-sky-500",
    fillSoft: "bg-sky-500/40",
    border: "border-sky-400/50",
    text: "text-sky-300",
  },
  red: {
    fill: "bg-red-500",
    fillSoft: "bg-red-500/40",
    border: "border-red-400/50",
    text: "text-red-300",
  },
};

export function getPaletteClasses(palette: PreviewPalette) {
  return PALETTE_CLASSES[palette];
}
