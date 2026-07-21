import { Benefits } from "@/components/features/benefits/Benefits";
import { Contact } from "@/components/features/contact/Contact";
import { ServicesHero } from "@/components/features/services-hero/ServicesHero";

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServicesHero />
      <Benefits />
      <Contact showCollaborateCta={false} />
    </main>
  );
}
