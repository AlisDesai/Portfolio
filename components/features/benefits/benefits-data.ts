export type BenefitIcon = "message" | "shield" | "compass" | "layers" | "lifebuoy" | "tag";

export interface Benefit {
  icon: BenefitIcon;
  title: string;
  description: string;
}

export const BENEFITS: Benefit[] = [
  {
    icon: "message",
    title: "Direct line, no middlemen",
    description:
      "You talk straight to the person writing the code — no account managers, no relay, no waiting on someone else to ask someone else.",
  },
  {
    icon: "shield",
    title: "Built to ship, not just demo",
    description:
      "Every project leaves with clean architecture, real tests, and documentation — the kind of code that survives contact with production.",
  },
  {
    icon: "compass",
    title: "Always know where things stand",
    description:
      "Regular updates and clear timelines from kickoff to launch, so you're never left guessing what's happening or when.",
  },
  {
    icon: "layers",
    title: "Built to grow with you",
    description:
      "Systems designed for real traffic and real growth, so you're not rebuilding from scratch the moment things take off.",
  },
  {
    icon: "lifebuoy",
    title: "Support that doesn't disappear",
    description:
      "Fast, dependable help after launch — the relationship doesn't end the moment the invoice is paid.",
  },
  {
    icon: "tag",
    title: "No hidden hours, no surprises",
    description:
      "Scope and pricing agreed upfront, in plain language, so the final invoice matches the number you were told at the start.",
  },
];
