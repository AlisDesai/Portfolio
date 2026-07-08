"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/config/metadata";
import { SOCIAL_LINKS } from "@/components/features/contact/contact-data";
import { SocialIcon, ArrowUpRightIcon } from "@/components/features/contact/icons";

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#F9FAFB] text-black pt-28 sm:pt-40">

        {/* Ambient Top Glow & Grid Pattern */}
        <div className="absolute inset-0 -z-20 h-full w-full">
          <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-accent/15 via-accent/5 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        {/* Highly Saturated Animated Orbs for Premium Depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="pointer-events-none absolute -top-20 right-[-5%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.4),transparent_60%)] blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="pointer-events-none absolute top-1/4 left-[-10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,121,249,0.25),transparent_60%)] blur-[100px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER}
            className="w-full relative z-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/80 bg-white/50 p-8 sm:p-14 md:p-20 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(129,140,248,0.15)]"
          >
            <motion.div variants={FADE_UP} className="flex items-center gap-4 mb-12">
              <div className="flex size-12 items-center justify-center rounded-full bg-accent/10">
                <div className="size-3 rounded-full bg-accent animate-pulse" />
              </div>
              <h1 className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-accent">
                Let&rsquo;s Collaborate
              </h1>
            </motion.div>

            {/* Conversational Form - Pill Design for Maximum Aesthetics */}
            <motion.form variants={FADE_UP} className="font-display text-[1.5rem] leading-[2.4] sm:text-[2rem] sm:leading-[2.5] md:text-[2.75rem] md:leading-[2.4] font-bold text-zinc-400 w-full">
              Hi Harsh, my name is{" "}
              <span className="inline-block mx-2 align-middle">
                <input
                  type="text"
                  placeholder="your name"
                  className="bg-zinc-100 hover:bg-zinc-200/80 focus:bg-white focus:ring-4 focus:ring-accent/20 border-2 border-transparent focus:border-accent/40 rounded-full text-zinc-900 placeholder-zinc-400 outline-none w-[180px] sm:w-[240px] md:w-[320px] transition-all px-6 py-2 sm:py-3 text-center shadow-inner text-xl md:text-3xl font-bold"
                />
              </span>
              {" "}and I am looking for a talented developer to help me with{" "}
              <span className="inline-block mx-2 align-middle">
                <input
                  type="text"
                  placeholder="your project idea"
                  className="bg-zinc-100 hover:bg-zinc-200/80 focus:bg-white focus:ring-4 focus:ring-accent/20 border-2 border-transparent focus:border-accent/40 rounded-full text-zinc-900 placeholder-zinc-400 outline-none w-[240px] sm:w-[320px] md:w-[450px] transition-all px-6 py-2 sm:py-3 text-center shadow-inner text-xl md:text-3xl font-bold"
                />
              </span>
              . You can reach me back at{" "}
              <span className="inline-block mx-2 align-middle">
                <input
                  type="email"
                  placeholder="your email address"
                  className="bg-zinc-100 hover:bg-zinc-200/80 focus:bg-white focus:ring-4 focus:ring-accent/20 border-2 border-transparent focus:border-accent/40 rounded-full text-zinc-900 placeholder-zinc-400 outline-none w-[260px] sm:w-[360px] md:w-[480px] transition-all px-6 py-2 sm:py-3 text-center shadow-inner text-xl md:text-3xl font-bold"
                />
              </span>
              {" "}to discuss it further.

              <div className="mt-16 sm:mt-20 flex items-center">
                <button
                  type="button"
                  className="group flex items-center gap-6 rounded-full bg-zinc-900 px-8 py-5 sm:px-10 sm:py-6 text-xl sm:text-2xl font-bold text-white transition-all duration-500 hover:bg-accent hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(129,140,248,0.5)]"
                >
                  Send Message
                  <span className="flex size-12 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:bg-white/20">
                    <ArrowUpRightIcon className="size-6 text-white" />
                  </span>
                </button>
              </div>
            </motion.form>
          </motion.div>

        </div>

        {/* Footer section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative z-10 flex flex-col items-center mt-24 sm:mt-32 w-full pt-10"
        >
          {/* Footer Info Grid */}
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 sm:mb-24">
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Direct Contact</h3>
              <a href="mailto:hello@harshpatel.com" className="text-lg sm:text-xl font-medium text-zinc-900 hover:text-accent transition-colors">
                hello@harshpatel.com
              </a>
              <a href="tel:+1234567890" className="text-lg sm:text-xl font-medium text-zinc-900 hover:text-accent transition-colors">
                +1 (234) 567-890
              </a>
            </div>

            <div className="flex flex-col gap-3 md:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Socials</h3>
              <div className="flex gap-4 mt-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex size-14 items-center justify-center rounded-full bg-white border border-black/5 text-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg"
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
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Location</h3>
              <p className="text-lg sm:text-xl font-medium text-zinc-900 leading-relaxed">
                Based in New York<br />Available Worldwide
              </p>
            </div>
          </div>

          {/* Giant Gradient Footer Text */}
          <div className="w-full flex flex-col items-center justify-end pointer-events-none select-none pb-4">
            <h2 className="font-display text-[18vw] leading-[0.85] font-black text-transparent bg-clip-text bg-gradient-to-b from-accent/20 to-transparent whitespace-nowrap px-8">
              HARSH
            </h2>
          </div>
        </motion.div>
      </main>
    </>
  );
}
