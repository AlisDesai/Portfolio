"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SOCIAL_LINKS } from "@/components/features/contact/contact-data";
import { SocialIcon } from "@/components/features/contact/icons";
import { WORK_PROJECTS, type WorkProject } from "@/components/features/work/work-data";

const THEME_GRADIENTS: Record<WorkProject["theme"], string> = {
  blue: "from-blue-200 to-blue-50",
  emerald: "from-emerald-200 to-emerald-50",
  violet: "from-violet-200 to-violet-50",
  amber: "from-amber-200 to-amber-50",
  rose: "from-rose-200 to-rose-50",
};

const THEME_ACCENTS: Record<WorkProject["theme"], string> = {
  blue: "text-blue-600",
  emerald: "text-emerald-600",
  violet: "text-violet-600",
  amber: "text-amber-600",
  rose: "text-rose-600",
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

        {/* Hero Section */}
        <section className="relative mx-auto w-full max-w-[1400px] px-6 pt-24 pb-20 sm:px-10 sm:pt-32 sm:pb-32 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-[4rem] leading-[1.05] font-black tracking-tighter text-zinc-900 sm:text-[6rem] md:text-[8rem]">
              Selected <br />
              <span className="text-zinc-300">Works.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed font-medium text-zinc-500 sm:text-2xl">
              A curated showcase of digital experiences, where premium design meets relentless
              engineering.
            </p>
          </motion.div>
        </section>

        {/* Projects Gallery */}
        <section className="px-6 pb-32 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-32 sm:gap-48">
            {WORK_PROJECTS.map((project, index) => (
              <ProjectItem key={project.id} project={project} index={index} />
            ))}
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

function ProjectItem({ project, index }: { project: WorkProject; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="group relative flex flex-col items-center gap-12 lg:flex-row lg:gap-20"
    >
      {/* Text Info - alternates sides based on index */}
      <div className={`flex w-full flex-col gap-8 lg:w-1/2 ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="h-px w-12 bg-zinc-300" />
          <span
            className={`text-sm font-bold tracking-[0.2em] uppercase ${THEME_ACCENTS[project.theme]}`}
          >
            {project.category}
          </span>
        </div>

        <h2 className="font-display text-4xl font-extrabold tracking-tight text-zinc-900 transition-colors duration-500 group-hover:text-zinc-600 sm:text-5xl md:text-6xl">
          {project.title}
        </h2>

        <p className="text-xl leading-relaxed text-zinc-500">{project.description}</p>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-bold text-zinc-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-colors group-hover:border-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Visual / Image Placeholder with Parallax */}
      <motion.div
        style={{ y, scale }}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br lg:w-1/2 ${THEME_GRADIENTS[project.theme]} shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] transition-transform duration-700`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_0%,transparent_100%)] mix-blend-overlay" />

        {/* Subtle hover effect orb */}
        <div className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-[60px] transition-transform duration-700 group-hover:scale-150 group-hover:bg-white/60" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full border border-white/60 bg-white/40 px-8 py-4 text-sm font-bold tracking-widest text-zinc-900 uppercase shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            View Project
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
