export interface CollageTile {
  id: string;
  top: string;
  left: string;
  width: number;
  rotate: number;
  depth: 1 | 2 | 3;
  variant: "browser" | "block";
}

const DEPTH_STYLE: Record<CollageTile["depth"], { blur: string; opacity: number }> = {
  1: { blur: "blur-[3px]", opacity: 0.3 },
  2: { blur: "blur-[1px]", opacity: 0.45 },
  3: { blur: "blur-none", opacity: 0.6 },
};

// Fixed, hand-placed layout (never randomized) so server/client markup always
// matches — 20 tiles scattered across the viewport at three depth layers.
// TODO: Swap these abstract mockups for real project screenshots once assets are ready.
export const COLLAGE_TILES: CollageTile[] = [
  { id: "t1", top: "8%", left: "6%", width: 220, rotate: -6, depth: 1, variant: "browser" },
  { id: "t2", top: "14%", left: "32%", width: 160, rotate: 4, depth: 2, variant: "block" },
  { id: "t3", top: "5%", left: "55%", width: 190, rotate: -3, depth: 1, variant: "browser" },
  { id: "t4", top: "10%", left: "78%", width: 210, rotate: 7, depth: 2, variant: "block" },
  { id: "t5", top: "22%", left: "90%", width: 150, rotate: -8, depth: 3, variant: "browser" },
  { id: "t6", top: "34%", left: "4%", width: 170, rotate: 5, depth: 3, variant: "block" },
  { id: "t7", top: "40%", left: "20%", width: 130, rotate: -4, depth: 1, variant: "browser" },
  { id: "t8", top: "46%", left: "46%", width: 150, rotate: 6, depth: 2, variant: "block" },
  { id: "t9", top: "38%", left: "68%", width: 180, rotate: -5, depth: 1, variant: "browser" },
  { id: "t10", top: "50%", left: "86%", width: 160, rotate: 3, depth: 2, variant: "block" },
  { id: "t11", top: "62%", left: "10%", width: 200, rotate: -7, depth: 2, variant: "browser" },
  { id: "t12", top: "70%", left: "30%", width: 140, rotate: 4, depth: 3, variant: "block" },
  { id: "t13", top: "64%", left: "52%", width: 170, rotate: -3, depth: 1, variant: "browser" },
  { id: "t14", top: "72%", left: "74%", width: 190, rotate: 6, depth: 2, variant: "block" },
  { id: "t15", top: "60%", left: "94%", width: 150, rotate: -5, depth: 1, variant: "browser" },
  { id: "t16", top: "82%", left: "16%", width: 160, rotate: 5, depth: 3, variant: "block" },
  { id: "t17", top: "88%", left: "40%", width: 130, rotate: -6, depth: 1, variant: "browser" },
  { id: "t18", top: "84%", left: "60%", width: 180, rotate: 4, depth: 2, variant: "block" },
  { id: "t19", top: "90%", left: "82%", width: 150, rotate: -4, depth: 3, variant: "browser" },
  { id: "t20", top: "2%", left: "14%", width: 140, rotate: 8, depth: 2, variant: "block" },
];

export function getDepthStyle(depth: CollageTile["depth"]) {
  return DEPTH_STYLE[depth];
}
