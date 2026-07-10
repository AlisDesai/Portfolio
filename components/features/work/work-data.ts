export interface WorkProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  theme: "blue" | "emerald" | "violet" | "amber" | "rose";
}

// Used by the /work page's editorial index + hover preview only — WorkStack
// (home page) keeps its own separate theme-class map untouched.
export const WORK_THEME_GRADIENTS: Record<WorkProject["theme"], string> = {
  blue: "from-blue-500 to-blue-300",
  emerald: "from-emerald-500 to-emerald-300",
  violet: "from-violet-500 to-violet-300",
  amber: "from-amber-500 to-amber-300",
  rose: "from-rose-500 to-rose-300",
};

export const WORK_THEME_ACCENTS: Record<WorkProject["theme"], string> = {
  blue: "text-blue-600",
  emerald: "text-emerald-600",
  violet: "text-violet-600",
  amber: "text-amber-600",
  rose: "text-rose-600",
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "booking-api",
    title: "Automotive Booking API",
    category: "Backend Development",
    description:
      "Engineered a high-performance, stateless booking API handling thousands of concurrent requests with Redis caching and JWT authentication.",
    tags: ["Node.js", "Express", "Redis", "JWT"],
    theme: "blue",
  },
  {
    id: "material-testing",
    title: "Material Testing App",
    category: "Mobile Development",
    description:
      "Developed a cross-platform Flutter application for lab technicians to record and analyze material testing data in real-time.",
    tags: ["Flutter", "Dart", "Firebase", "REST APIs"],
    theme: "emerald",
  },
  {
    id: "production-vps",
    title: "Production VPS Setup",
    category: "System Architecture",
    description:
      "Architected a scalable production environment on Linux VPS, implementing reverse proxies, SSL termination, and automated CI/CD pipelines.",
    tags: ["Linux", "Nginx", "Docker", "CI/CD"],
    theme: "violet",
  },
  {
    id: "stripe-webhook",
    title: "Stripe Webhook Handler",
    category: "API Integration",
    description:
      "Built a secure, idempotent webhook processing microservice to automate billing, invoicing, and subscription management via Stripe.",
    tags: ["Stripe API", "Node.js", "PostgreSQL", "Webhooks"],
    theme: "amber",
  },
  {
    id: "oauth2-auth",
    title: "OAuth2 Auth Server",
    category: "Security & IAM",
    description:
      "Designed a centralized OAuth2 authentication provider supporting Single Sign-On (SSO), social logins, and multi-tenant authorization.",
    tags: ["OAuth2", "Spring Boot", "Security", "SSO"],
    theme: "rose",
  },
];
