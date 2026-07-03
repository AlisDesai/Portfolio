import { ROUTES } from "@/config/routes";

export interface NavItem {
  label: string;
  href: string;
}

// TODO: Point "Work" and "Contact" at dedicated routes once those pages
// exist — in-page anchors for now. "Services" now has its own page.
export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: ROUTES.SERVICES },
  { label: "Contact", href: "#contact" },
];
