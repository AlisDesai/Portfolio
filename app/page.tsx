import { FamiliarPhrases } from "@/components/features/familiar-phrases/FamiliarPhrases";
import { GlobalPresence } from "@/components/features/global-presence/GlobalPresence";
import { Hero } from "@/components/features/home/Hero";
import { Services } from "@/components/features/services/Services";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <GlobalPresence />
        <Services />
        <FamiliarPhrases />
      </main>
    </>
  );
}
