"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-6 text-center">
      <p className="text-accent text-sm font-bold tracking-[0.2em] uppercase">Error</p>
      <h1 className="font-display mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-lg text-zinc-500">
        An unexpected error occurred. You can try again, or head back to the homepage.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="hover:bg-accent mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-all duration-300"
      >
        Try again
      </button>
    </main>
  );
}
