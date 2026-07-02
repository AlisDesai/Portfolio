export type GalleryTemplate = "dashboard" | "analytics" | "table" | "ecommerce" | "mobile" | "kpi";

export type GalleryPalette =
  "blue" | "indigo" | "violet" | "teal" | "emerald" | "amber" | "rose" | "cyan";

export type GallerySize = "sm" | "md" | "lg";

export interface ServiceGalleryItem {
  title: string;
  category: string;
  template: GalleryTemplate;
  palette: GalleryPalette;
  size: GallerySize;
}

export interface ServiceItem {
  id: string;
  title: string;
  gallery: ServiceGalleryItem[];
}

// Dummy portfolio previews standing in for real project screenshots.
// TODO: Swap these mockups for real project screenshots once assets are ready.
export const SERVICES: ServiceItem[] = [
  {
    id: "ui-ux",
    title: "UI / UX Design",
    gallery: [
      {
        title: "SaaS Dashboard",
        category: "UI/UX",
        template: "dashboard",
        palette: "blue",
        size: "md",
      },
      {
        title: "Banking App",
        category: "UI/UX",
        template: "mobile",
        palette: "indigo",
        size: "sm",
      },
      {
        title: "Healthcare Dashboard",
        category: "UI/UX",
        template: "analytics",
        palette: "teal",
        size: "lg",
      },
      {
        title: "CRM Platform",
        category: "UI/UX",
        template: "table",
        palette: "violet",
        size: "md",
      },
      {
        title: "Ecommerce Storefront",
        category: "UI/UX",
        template: "ecommerce",
        palette: "rose",
        size: "lg",
      },
      {
        title: "Analytics Platform",
        category: "UI/UX",
        template: "kpi",
        palette: "cyan",
        size: "sm",
      },
    ],
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    gallery: [
      {
        title: "Fitness Tracker App",
        category: "Mobile App",
        template: "mobile",
        palette: "emerald",
        size: "md",
      },
      {
        title: "Food Delivery App",
        category: "Mobile App",
        template: "mobile",
        palette: "amber",
        size: "sm",
      },
      {
        title: "Banking App",
        category: "Mobile App",
        template: "dashboard",
        palette: "indigo",
        size: "lg",
      },
      {
        title: "Social Media App",
        category: "Mobile App",
        template: "kpi",
        palette: "rose",
        size: "md",
      },
      {
        title: "Ride Sharing App",
        category: "Mobile App",
        template: "analytics",
        palette: "blue",
        size: "lg",
      },
      {
        title: "Music Streaming App",
        category: "Mobile App",
        template: "mobile",
        palette: "violet",
        size: "sm",
      },
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    gallery: [
      {
        title: "SaaS Dashboard",
        category: "Web Platform",
        template: "dashboard",
        palette: "blue",
        size: "md",
      },
      {
        title: "ERP System",
        category: "Web Platform",
        template: "table",
        palette: "cyan",
        size: "sm",
      },
      {
        title: "Ecommerce Platform",
        category: "Web Platform",
        template: "ecommerce",
        palette: "amber",
        size: "lg",
      },
      {
        title: "CRM Software",
        category: "Web Platform",
        template: "kpi",
        palette: "violet",
        size: "md",
      },
      {
        title: "Analytics Platform",
        category: "Web Platform",
        template: "analytics",
        palette: "teal",
        size: "lg",
      },
      {
        title: "Real Estate Portal",
        category: "Web Platform",
        template: "table",
        palette: "rose",
        size: "sm",
      },
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    gallery: [
      {
        title: "AI Dashboard",
        category: "AI Platform",
        template: "dashboard",
        palette: "violet",
        size: "md",
      },
      {
        title: "Predictive Analytics",
        category: "AI Platform",
        template: "analytics",
        palette: "cyan",
        size: "sm",
      },
      {
        title: "Computer Vision Platform",
        category: "AI Platform",
        template: "kpi",
        palette: "emerald",
        size: "lg",
      },
      {
        title: "NLP Insights Dashboard",
        category: "AI Platform",
        template: "table",
        palette: "blue",
        size: "md",
      },
      {
        title: "Recommendation Engine",
        category: "AI Platform",
        template: "analytics",
        palette: "amber",
        size: "lg",
      },
      {
        title: "Fraud Detection System",
        category: "AI Platform",
        template: "dashboard",
        palette: "rose",
        size: "sm",
      },
    ],
  },
];
