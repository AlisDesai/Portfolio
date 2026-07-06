import { Contact } from "@/components/features/contact/Contact";
import { FamiliarPhrases } from "@/components/features/familiar-phrases/FamiliarPhrases";
import { GlobalPresence } from "@/components/features/global-presence/GlobalPresence";
import { Hero } from "@/components/features/home/Hero";
import { Services } from "@/components/features/services/Services";
import { Testimonials } from "@/components/features/testimonials/Testimonials";
import { WorkStack } from "@/components/features/work/WorkStack";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <WorkStack />
        <GlobalPresence />
        <Services />
        <FamiliarPhrases />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
