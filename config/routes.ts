export const ROUTES = {
  HOME: "/",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
