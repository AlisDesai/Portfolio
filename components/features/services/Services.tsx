"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ServiceAccordionItem } from "@/components/features/services/ServiceAccordionItem";
import { SERVICES } from "@/lib/constants/services-gallery";
import { Badge } from "@/components/ui/Badge";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

import { EASE_PREMIUM } from "@/components/animations/easing";

const LABEL_DELAY = 0;
const HEADING_DELAY = 0.15;
const LIST_START_DELAY = 0.1;
const LIST_STAGGER = 0.1;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const listIsInView = useInView(listRef, { once: true, amount: 0.1 });
  const reduceMotion = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-zinc-50 px-6 py-28 sm:px-10 md:py-32 lg:px-16"
    >
      {/* Premium subtle grid pattern and ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="bg-accent pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full opacity-[0.03] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          {/* Left Column - Sticky Heading */}
          <div className="lg:sticky lg:top-32 lg:w-[40%] lg:py-12 xl:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: LABEL_DELAY, ease: EASE_PREMIUM }}
              className="flex flex-col items-start gap-7"
            >
              <Badge variant="light">Expertise</Badge>
              <h2 className="font-display text-4xl leading-[1.1] font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-7xl">
                Services <br className="hidden lg:block" /> We Provide
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: HEADING_DELAY, ease: EASE_PREMIUM }}
                className="mt-3 max-w-sm text-lg leading-relaxed text-zinc-500"
              >
                Comprehensive technical solutions tailored to elevate your business, enhance
                security, and streamline your operations.
              </motion.p>
            </motion.div>
          </div>

          {/* Right Column - Accordion List */}
          <div ref={listRef} className="flex flex-col gap-6 lg:w-[60%] xl:w-2/3">
            {SERVICES.map((service, index) => (
              <ServiceAccordionItem
                key={service.id}
                service={service}
                isOpen={service.id === openId}
                onToggle={() => setOpenId((prev) => (prev === service.id ? null : service.id))}
                isInView={listIsInView}
                reduceMotion={reduceMotion}
                delay={LIST_START_DELAY + index * LIST_STAGGER}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
