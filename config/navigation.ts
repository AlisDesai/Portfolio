import { ROUTES } from "@/config/routes";

export interface NavItem {
  label: string;
  href: string;
}

// exist — in-page anchors for now. "Services" now has its own page.
export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: ROUTES.SERVICES },
  { label: "Contact", href: ROUTES.CONTACT },
];
