export interface NavItem {
  label: string;
  href: string;
}

// TODO: Point at dedicated routes once /work, /services, /contact pages exist.
// In-page anchors for now since the site is a single hero-led landing page.
export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
