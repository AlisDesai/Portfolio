import type { Route } from "@/config/routes";

export interface NavItem {
  label: string;
  href: Route;
}

// TODO: Populate once site sections are defined. Kept empty to avoid inventing pages that don't exist yet.
export const NAV_ITEMS: NavItem[] = [];
