export const COMPANY_CONTACT = {
  email: "hello@portfolio.dev",
  phone: "+1 (555) 012-4567",
  address: "148 Market Street, San Francisco, CA 94105",
};

const EMAIL_HREF = `mailto:${COMPANY_CONTACT.email}`;
const PHONE_HREF = `tel:${COMPANY_CONTACT.phone.replace(/[^+\d]/g, "")}`;

export type FooterItemIcon = "mail" | "phone" | "pin";

export interface FooterLinkItem {
  label: string;
  href: string;
  icon?: FooterItemIcon;
}

export interface FooterColumn {
  title: string;
  items: FooterLinkItem[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Home",
    items: [
      { label: COMPANY_CONTACT.email, href: EMAIL_HREF, icon: "mail" },
      { label: COMPANY_CONTACT.phone, href: PHONE_HREF, icon: "phone" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: COMPANY_CONTACT.address, href: "#contact", icon: "pin" },
      { label: COMPANY_CONTACT.email, href: EMAIL_HREF, icon: "mail" },
      { label: COMPANY_CONTACT.phone, href: PHONE_HREF, icon: "phone" },
    ],
  },
];

export const PROJECT_INTERESTS = [
  "Full Website",
  "Web Application",
  "Mobile App",
  "UI / UX Design",
  "Branding",
  "AI Solutions",
  "Automation",
  "SaaS Platform",
  "Dashboard",
  "API Integration",
  "Backend Development",
  "Frontend Development",
] as const;

export const BUDGET_RANGES = ["10-20k", "30-40k", "40-50k", "50-100k", "> 100k"] as const;

export const PROJECT_TIMELINES = ["ASAP", "1-3 months", "3-6 months", "Flexible"] as const;

export type SocialPlatform = "LinkedIn" | "Instagram" | "Facebook" | "WhatsApp";

export interface SocialLink {
  name: SocialPlatform;
  href: string;
  // Each platform's own brand color, shown on hover instead of the site accent.
  brandColor: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "LinkedIn", href: "https://linkedin.com", brandColor: "#0A66C2" },
  { name: "Instagram", href: "https://instagram.com", brandColor: "#E4405F" },
  { name: "Facebook", href: "https://facebook.com", brandColor: "#1877F2" },
  { name: "WhatsApp", href: "https://wa.me/15550124567", brandColor: "#25D366" },
];
