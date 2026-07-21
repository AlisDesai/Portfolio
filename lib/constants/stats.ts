export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const GLOBAL_STATS: StatItem[] = [
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 2025, suffix: "", label: "Founded" },
  { value: 5, suffix: "+", label: "Industries" },
  { value: 5, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Industries Facilitated" },
  { value: 10, suffix: "K+", label: "Users Served" },
];
