# Signal — Job search, without the noise

Signal is a job discovery platform built as a portfolio piece to demonstrate product thinking, UX design, and frontend engineering — accelerated by AI-assisted development. It is not a generic job-board clone: every core feature exists because it solves a specific, named frustration with traditional listings sites.

**Live concept:** instead of an undifferentiated feed of postings, Signal ranks every job by an explainable **match score**, visualized as a signature "signal bars" indicator (the product's namesake), so a candidate can triage dozens of listings in seconds.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables or backend are required — all data is realistic, deterministic mock data (58 jobs across 22 companies), and personalization (saved jobs, applications, profile) is stored in `localStorage`.

```bash
npm run build     # production build
npm run start     # run the production build locally
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS with a custom design-token system |
| Components | Hand-built shadcn/ui-style primitives on Radix UI |
| Animation | Framer Motion |
| Icons | Lucide |
| Charts | Recharts (dashboard analytics) |
| State | React state + `localStorage`, no backend/DB |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (data) |

## Project structure

```
app/                     Next.js App Router routes
  page.tsx                 Landing page
  jobs/page.tsx             Job listings (search, filter, sort)
  jobs/[id]/page.tsx        Job detail (SSG, per-job metadata)
  dashboard/page.tsx        Saved / applied / recently viewed + analytics
  profile/page.tsx          Editable profile, resume upload, skills
  layout.tsx, globals.css   Root shell, design tokens
  sitemap.ts, robots.ts     SEO
  error.tsx, not-found.tsx  Error/empty states

components/
  ui/                     Design-system primitives (button, card, dialog…)
  layout/                 Navbar, footer, breadcrumbs, empty states
  jobs/                   JobCard, SignalBars, filters, search, pagination
  dashboard/              Analytics widgets, application status timeline
  landing/                Hero, stats, categories, testimonials, CTA
  profile/                Profile editor
  theme/                  Dark/light theme provider + toggle

hooks/                   useSavedJobs, useApplications, useRecentlyViewed,
                          useProfile, useDebounce, useLocalStorage, use-toast

lib/
  data/                   companies.ts, jobs.ts (deterministic mock data generator)
  utils.ts                cn(), formatSalary(), timeAgo(), initials()

types/index.ts            Shared TypeScript interfaces
```

See **FEATURES.md** for the full feature list with the product reasoning behind each one, **ARCHITECTURE.md** for engineering decisions, **AI_USAGE.md** for how AI tooling was used during development, and **DEPLOYMENT.md** for shipping to Vercel.

## Design system

Signal uses a small, consistent token set (see `app/globals.css` and `tailwind.config.ts`):

- **Signal green** (`--signal`) — the "live match" color, used for match scores, primary actions, and saved/active states.
- **Pulse violet** (`--pulse`) — reserved for AI-assisted / smart-feature surfaces (skills, requirements).
- **Amber** — featured content and ratings.
- Full light/dark theming via CSS custom properties and Tailwind's `class` strategy, toggled with `next-themes`.

## Data

All jobs and companies are generated deterministically in `lib/data/jobs.ts` from a seeded pseudo-random generator, so the dataset is stable across server and client renders (no hydration mismatches) while still looking varied and realistic — 58 jobs, 22 companies, 5 experience levels, 3 work modes, salary ranges tied to seniority.
