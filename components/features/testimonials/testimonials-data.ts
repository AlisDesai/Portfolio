export interface Testimonial {
  quote: string;
  name: string;
}

// Dummy testimonials standing in for real client feedback.
// TODO: Swap these for real client testimonials once available.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "BrightWave's backend architecture for our booking system was flawless. It handles high traffic seamlessly and the API integration is incredibly robust.",
    name: "Automotive Booking API Client",
  },
  {
    quote:
      "The stateless authentication system he built using Redis completely transformed our app's security and performance. Highly recommended.",
    name: "Stateless Auth System Client",
  },
  {
    quote:
      "The Material Testing mobile app he developed in Flutter is intuitive and fast. It significantly improved our lab technicians' workflow.",
    name: "Material Testing App Client",
  },
  {
    quote:
      "He handled our production VPS setup and Nginx configuration with impressive expertise, ensuring our deployment was secure and highly available.",
    name: "Production VPS Setup Client",
  },
  {
    quote:
      "The Stripe webhook implementation he developed automated our payment processing entirely, saving us countless hours of manual work.",
    name: "Stripe Webhook Client",
  },
  {
    quote:
      "His deep knowledge of Spring Boot and JPA/Hibernate optimized our complex database queries, reducing load times significantly.",
    name: "Database Integration Client",
  },
  {
    quote:
      "The lab task assignment application he built provided a much-needed digital solution that modernized our entire operation.",
    name: "Lab Task Assignment Client",
  },
  {
    quote:
      "Integrating the OAuth2 authentication was done smoothly and securely. BrightWave is a true professional team when it comes to API integrations.",
    name: "OAuth2 Auth Client",
  },
];
