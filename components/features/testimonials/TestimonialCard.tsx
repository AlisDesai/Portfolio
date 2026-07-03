import type { Testimonial } from "@/components/features/testimonials/testimonials-data";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06),0_12px_24px_-8px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08),0_24px_48px_-16px_rgba(129,140,248,0.3)]">
      <p className="text-base leading-relaxed font-medium text-zinc-600">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <p className="text-accent mt-5 text-sm font-semibold">- {testimonial.name}</p>
    </div>
  );
}
