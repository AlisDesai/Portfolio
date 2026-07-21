"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NavLink } from "@/components/ui/NavLink";
import { NAV_ITEMS } from "@/config/navigation";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/metadata";
import { useScrolled } from "@/hooks/shared/useScrolled";
import { useMediaQuery } from "@/hooks/shared/useMediaQuery";
import { cn } from "@/lib/utils/cn";

import { EASE_PREMIUM } from "@/components/animations/easing";

export function Navbar() {
  const scrolled = useScrolled();
  // Below 480px the logo + full nav no longer fit the pill's original
  // horizontal padding — compact it there only; 480px and up render exactly
  // as before.
  const isCompact = !useMediaQuery("(min-width: 480px)");
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const activeHref = hoveredHref ?? pathname;

  return (
    <motion.header
      initial={{ y: -16, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: EASE_PREMIUM }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
    >
      <motion.div
        animate={{
          paddingLeft: isCompact ? (scrolled ? "6px" : "8px") : scrolled ? "20px" : "28px",
          paddingRight: isCompact ? (scrolled ? "6px" : "8px") : scrolled ? "20px" : "28px",
          paddingTop: scrolled ? "8px" : "12px",
          paddingBottom: scrolled ? "8px" : "12px",
        }}
        transition={{ duration: 0.4, ease: EASE_PREMIUM }}
        className={cn(
          "flex w-full max-w-3xl items-center justify-between gap-1 rounded-full border bg-white/90 backdrop-blur-xl transition-shadow duration-500 ease-out min-[480px]:gap-4 sm:gap-6",
          scrolled
            ? "border-black/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.03),0_10px_30px_-10px_rgba(129,140,248,0.3),0_2px_10px_rgba(0,0,0,0.06)]"
            : "border-black/4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.02),0_6px_20px_-8px_rgba(129,140,248,0.18),0_1px_4px_rgba(0,0,0,0.04)]"
        )}
      >
        <Link
          href={ROUTES.HOME}
          className="group font-display flex items-center gap-1 text-sm font-bold tracking-tight text-zinc-900 transition-transform duration-300 ease-out hover:scale-[1.02] min-[480px]:gap-2 sm:text-base"
        >
          <div className="text-accent flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-full w-full"
            >
              <motion.path
                d="M 3 12 Q 7.5 4, 12 12 T 21 12"
                animate={{
                  d: [
                    "M 3 12 Q 7.5 4, 12 12 T 21 12",
                    "M 3 12 Q 7.5 20, 12 12 T 21 12",
                    "M 3 12 Q 7.5 4, 12 12 T 21 12",
                  ],
                }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              />
            </svg>
          </div>
          {siteConfig.name}
        </Link>

        <nav
          className="relative flex items-center gap-0.5 min-[480px]:gap-1 sm:gap-2"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-xs sm:text-sm"
              isActive={activeHref === item.href}
              onMouseEnter={() => setHoveredHref(item.href)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
