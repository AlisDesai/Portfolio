"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

import { EASE_PREMIUM } from "@/components/animations/easing";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onMouseEnter?: () => void;
}

/** Nav link with a sliding shared-element pill behind whichever item is
 * active/hovered (same layoutId technique already used for the Contact
 * page's budget/timeline selector) — replaces the old static underline with
 * something that feels like one continuous, intentional piece of motion. */
export function NavLink({ href, children, className, isActive, onMouseEnter }: NavLinkProps) {
  return (
    <a
      href={href}
      onMouseEnter={onMouseEnter}
      className={cn(
        "relative rounded-full px-1.5 py-1.5 font-medium tracking-wide transition-colors duration-300 ease-out min-[480px]:px-3 sm:px-3.5 sm:py-2",
        isActive ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-900",
        className
      )}
    >
      {isActive && (
        <motion.span
          layoutId="navbar-active-pill"
          transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          className="absolute inset-0 -z-10 rounded-full bg-zinc-100"
        />
      )}
      <motion.span whileTap={{ scale: 0.94 }} className="relative inline-block">
        {children}
      </motion.span>
    </a>
  );
}
