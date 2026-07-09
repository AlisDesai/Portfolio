export const ROUTES = {
  HOME: "/",
  WORK: "/work",
  SERVICES: "/services",
  CONTACT: "/contact",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
