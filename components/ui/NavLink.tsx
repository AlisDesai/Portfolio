import { cn } from "@/lib/utils/cn";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/** Calm nav link: underline reveal, minimal scale on hover. */
export function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group hover:text-accent relative inline-block rounded-full px-1 py-1 text-sm font-medium tracking-wide text-zinc-600 transition-all duration-300 ease-out hover:scale-[1.02]",
        className
      )}
    >
      {children}
      <span className="bg-accent absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}
