import { ServicesHero } from "@/components/features/services-hero/ServicesHero";
import { Navbar } from "@/components/layout/Navbar";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ServicesHero />
      </main>
    </>
  );
}
