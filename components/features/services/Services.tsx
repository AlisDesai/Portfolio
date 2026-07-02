"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ServiceAccordionItem } from "@/components/features/services/ServiceAccordionItem";
import { SERVICES } from "@/components/features/services/services-gallery-data";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// Sequenced delays (seconds): label -> heading -> accordion rows.
const LABEL_DELAY = 0;
const HEADING_DELAY = 0.15;
const LIST_START_DELAY = 0.35;
const LIST_STAGGER = 0.1;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reduceMotion = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white px-6 py-24 sm:px-10 md:py-32 lg:px-16"
    >
      <div className="bg-accent pointer-events-none absolute -top-24 -left-24 size-[28rem] rounded-full opacity-[0.06] blur-3xl" />
      <div className="bg-accent pointer-events-none absolute -right-24 -bottom-24 size-[28rem] rounded-full opacity-[0.06] blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center gap-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: LABEL_DELAY, ease: EASE_PREMIUM }}
          className="text-accent text-sm font-medium tracking-[0.2em] uppercase"
        >
          What We Do
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: HEADING_DELAY, ease: EASE_PREMIUM }}
          className="font-display text-accent text-4xl font-extrabold sm:text-6xl md:text-7xl"
        >
          Services We Provide
        </motion.h2>
      </div>

      <div className="relative z-10 mx-auto mt-16 flex w-full max-w-[1600px] flex-col gap-5 md:mt-20">
        {SERVICES.map((service, index) => (
          <ServiceAccordionItem
            key={service.id}
            service={service}
            isOpen={service.id === openId}
            onToggle={() => setOpenId((prev) => (prev === service.id ? null : service.id))}
            isInView={isInView}
            reduceMotion={reduceMotion}
            delay={LIST_START_DELAY + index * LIST_STAGGER}
          />
        ))}
      </div>
    </section>
  );
}
