export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
