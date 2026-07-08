export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  CONTACT: "/contact",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
