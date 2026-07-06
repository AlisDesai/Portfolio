export interface FloatingPill {
  label: string;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
}

// Fixed, hand-placed at the edges around the title — well clear of the
// centered headline column at every breakpoint.
export const FLOATING_PILLS: FloatingPill[] = [
  { label: "Backend Development", top: "16%", left: "8%", rotate: -8 },
  { label: "Mobile Development", top: "14%", right: "8%", rotate: 6 },
  { label: "System Architecture", top: "44%", left: "4%", rotate: -5 },
  { label: "API Integration", top: "42%", right: "4%", rotate: 5 },
  { label: "Database Design", top: "72%", right: "10%", rotate: 4 },
  { label: "Server Administration", top: "74%", left: "10%", rotate: -6 },
];

export const MARQUEE_ITEMS = [
  "Robust Backends",
  "Scalable Systems",
  "Secure APIs",
  "Optimized Databases",
  "Cross-Platform Apps",
  "Reliable Deployments",
] as const;
