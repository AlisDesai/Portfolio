import { Benefits } from "@/components/features/benefits/Benefits";
import { Contact } from "@/components/features/contact/Contact";
import { ServicesHero } from "@/components/features/services-hero/ServicesHero";
import { Navbar } from "@/components/layout/Navbar";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ServicesHero />
        <Benefits />
        <Contact showCollaborateCta={false} />
      </main>
    </>
  );
}
