import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type BadgeVariant = "dark" | "light";

// The exact two badge treatments already duplicated identically across
// WorkStack + GlobalPresence ("dark") and Services + Benefits ("light")
// before this extraction — values unchanged, just centralized.
const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  dark: "border-accent/30 text-accent rounded-full border bg-white/5 px-5 py-2 text-sm font-medium tracking-[0.2em] uppercase",
  light:
    "border-accent/20 bg-accent/5 text-accent rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase shadow-sm",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
}

/** Shared pill/kicker badge primitive. Forwards its ref so it can be wrapped
 * with `motion.create(Badge)` for the usages that animate independently,
 * without changing any rendered markup or timing. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant, className, ...props },
  ref
) {
  return <span ref={ref} className={cn(VARIANT_CLASSES[variant], className)} {...props} />;
});
