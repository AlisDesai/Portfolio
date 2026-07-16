"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { SOCIAL_LINKS } from "@/components/features/contact/contact-data";
import { ArrowUpRightIcon, SocialIcon } from "@/components/features/contact/icons";
import { WORK_PROJECTS } from "@/components/features/work/work-data";
import { WorkIndex } from "@/components/features/work/WorkIndex";
import { ROUTES } from "@/config/routes";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const titleLine = {
  hidden: { opacity: 1, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: EASE_PREMIUM },
  },
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#F9FAFB] pt-20 text-zinc-900 selection:bg-zinc-200">
        {/* Ambient Top Glow & Grid Pattern to match Contact Page */}
        <div className="absolute inset-0 -z-20 h-full w-full">
          <div className="from-accent/5 via-accent/2 absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        {/* Hero Section — kinetic mask-wipe title reveal, distinct from the
            other pages' fade-up entrances */}
        <section className="relative mx-auto w-full max-w-[1400px] px-6 pt-24 pb-20 sm:px-10 sm:pt-32 sm:pb-32 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="bg-accent h-px w-6" />
            <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
              {String(WORK_PROJECTS.length).padStart(2, "0")} Selected Case Studies
            </span>
          </motion.div>

          <h1 className="font-display mt-6 text-[4rem] leading-[1.05] font-black tracking-tighter text-zinc-900 sm:text-[6rem] md:text-[8rem]">
            <motion.span initial="hidden" animate="visible" variants={titleLine} className="block">
              Selected
            </motion.span>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={titleLine}
              transition={{ delay: 0.12 }}
              className="block text-zinc-300"
            >
              Works.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE_PREMIUM }}
            className="mt-8 max-w-2xl text-xl leading-relaxed font-medium text-zinc-500 sm:text-2xl"
          >
            A curated showcase of digital experiences, where premium design meets relentless
            engineering.
          </motion.p>
        </section>

        {/* Project Index — editorial list with a cursor-following preview,
            replacing the old stacked image cards */}
        <section className="px-6 pb-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <WorkIndex />
          </div>
        </section>

        {/* Closing CTA — a short conversion prompt before the footer */}
        <section className="px-6 pb-6 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display max-w-xl text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Have a project in mind?
            </h2>
            <Link
              href={ROUTES.CONTACT}
              className="group hover:bg-accent flex shrink-0 items-center gap-4 rounded-full bg-zinc-900 px-7 py-4 text-base font-bold text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(129,140,248,0.5)]"
            >
              Start a Conversation
              <span className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRightIcon className="size-4 text-white" />
              </span>
            </Link>
          </div>
        </section>

        {/* Footer section (Replicated from Contact Page) */}
        <div className="relative z-10 mt-10 flex w-full flex-col items-center border-t border-zinc-200 pt-10 sm:mt-20">
          <div className="mx-auto mb-16 grid w-full max-w-6xl grid-cols-1 gap-12 px-6 sm:mb-24 md:grid-cols-3 lg:px-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                Direct Contact
              </h3>
              <a
                href="mailto:hello@harshpatel.com"
                className="hover:text-accent text-lg font-medium text-zinc-900 transition-colors sm:text-xl"
              >
                hello@harshpatel.com
              </a>
              <a
                href="tel:+1234567890"
                className="hover:text-accent text-lg font-medium text-zinc-900 transition-colors sm:text-xl"
              >
                +1 (234) 567-890
              </a>
            </div>

            <div className="flex flex-col gap-3 md:col-span-1">
              <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                Socials
              </h3>
              <div className="mt-2 flex gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:border-accent hover:bg-accent flex size-14 items-center justify-center rounded-full border border-black/5 bg-white text-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:text-white hover:shadow-lg"
                  >
                    <SocialIcon
                      platform={social.name}
                      className="size-5 transition-transform duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 md:items-end md:text-right">
              <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                Location
              </h3>
              <p className="text-lg leading-relaxed font-medium text-zinc-900 sm:text-xl">
                Based in Ahmedabad/Vadodara
                <br />
                Available Worldwide
              </p>
            </div>
          </div>

          <div className="pointer-events-none flex w-full flex-col items-center justify-end pb-4 select-none">
            <h2 className="font-display from-accent/20 bg-gradient-to-b to-transparent bg-clip-text px-8 text-[18vw] leading-[0.85] font-black whitespace-nowrap text-transparent">
              HARSH
            </h2>
          </div>
        </div>
      </main>
    </>
  );
}
