"use client";

import { motion } from "framer-motion";
import { FOOTER_COLUMNS } from "@/components/features/contact/contact-data";
import { FooterItemIconMark } from "@/components/features/contact/icons";

import { EASE_PREMIUM } from "@/components/animations/easing";

interface ContactInfoGridProps {
  isInView: boolean;
  reduceMotion: boolean;
  startDelay: number;
  stagger: number;
}

export function ContactInfoGrid({
  isInView,
  reduceMotion,
  startDelay,
  stagger,
}: ContactInfoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
      {FOOTER_COLUMNS.map((column, index) => (
        <motion.div
          key={column.title}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: startDelay + index * stagger, ease: EASE_PREMIUM }}
          className="min-w-0"
        >
          <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            {column.title}
          </h3>
          <ul className="mt-5 flex flex-col gap-3.5">
            {column.items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-jakarta hover:text-accent flex min-w-0 items-center gap-2.5 text-base text-black transition-colors duration-300 ease-out sm:text-lg"
                >
                  {item.icon && (
                    <span className="bg-accent/10 text-accent flex size-7 shrink-0 items-center justify-center rounded-full">
                      <FooterItemIconMark icon={item.icon} className="size-3.5" />
                    </span>
                  )}
                  <span className="min-w-0 wrap-break-word">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
