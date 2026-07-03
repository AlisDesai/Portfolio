export interface Testimonial {
  quote: string;
  name: string;
}

// Dummy testimonials standing in for real client feedback.
// TODO: Swap these for real client testimonials once available.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Implementing their ERP solution streamlined our entire supply chain. What used to take days now happens in real time, and the support team was with us every step of the way.",
    name: "Priya Malhotra",
  },
  {
    quote:
      "Migrating to their SaaS platform cut our onboarding time in half. The interface is intuitive, and our team adopted it without any real training curve.",
    name: "Daniel Osei",
  },
  {
    quote:
      "Our mobile app launch exceeded every expectation. The build was fast, the design felt premium, and users have been raving about the experience since day one.",
    name: "Aiko Tanaka",
  },
  {
    quote:
      "The AI model they built for us now predicts demand with remarkable accuracy. It's already saved us thousands in excess inventory within the first quarter.",
    name: "Marcus Webb",
  },
  {
    quote:
      "Their custom CRM gave our sales team a single source of truth for the first time. Deal cycles are shorter and nothing falls through the cracks anymore.",
    name: "Elena Kovac",
  },
  {
    quote:
      "Our new storefront doubled conversion rates within two months. Checkout is fast, the design is clean, and customers keep telling us how easy it is to shop.",
    name: "Farah Haddad",
  },
  {
    quote:
      "They understood the compliance requirements of healthcare software from day one. Our patient portal is secure, fast, and genuinely easy for our staff to use.",
    name: "Dr. Samuel Reyes",
  },
  {
    quote:
      "Automating our internal workflows freed up hours every week that used to go into manual data entry. It's transformed how our operations team works.",
    name: "Grace Lindqvist",
  },
];
