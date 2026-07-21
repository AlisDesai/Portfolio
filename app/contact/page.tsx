"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import {
  BUDGET_RANGES,
  PROJECT_TIMELINES,
  SOCIAL_LINKS,
} from "@/components/features/contact/contact-data";
import { SocialIcon, CheckIcon } from "@/components/features/contact/icons";
import { AttachmentDropzone } from "@/components/features/contact/AttachmentDropzone";
import { InterestChips } from "@/components/features/contact/InterestChips";
import { SegmentedSelector } from "@/components/features/contact/SegmentedSelector";
import { SendButton } from "@/components/features/contact/SendButton";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";
import { CONTACT_FORM_FOCUS_EVENT } from "@/lib/constants/assistant";
import { cn } from "@/lib/utils/cn";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_PREMIUM } },
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

type ContactField = "name" | "idea" | "email";

/** Purely decorative step rule — reinforces the intended reading order
 * (Interests → Budget/Timeline → Message → Attachment) without repeating
 * any of the labels those sections already render themselves. */
function StepMarker({ index }: { index: string }) {
  return (
    <div aria-hidden="true" className="mb-4 flex items-center gap-3">
      <span className="text-accent/70 font-mono text-[11px] font-extrabold tracking-[0.3em]">
        {index}
      </span>
      <span className="from-accent/30 h-px flex-1 bg-linear-to-r to-transparent" />
    </div>
  );
}

export default function ContactPage() {
  const reduceMotion = usePrefersReducedMotion();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<ContactField | null>(null);
  const [email, setEmail] = useState("");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const toggleInterest = (label: string) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleFieldFocus = (field: ContactField) => {
    setFocusedField(field);
    window.dispatchEvent(new CustomEvent(CONTACT_FORM_FOCUS_EVENT, { detail: { active: true } }));
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
    window.dispatchEvent(new CustomEvent(CONTACT_FORM_FOCUS_EVENT, { detail: { active: false } }));
  };

  const handleCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    target.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  };

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
          <div className="relative">
            {/* Rotating ambient accent glow — same radial-gradient colors as
                the two ambient orbs above, just conic + slowly rotating, so
                a soft light appears to drift around the card's edge. */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-[conic-gradient(from_0deg,rgba(129,140,248,0.35),transparent_35%,transparent_65%,rgba(232,121,249,0.3),transparent_100%)] opacity-70 blur-3xl sm:rounded-[3.5rem]",
                !reduceMotion && "animate-[spin_10s_linear_infinite]"
              )}
            />

            <motion.div
              initial="hidden"
              animate="visible"
              variants={STAGGER}
              onMouseMove={handleCardMouseMove}
              className="group relative z-10 w-full overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/50 p-8 shadow-[0_20px_80px_-20px_rgba(129,140,248,0.15)] backdrop-blur-2xl sm:rounded-[3.5rem] sm:p-14 md:p-20"
            >
              {/* Cursor-follow spotlight — brightens the glass surface right
                  under the pointer, the same soft accent tone as everything
                  else here. */}
              {!reduceMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(129,140,248,0.16), transparent 70%)",
                  }}
                />
              )}

              <motion.div variants={FADE_UP} className="mb-12 flex items-center gap-4">
                <div className="bg-accent/10 flex size-12 items-center justify-center rounded-full">
                  <div className="bg-accent size-3 animate-pulse rounded-full" />
                </div>
                <h1 className="font-display text-accent text-sm font-bold tracking-[0.25em] uppercase sm:text-base">
                  Let&rsquo;s Collaborate
                </h1>
              </motion.div>

              {/* Interactive interest picker — sits above the form, feeding
                  selectedInterests (not yet wired to submission; purely a
                  premium interaction layer for now). */}
              <motion.div variants={FADE_UP} className="mb-10 sm:mb-12">
                <StepMarker index="01" />
                <InterestChips
                  selected={selectedInterests}
                  onToggle={toggleInterest}
                  reduceMotion={reduceMotion}
                />
              </motion.div>

              {/* Budget + timeline — same "premium selector" language, own
                  data (not yet wired to submission). */}
              <motion.div variants={FADE_UP} className="mb-10 sm:mb-12">
                <StepMarker index="02" />
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <SegmentedSelector
                    label="Project budget (USD)"
                    name="budget"
                    options={BUDGET_RANGES}
                    value={budget}
                    onChange={setBudget}
                    reduceMotion={reduceMotion}
                  />
                  <SegmentedSelector
                    label="Timeline"
                    name="timeline"
                    options={PROJECT_TIMELINES}
                    value={timeline}
                    onChange={setTimeline}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </motion.div>

              {/* Conversational Form - Pill Design for Maximum Aesthetics */}
              <motion.form
                variants={FADE_UP}
                className="font-display w-full text-[1.5rem] leading-[2.4] font-bold text-zinc-400 sm:text-[2rem] sm:leading-[2.5] md:text-[2.75rem] md:leading-[2.4]"
              >
                <StepMarker index="03" />
                Hi BrightWave, my name is{" "}
                <span className="relative mx-2 inline-block align-middle">
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      opacity: focusedField === "name" ? 1 : 0,
                      y: focusedField === "name" ? 0 : 6,
                    }}
                    transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                    className="text-accent absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.2em] uppercase"
                  >
                    Name
                  </motion.span>
                  <motion.input
                    type="text"
                    placeholder="your name"
                    onFocus={() => handleFieldFocus("name")}
                    onBlur={handleFieldBlur}
                    whileFocus={reduceMotion ? undefined : { scale: 1.03 }}
                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    className="focus:ring-accent/20 focus:border-accent/40 w-[180px] rounded-full border-2 border-transparent bg-zinc-100 px-6 py-2 text-center text-xl font-bold text-zinc-900 placeholder-zinc-400 shadow-inner transition-all outline-none hover:bg-zinc-200/80 focus:bg-white focus:ring-4 sm:w-[240px] sm:py-3 md:w-[320px] md:text-3xl"
                  />
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      scaleX: focusedField === "name" ? 1 : 0,
                      opacity: focusedField === "name" ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                    className="bg-accent absolute inset-x-8 -bottom-1 h-0.5 origin-center rounded-full"
                  />
                </span>{" "}
                and I am looking for a talented developer to help me with{" "}
                <span className="relative mx-2 inline-block align-middle">
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      opacity: focusedField === "idea" ? 1 : 0,
                      y: focusedField === "idea" ? 0 : 6,
                    }}
                    transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                    className="text-accent absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.2em] uppercase"
                  >
                    Project
                  </motion.span>
                  <motion.input
                    type="text"
                    placeholder="your project idea"
                    onFocus={() => handleFieldFocus("idea")}
                    onBlur={handleFieldBlur}
                    whileFocus={reduceMotion ? undefined : { scale: 1.03 }}
                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    className="focus:ring-accent/20 focus:border-accent/40 w-[240px] rounded-full border-2 border-transparent bg-zinc-100 px-6 py-2 text-center text-xl font-bold text-zinc-900 placeholder-zinc-400 shadow-inner transition-all outline-none hover:bg-zinc-200/80 focus:bg-white focus:ring-4 sm:w-[320px] sm:py-3 md:w-[450px] md:text-3xl"
                  />
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      scaleX: focusedField === "idea" ? 1 : 0,
                      opacity: focusedField === "idea" ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                    className="bg-accent absolute inset-x-8 -bottom-1 h-0.5 origin-center rounded-full"
                  />
                </span>
                . You can reach me back at{" "}
                <span className="relative mx-2 inline-block align-middle">
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      opacity: focusedField === "email" ? 1 : 0,
                      y: focusedField === "email" ? 0 : 6,
                    }}
                    transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                    className="text-accent absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.2em] uppercase"
                  >
                    Email
                  </motion.span>
                  <motion.input
                    type="email"
                    placeholder="your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onFocus={() => handleFieldFocus("email")}
                    onBlur={handleFieldBlur}
                    whileFocus={reduceMotion ? undefined : { scale: 1.03 }}
                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    className="focus:ring-accent/20 focus:border-accent/40 w-[260px] rounded-full border-2 border-transparent bg-zinc-100 py-2 pr-14 pl-6 text-center text-xl font-bold text-zinc-900 placeholder-zinc-400 shadow-inner transition-all outline-none hover:bg-zinc-200/80 focus:bg-white focus:ring-4 sm:w-[360px] sm:py-3 sm:pr-16 md:w-[480px] md:text-3xl"
                  />
                  <motion.span
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: isEmailValid ? 1 : 0,
                      scale: isEmailValid ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    className="bg-accent pointer-events-none absolute top-1/2 right-4 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-white sm:right-5"
                  >
                    <CheckIcon className="size-3.5" />
                  </motion.span>
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      scaleX: focusedField === "email" ? 1 : 0,
                      opacity: focusedField === "email" ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                    className="bg-accent absolute inset-x-8 -bottom-1 h-0.5 origin-center rounded-full"
                  />
                </span>{" "}
                to discuss it further.
                <div className="mt-16 flex flex-col gap-10 sm:mt-20">
                  <div>
                    <StepMarker index="04" />
                    <AttachmentDropzone reduceMotion={reduceMotion} />
                  </div>
                  <div className="flex items-center">
                    <SendButton reduceMotion={reduceMotion} />
                  </div>
                </div>
              </motion.form>
            </motion.div>
          </div>
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
                href="mailto:hello@brightwavesol.com"
                className="hover:text-accent text-lg font-medium text-zinc-900 transition-colors sm:text-xl"
              >
                hello@brightwavesol.com
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
                    style={{ "--social-brand-color": social.brandColor } as React.CSSProperties}
                    className={cn(
                      "group flex size-14 items-center justify-center rounded-full border border-black/5 bg-white text-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:text-white hover:shadow-lg",
                      social.name === "Instagram"
                        ? "hover:bg-linear-to-tr hover:from-[#FFDC80] hover:via-[#E1306C] hover:to-[#833AB4]"
                        : "hover:bg-(--social-brand-color)"
                    )}
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
            <h2 className="font-display from-accent/20 bg-gradient-to-b to-transparent bg-clip-text px-8 text-[12vw] leading-[0.85] font-black whitespace-nowrap text-transparent">
              BRIGHTWAVE
            </h2>
          </div>
        </motion.div>
      </main>
    </>
  );
}
