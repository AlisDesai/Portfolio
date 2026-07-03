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
  { label: "UI/UX", top: "16%", left: "8%", rotate: -8 },
  { label: "Web Development", top: "14%", right: "8%", rotate: 6 },
  { label: "Mobile Development", top: "44%", left: "4%", rotate: -5 },
  { label: "Machine Learning", top: "42%", right: "4%", rotate: 5 },
  { label: "Cloud Engineering", top: "72%", right: "10%", rotate: 4 },
  { label: "AI Solutions", top: "74%", left: "10%", rotate: -6 },
];

export const MARQUEE_ITEMS = [
  "Transformative Insights",
  "Visionary Excellence",
  "Pushing Boundaries",
  "Beyond Expectations",
  "Crafting Tomorrow",
  "Revolutionizing Experiences",
] as const;
