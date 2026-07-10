import type { BenefitIcon } from "@/components/features/benefits/benefits-data";

interface IconProps {
  className?: string;
}

// Hand-drawn line icons matching the exact convention already established
// in components/features/services-hero/ServicesHeroShowcase.tsx (viewBox
// 24x24, stroke currentColor, strokeWidth 1.5, round caps/joins) — one per
// benefit.
function MessageIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CompassIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx={12} cy={12} r={10} />
      <path d="m14.5 9.5-4 1-1 4 4-1z" />
    </svg>
  );
}

function LayersIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 12l10 5 10-5" />
      <path d="M2 17l10 5 10-5" />
    </svg>
  );
}

function LifebuoyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx={12} cy={12} r={10} />
      <circle cx={12} cy={12} r={4} />
      <path d="m4.9 4.9 4.2 4.2m5.8 5.8 4.2 4.2m0-14.2-4.2 4.2m-5.8 5.8-4.2 4.2" />
    </svg>
  );
}

function TagIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2H2v10l9.29 9.29a2 2 0 0 0 2.83 0l7.17-7.17a2 2 0 0 0 0-2.83z" />
      <circle cx={7} cy={7} r={1.5} />
    </svg>
  );
}

const BENEFIT_ICONS: Record<BenefitIcon, (props: IconProps) => React.JSX.Element> = {
  message: MessageIcon,
  shield: ShieldIcon,
  compass: CompassIcon,
  layers: LayersIcon,
  lifebuoy: LifebuoyIcon,
  tag: TagIcon,
};

export function BenefitIconMark({ icon, className }: { icon: BenefitIcon; className?: string }) {
  const Icon = BENEFIT_ICONS[icon];
  return <Icon className={className} />;
}
