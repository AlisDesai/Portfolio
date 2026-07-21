# Portfolio — BrightWave Solutions

A premium marketing/portfolio site for BrightWave Solutions, a freelance backend & mobile development studio. Built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion. Four routes (`/`, `/services`, `/work`, `/contact`), fully static — no backend, no auth, no database yet.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on **http://localhost:3008** (not the Next.js default 3000 — see `package.json`).

### Environment variables

Copy `.env.example` to `.env` and fill in real values before deploying:

| Variable | Purpose | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL — used for metadata, `sitemap.xml`, and `robots.txt`. Falls back to `http://localhost:3008` if unset. | Recommended for production |

Any new environment variable must be added to `.env.example` with a placeholder (never a real value) — see `CLAUDE.md`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (port 3008, Turbopack). |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build (port 3008). |
| `npm run lint` | ESLint (Next's core-web-vitals + TypeScript presets). |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run format` | Prettier check (CI-safe, never rewrites files). |
| `npm run format:fix` | Prettier write. |
| `npm run qa` | Runs lint → typecheck → format → `npm audit` → build, in order, and stops at the first failure. This is the pre-push quality gate — run it before opening a PR. Pass `--quick` to skip the build step for a fast local loop. |

## Architecture

The project follows a **feature-based** structure. A feature (e.g. `work`, `contact`, `services-hero`) owns its own components, local sub-components, and data files, and does not import from another feature's folder — cross-feature reuse gets promoted to a shared location instead (see below).

```
app/                      Routes, layouts, and App Router boundary files
  layout.tsx                Root layout — mounts global chrome (Navbar, cursor, floating
                             assistant, scroll wave) once, above <Providers>
  page.tsx, services/, work/, contact/   The 4 routes — each a Server Component that
                             composes feature components
  not-found.tsx, error.tsx, global-error.tsx, loading.tsx   App Router boundaries

components/
  features/<name>/         Feature-owned UI + co-located data (*-data.ts) and types.
                             No cross-feature imports.
  shared/                  Generic components genuinely reused across 2+ features
                             (e.g. ServicesAtmosphere, used by services-hero and contact)
  ui/                      Presentational primitives with zero business logic
                             (Badge, NavLink)
  layout/                  App-wide chrome only (Navbar, CustomCursor, FloatingAssistant,
                             ScrollWaveTheme) — mounted once in app/layout.tsx
  animations/              Shared motion constants (EASE_PREMIUM — the one easing curve
                             reused by nearly every Framer Motion transition site-wide)
  providers/               App-wide React providers, composed in Providers.tsx

hooks/
  shared/                  Reusable hooks with 2+ real consumers (useMediaQuery,
                             usePrefersReducedMotion, useScrolled)
  api/, feature/            Scaffolded, currently empty — see the READMEs in each folder
                             for intended future contents

lib/
  constants/               Cross-feature data/config that doesn't belong to one feature
                             (e.g. services-gallery.ts, used by both the services and
                             services-hero features; stats.ts, used by global-presence)
  utils/                   Pure, framework-agnostic helpers (cn.ts — the one classname
                             merge utility used everywhere)
  auth/, cache/, helpers/, mock/, permissions/, services/, validators/
                             Scaffolded, currently empty — intentional forward planning,
                             not dead code. Populate only when a real feature needs them.

config/                    Centralized app configuration — routes, nav items, site
                             metadata, env var access. Nothing route/nav/metadata-related
                             should be hardcoded outside this folder.

types/                     Reserved for types with genuine cross-feature reuse. Currently
                             empty — this codebase's standing convention is co-locating
                             types with the feature/data file that owns them; only promote
                             a type here if 3+ unrelated features would need it.

store/                     Reserved for global Zustand-style client state. Currently
                             empty — no app-wide client state exists yet; local component
                             state (useState) is used throughout instead. Add a store here
                             only when state genuinely needs to be shared across features.

public/                    Static assets, served as-is.

tests/                     Reserved (unit/integration/e2e/fixtures) — no test runner is
                             installed yet. There's no real business logic to test on a
                             static marketing site today; introduce Vitest/Playwright once
                             there is (see each folder's README).

scripts/qa.mjs             The local quality gate (see Scripts above).
```

### Why so many empty folders?

Several directories (`lib/auth`, `lib/cache`, `hooks/api`, `store`, `types`, `tests`, etc.) intentionally exist with only a `README.md` inside. This is deliberate scaffolding for a project meant to scale, not abandoned structure — each README explains what that folder is for and when to start using it. Don't force content into them just to "fill them in"; wait for a real feature that needs them.

### Path aliases

`@/*` maps to the project root (see `tsconfig.json`). Always import via `@/components/...`, `@/lib/...`, etc. — never deep relative paths (`../../../`).

### Server vs. Client Components

Pages default to Server Components and push `"use client"` down to the smallest leaf component that actually needs it (state, refs, browser APIs, or Framer Motion). `app/page.tsx` and `app/services/page.tsx` are pure Server Components composing client feature components; `app/work/page.tsx` follows the same pattern via `WorkHero`. `app/contact/page.tsx` is a Client Component by necessity — nearly the entire page shares one cluster of form state, so there's no meaningful static remainder to extract.

### Design system conventions

- **One shared accent color** (`text-accent` / `bg-accent`, `#818cf8`) and **one shared easing curve** (`EASE_PREMIUM` from `components/animations/easing.ts`) are used across the whole site — never introduce a second accent color or easing curve without a real reason.
- **`Badge`** (`components/ui/Badge.tsx`) is the one pill/kicker component — reuse it instead of hand-writing a new badge treatment.
- **`cn()`** (`lib/utils/cn.ts`) is the one Tailwind class-merge utility.
- A `Container` or `SectionHeading` primitive was deliberately rejected — section widths, gaps, and heading structures genuinely differ by design across pages, so forcing them into one shared component would be a premature abstraction, not a simplification.

## Coding conventions

The full engineering rulebook (naming, dependency direction, styling rules, accessibility, security, git conventions, etc.) lives in **`CLAUDE.md`** at the project root — read that before contributing. This README covers orientation and setup only, not the complete rule set.

## Deployment

No CI/CD pipeline or hosting config is committed yet (no `.github/workflows`, no `vercel.json`). The app is a standard Next.js App Router project and can be deployed to any Next.js-compatible host (Vercel is the natural fit, given zero configuration is required). Run `npm run qa` locally before deploying — there is no automated gate enforcing this yet.
