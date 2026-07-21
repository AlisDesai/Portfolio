"use client";

// This replaces the root layout entirely when the layout itself throws, so
// it must render its own <html>/<body> and stay independent of anything
// that might be implicated in the crash (Tailwind classes, fonts, other
// global providers) — inline styles only, intentionally.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <main
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1.5rem",
            background: "#F9FAFB",
            color: "#18181b",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>Something went wrong</h1>
          <p style={{ marginTop: "1rem", color: "#71717a", maxWidth: 420 }}>
            A critical error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "2rem",
              borderRadius: 9999,
              background: "#18181b",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
