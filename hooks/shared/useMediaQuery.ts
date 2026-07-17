import { useSyncExternalStore } from "react";

function subscribe(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

/** True once `query` matches the viewport. Defaults to `true` on the server
 * so any un-hydrated/SSR output matches the existing desktop-first design. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => true
  );
}
