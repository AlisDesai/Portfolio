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
    id: "backend-development",
    title: "Backend Development",
    gallery: [
      {
        title: "Automotive Booking API",
        category: "Backend",
        template: "dashboard",
        palette: "blue",
        size: "md",
      },
      {
        title: "Stateless Auth System",
        category: "Security",
        template: "mobile",
        palette: "indigo",
        size: "sm",
      },
      {
        title: "Stripe Webhook Handler",
        category: "Payments",
        template: "analytics",
        palette: "teal",
        size: "lg",
      },
      {
        title: "Resend Email Workflows",
        category: "Automation",
        template: "table",
        palette: "violet",
        size: "md",
      },
      {
        title: "Role-Based Access Control",
        category: "Security",
        template: "ecommerce",
        palette: "rose",
        size: "lg",
      },
      {
        title: "MySQL Optimization",
        category: "Database",
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
        title: "Material Testing App",
        category: "Mobile App",
        template: "mobile",
        palette: "emerald",
        size: "md",
      },
      {
        title: "Multi-Role Admin Panel",
        category: "Admin",
        template: "mobile",
        palette: "amber",
        size: "sm",
      },
      {
        title: "Job Number Generator",
        category: "Workflow",
        template: "dashboard",
        palette: "indigo",
        size: "lg",
      },
      {
        title: "Real-Time Notifications",
        category: "Firebase",
        template: "kpi",
        palette: "rose",
        size: "md",
      },
      {
        title: "Test Status Automation",
        category: "Automation",
        template: "analytics",
        palette: "blue",
        size: "lg",
      },
      {
        title: "Lab Task Assignment",
        category: "Management",
        template: "mobile",
        palette: "violet",
        size: "sm",
      },
    ],
  },
  {
    id: "system-architecture",
    title: "System Architecture",
    gallery: [
      {
        title: "Production VPS Setup",
        category: "DevOps",
        template: "dashboard",
        palette: "blue",
        size: "md",
      },
      {
        title: "Contabo Hosting",
        category: "Infrastructure",
        template: "table",
        palette: "cyan",
        size: "sm",
      },
      {
        title: "Secure RESTful APIs",
        category: "Architecture",
        template: "ecommerce",
        palette: "amber",
        size: "lg",
      },
      {
        title: "JPA/Hibernate Integration",
        category: "Database",
        template: "kpi",
        palette: "violet",
        size: "md",
      },
      {
        title: "Scalable Data Sync",
        category: "Architecture",
        template: "analytics",
        palette: "teal",
        size: "lg",
      },
      {
        title: "Automated Workflows",
        category: "Automation",
        template: "table",
        palette: "rose",
        size: "sm",
      },
    ],
  },
  {
    id: "api-integration",
    title: "API Integration",
    gallery: [
      {
        title: "Stripe Payment Gateway",
        category: "Payments",
        template: "dashboard",
        palette: "violet",
        size: "md",
      },
      {
        title: "Resend Email API",
        category: "Communications",
        template: "analytics",
        palette: "cyan",
        size: "sm",
      },
      {
        title: "Firebase Real-Time",
        category: "Cloud",
        template: "kpi",
        palette: "emerald",
        size: "lg",
      },
      {
        title: "OAuth2 Authentication",
        category: "Security",
        template: "table",
        palette: "blue",
        size: "md",
      },
      {
        title: "JWT Token Management",
        category: "Security",
        template: "analytics",
        palette: "amber",
        size: "lg",
      },
      {
        title: "Webhook Processing",
        category: "Events",
        template: "dashboard",
        palette: "rose",
        size: "sm",
      },
    ],
  },
];

