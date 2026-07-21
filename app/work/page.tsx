import Link from "next/link";
import { SOCIAL_LINKS } from "@/components/features/contact/contact-data";
import { ArrowUpRightIcon, SocialIcon } from "@/components/features/contact/icons";
import { WorkHero } from "@/components/features/work/WorkHero";
import { WorkIndex } from "@/components/features/work/WorkIndex";
import { ROUTES } from "@/config/routes";

export default function WorkPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#F9FAFB] pt-20 text-zinc-900 selection:bg-zinc-200">
      {/* Ambient Top Glow & Grid Pattern to match Contact Page */}
      <div className="absolute inset-0 -z-20 h-full w-full">
        <div className="from-accent/5 via-accent/2 absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <WorkHero />

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
              href="mailto:inquiry@brightwavesol.com"
              className="hover:text-accent text-lg font-medium text-zinc-900 transition-colors sm:text-xl"
            >
              inquiry@brightwavesol.com
            </a>
            <a
              href="tel:+919016071000"
              className="hover:text-accent text-lg font-medium text-zinc-900 transition-colors sm:text-xl"
            >
              +91 90160 71000
            </a>
          </div>

          <div className="flex flex-col gap-3 md:col-span-1">
            <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">Socials</h3>
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
            <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">Location</h3>
            <p className="text-lg leading-relaxed font-medium text-zinc-900 sm:text-xl">
              Based in Ahmedabad / Vadodara
              <br />
              Available Worldwide
            </p>
          </div>
        </div>

        <div className="pointer-events-none flex w-full flex-col items-center justify-end pb-4 select-none">
          <h2 className="font-display from-accent/20 bg-gradient-to-b to-transparent bg-clip-text px-8 text-[9.5vw] leading-[0.85] font-black whitespace-nowrap text-transparent">
            BRIGHTWAVE
          </h2>
        </div>
      </div>
    </main>
  );
}
