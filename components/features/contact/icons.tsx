import type { FooterItemIcon, SocialPlatform } from "@/components/features/contact/contact-data";

interface IconProps {
  className?: string;
}

/** Abstract, non-brand-specific placeholder mark for the logo lockup. */
export function AbstractLogoMark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="20" y1="20" x2="20" y2="4" />
      <line x1="20" y1="20" x2="6.14" y2="28" opacity="0.85" />
      <line x1="20" y1="20" x2="33.86" y2="28" opacity="0.7" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width={20} height={16} x={2} y={4} rx={2} />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </svg>
  );
}

function PinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx={12} cy={10} r={3} />
    </svg>
  );
}

const FOOTER_ITEM_ICONS: Record<FooterItemIcon, (props: IconProps) => React.JSX.Element> = {
  mail: MailIcon,
  phone: PhoneIcon,
  pin: PinIcon,
};

export function FooterItemIconMark({
  icon,
  className,
}: {
  icon: FooterItemIcon;
  className?: string;
}) {
  const Icon = FOOTER_ITEM_ICONS[icon];
  return <Icon className={className} />;
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width={4} height={12} x={2} y={9} />
      <circle cx={4} cy={4} r={2} />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1={17.5} x2={17.51} y1={6.5} y2={6.5} />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
      <path d="M8.3 8.5c.2-.5.5-.5.7-.5h.5c.2 0 .4 0 .6.5s.7 1.7.7 1.9 0 .3-.1.4c-.2.3-.4.5-.6.7-.2.2-.4.3-.2.6.2.4.9 1.4 1.9 2.3 1.3 1.1 2.4 1.5 2.7 1.6.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.7.8 2 1 .3.1.5.2.6.3.1.2.1 1-.2 1.9-.3.9-1.8 1.7-2.5 1.8-.6.1-1.4.2-4.5-1-3.7-1.5-6.1-5.3-6.3-5.5-.2-.3-1.5-2-1.5-3.8 0-1.8 1-2.7 1.3-3z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<SocialPlatform, (props: IconProps) => React.JSX.Element> = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  WhatsApp: WhatsAppIcon,
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = SOCIAL_ICONS[platform];
  return <Icon className={className} />;
}
