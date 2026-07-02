import { cn } from "@/lib/utils/cn";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/** Calm nav link: underline reveal, soft glass highlight, minimal scale on hover. */
export function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-block rounded-full px-1 py-1 text-sm font-medium tracking-wide text-zinc-600 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-zinc-950",
        className
      )}
    >
      <span className="absolute inset-x-[-10px] inset-y-[-6px] -z-10 rounded-full bg-black/0 opacity-0 backdrop-blur-md transition-all duration-300 ease-out group-hover:bg-black/5 group-hover:opacity-100" />
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-zinc-950 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}
