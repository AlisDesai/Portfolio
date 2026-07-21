/** The site's signature premium easing curve — reused across nearly every
 * Framer Motion transition in the codebase. Previously duplicated as an
 * identical local constant in 28 separate files; centralized here so the
 * whole site's motion feel can be tuned from one place. */
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
