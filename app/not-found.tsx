import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-6 text-center">
      <p className="text-accent text-sm font-bold tracking-[0.2em] uppercase">404</p>
      <h1 className="font-display mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-zinc-500">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href={ROUTES.HOME}
        className="hover:bg-accent mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-all duration-300"
      >
        Back to home
      </Link>
    </main>
  );
}
