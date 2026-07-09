"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
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
      <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#F9FAFB] pt-28 text-black sm:pt-40">
        {/* Ambient Top Glow & Grid Pattern */}
        <div className="absolute inset-0 -z-20 h-full w-full">
          <div className="from-accent/15 via-accent/5 absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b to-transparent mix-blend-multiply" />
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

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER}
            className="relative z-10 w-full rounded-[2.5rem] border border-white/80 bg-white/50 p-8 shadow-[0_20px_80px_-20px_rgba(129,140,248,0.15)] backdrop-blur-2xl sm:rounded-[3.5rem] sm:p-14 md:p-20"
          >
            <motion.div variants={FADE_UP} className="mb-12 flex items-center gap-4">
              <div className="bg-accent/10 flex size-12 items-center justify-center rounded-full">
                <div className="bg-accent size-3 animate-pulse rounded-full" />
              </div>
              <h1 className="font-display text-accent text-sm font-bold tracking-[0.25em] uppercase sm:text-base">
                Let&rsquo;s Collaborate
              </h1>
            </motion.div>

            {/* Conversational Form - Pill Design for Maximum Aesthetics */}
            <motion.form
              variants={FADE_UP}
              className="font-display w-full text-[1.5rem] leading-[2.4] font-bold text-zinc-400 sm:text-[2rem] sm:leading-[2.5] md:text-[2.75rem] md:leading-[2.4]"
            >
              Hi Harsh, my name is{" "}
              <span className="mx-2 inline-block align-middle">
                <input
                  type="text"
                  placeholder="your name"
                  className="focus:ring-accent/20 focus:border-accent/40 w-[180px] rounded-full border-2 border-transparent bg-zinc-100 px-6 py-2 text-center text-xl font-bold text-zinc-900 placeholder-zinc-400 shadow-inner transition-all outline-none hover:bg-zinc-200/80 focus:bg-white focus:ring-4 sm:w-[240px] sm:py-3 md:w-[320px] md:text-3xl"
                />
              </span>{" "}
              and I am looking for a talented developer to help me with{" "}
              <span className="mx-2 inline-block align-middle">
                <input
                  type="text"
                  placeholder="your project idea"
                  className="focus:ring-accent/20 focus:border-accent/40 w-[240px] rounded-full border-2 border-transparent bg-zinc-100 px-6 py-2 text-center text-xl font-bold text-zinc-900 placeholder-zinc-400 shadow-inner transition-all outline-none hover:bg-zinc-200/80 focus:bg-white focus:ring-4 sm:w-[320px] sm:py-3 md:w-[450px] md:text-3xl"
                />
              </span>
              . You can reach me back at{" "}
              <span className="mx-2 inline-block align-middle">
                <input
                  type="email"
                  placeholder="your email address"
                  className="focus:ring-accent/20 focus:border-accent/40 w-[260px] rounded-full border-2 border-transparent bg-zinc-100 px-6 py-2 text-center text-xl font-bold text-zinc-900 placeholder-zinc-400 shadow-inner transition-all outline-none hover:bg-zinc-200/80 focus:bg-white focus:ring-4 sm:w-[360px] sm:py-3 md:w-[480px] md:text-3xl"
                />
              </span>{" "}
              to discuss it further.
              <div className="mt-16 flex items-center sm:mt-20">
                <button
                  type="button"
                  className="group hover:bg-accent flex items-center gap-6 rounded-full bg-zinc-900 px-8 py-5 text-xl font-bold text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(129,140,248,0.5)] sm:px-10 sm:py-6 sm:text-2xl"
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
          className="relative z-10 mt-24 flex w-full flex-col items-center pt-10 sm:mt-32"
        >
          {/* Footer Info Grid */}
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

          {/* Giant Gradient Footer Text */}
          <div className="pointer-events-none flex w-full flex-col items-center justify-end pb-4 select-none">
            <h2 className="font-display from-accent/20 bg-gradient-to-b to-transparent bg-clip-text px-8 text-[18vw] leading-[0.85] font-black whitespace-nowrap text-transparent">
              HARSH
            </h2>
          </div>
        </motion.div>
      </main>
    </>
  );
}
