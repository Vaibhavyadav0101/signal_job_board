# Architecture

## Rendering strategy

- **Landing, listings shell:** static (`○`) — the shell is server-rendered; the listings themselves are filtered client-side in `JobsExplorer` because filtering needs to be instant and URL-query-aware without a round trip.
- **Job detail pages:** SSG via `generateStaticParams()` — all 58 job pages are pre-rendered at build time with per-job `generateMetadata()`, so each has a real, unique `<title>`/description for SEO and social sharing, and no client-side data fetch is needed to render the primary content.
- **Dashboard / profile:** client components — inherently personal and `localStorage`-backed, so there's nothing to statically render.

## State management

No global state library. Personalization state (saved jobs, applications, recently viewed, profile) is small, independent, and naturally scoped, so each concern gets its own hook wrapping a shared `useLocalStorage<T>` primitive:

```
useSavedJobs()       → signal:saved-jobs
useApplications()    → signal:applications
useRecentlyViewed()  → signal:recently-viewed
useProfile()         → signal:profile
```

Each hook returns a `hydrated` flag so components can avoid rendering `localStorage`-derived UI before the client has mounted — this prevents hydration mismatches, since the server always renders the "empty" state.

Filter/search/sort state on the listings page lives in local component state (`useState`) rather than global state or the URL, deliberately: it's page-scoped, doesn't need to survive navigation, and keeping it local avoids re-render cascades that a context or store would introduce for something this contained. Initial `q`/`loc`/`category` values are seeded from `useSearchParams()` so links from the landing page and category tiles work as expected.

## Data layer

`lib/data/jobs.ts` generates the mock dataset with a **seeded PRNG** (not `Math.random()`), so the same 58 jobs are produced identically on every server render and every client hydration — this is what makes SSG safe here without a database. Company data lives in `lib/data/companies.ts`; `getJobWithCompany()` joins the two, and `companiesWithCounts` derives each company's live open-role count from the job list rather than hand-maintaining it.

## Component design

UI primitives in `components/ui/` follow the shadcn/ui pattern: thin, composable wrappers around Radix UI primitives (`@radix-ui/react-*`) styled with Tailwind and `class-variance-authority` for variants, rather than a single monolithic design-system package. This keeps every primitive independently readable and easy to swap.

The one deliberate departure from "pure shadcn" is the toast system (`hooks/use-toast.ts` + `components/ui/toaster.tsx`): a minimal pub/sub implementation instead of pulling in `@radix-ui/react-toast`, since the app only needs simple, auto-dismissing confirmations.

`SignalBars` (`components/jobs/signal-bars.tsx`) is the one true "signature" component — it's used in five different contexts (job card, detail header, similar jobs, dashboard) and is the visual anchor tying the product name to its core mechanic.

## Styling system

Colors are CSS custom properties in HSL (`app/globals.css`), mapped into Tailwind's theme in `tailwind.config.ts`, so both `dark:` variants and arbitrary opacity modifiers (`bg-signal/10`) work without duplicating palettes. Note: the light/dark background token is named `canvas` rather than `base` specifically to avoid colliding with Tailwind's built-in `text-base` font-size utility.

## Accessibility approach

Rather than bolting on ARIA after the fact, interactive components are built on Radix primitives that ship correct keyboard/focus/ARIA behavior for dialogs, selects, tabs, sliders, and checkboxes. Custom interactive elements (job card save button, view toggles) explicitly set `aria-label`/`aria-pressed`.

## What's intentionally out of scope

There is no backend, authentication, or persistence beyond `localStorage` — this is a frontend/UX portfolio piece, not a production hiring platform. "Apply" and "resume upload" are real UI flows with real local state changes, but nothing is transmitted anywhere. Swapping the mock data layer for a real API would mean replacing `lib/data/*` with fetch calls / a database and moving the listings filter logic server-side for pages that need to scale past a few hundred jobs — the component layer above it wouldn't need to change.
