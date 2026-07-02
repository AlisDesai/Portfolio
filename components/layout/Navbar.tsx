"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NavLink } from "@/components/ui/NavLink";
import { NAV_ITEMS } from "@/config/navigation";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/metadata";
import { useScrolled } from "@/hooks/shared/useScrolled";

export function Navbar() {
  const scrolled = useScrolled();

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
    >
      <motion.div
        animate={{
          paddingLeft: scrolled ? "20px" : "28px",
          paddingRight: scrolled ? "20px" : "28px",
          paddingTop: scrolled ? "8px" : "12px",
          paddingBottom: scrolled ? "8px" : "12px",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-full max-w-3xl items-center justify-between gap-6 rounded-full border border-black/5 bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
      >
        <Link
          href={ROUTES.HOME}
          className="font-display text-sm font-bold tracking-tight text-zinc-900 transition-transform duration-300 ease-out hover:scale-[1.02] sm:text-base"
        >
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-4 sm:gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href} className="text-xs sm:text-sm">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
