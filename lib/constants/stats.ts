export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const GLOBAL_STATS: StatItem[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 2023, suffix: "", label: "Founded" },
  { value: 20, suffix: "+", label: "Industries" },
  { value: 15, suffix: "+", label: "Happy Clients" },
  { value: 30, suffix: "+", label: "Industries Facilitated" },
  { value: 10, suffix: "K+", label: "Users Served" },
];
