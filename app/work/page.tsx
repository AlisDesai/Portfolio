"use client";

import { motion } from "framer-motion";
import { WorkStack } from "@/components/features/work/WorkStack";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-32">
      {/* Premium Header Section */}
      <section className="relative mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center sm:px-10 lg:px-16 pt-20 pb-10 md:pt-32 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium tracking-widest text-white/70 uppercase backdrop-blur-md"
        >
          Our Portfolio
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Work That <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
            Speaks Volumes
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-lg text-zinc-400 sm:text-xl"
        >
          Explore a curated selection of our digital products, from complex backend architectures to seamless, award-winning user interfaces.
        </motion.p>
      </section>

      {/* Reusing the WorkStack but removing its padding so it fits well with the page header */}
      <div className="-mt-16 md:-mt-24">
        <WorkStack hideHeader={true} />
      </div>

      {/* Giant CTA Footer for the Work Page */}
      <section className="relative overflow-hidden bg-zinc-950 py-32 px-6 sm:px-10 lg:px-16 text-center border-t border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-3xl flex flex-col items-center"
        >
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl md:text-7xl mb-10">
            Have a project in mind?
          </h2>
          <a
            href="/contact"
            className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-white px-10 text-lg font-bold tracking-wider text-black transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-3">
              LET'S TALK
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </motion.div>
      </section>
    </main>
  );
}
