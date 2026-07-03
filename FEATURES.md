# Features & Product Reasoning

Every feature below follows the same structure: **why** it exists, **what** problem it solves, and **how** the UX improves on a typical job board.

## 1. Match score / Signal bars

**Why:** Traditional boards present every result identically — a senior candidate and an unrelated posting look the same until you read both fully.
**What it solves:** Decision fatigue when triaging dozens of results.
**How:** Each job carries a computed `matchScore` (0–100) rendered as a five-bar "signal strength" indicator — a metaphor borrowed from wifi/cell reception that needs no legend. It appears on every job card, the detail page header, and drives the default "Best match" sort. In a production system this score would combine skills overlap, seniority fit, and location/work-mode preference against a real user profile; here it's deterministic mock data, but the UI and information architecture are real.

## 2. Instant, debounced search with suggestions

**Why:** Search-as-you-type that recomputes results on every keystroke feels fast but visually "jitters" mid-word.
**What it solves:** Noisy, unstable result counts while typing.
**How:** Input is debounced 250ms before filtering. A dropdown shows live title/company suggestions, falls back to the user's 5 most recent searches, then to a trending-searches list — the same progressive-disclosure pattern used by real search products.

## 3. Advanced filtering sidebar

Salary range (dual slider), work mode, job type, experience level, and skill tags — all combinable, with an active-filter count and one-click reset. On mobile the same filter set opens in a dialog rather than being cut for space.

**Why it matters:** Job seekers filter on very different axes (comp vs. remote-only vs. seniority) and a single search box can't express that.

## 4. Grid/List toggle + sort + pagination

Grid view favors visual scanning; list view favors comparing salary and match score across many roles at once. Sort options: best match, newest, salary high→low, low→high. Pagination avoids an infinite unbounded list that never lets you feel "done" scanning a page.

## 5. Save jobs / bookmarking

One-tap save from any card or the detail page, persisted to `localStorage`, surfaced with a badge count in the nav and a dedicated dashboard tab. Solves the common "I'll come back to this" loss that happens when a listing is only in browser history.

## 6. Application tracking with status timeline

Applying (a demo action — no data leaves the browser) creates a tracked application with a status history (`Applied → In Review → Interviewing → Offer`, or `Rejected`). The dashboard renders this as a horizontal progress timeline per application — most boards only tell you "applied," not where you stand.

## 7. Recently viewed jobs

Automatically recorded on detail-page visit (max 8, most-recent-first, de-duplicated). Solves the "I saw a good one earlier and can't find it again" problem without requiring an explicit save.

## 8. Similar jobs recommendation

On the detail page, ranked by shared category or company, sorted by match score. Keeps a candidate moving instead of dead-ending after one listing.

## 9. Company profile card

Inline on every job detail page: industry, size, HQ, rating, open-role count, description — enough context to judge the employer without a separate page load.

## 10. Application statistics

Applicant count and view count per listing (mock but realistic), plus the candidate's own match percentage — gives a sense of competitiveness other boards omit entirely.

## 11. Profile + profile completion score

Editable bio, skills (add/remove tags), experience, education, and a resume-upload UI, all backed by `localStorage`. A completion percentage (7 weighted checks) nudges users toward a fuller profile — directly tied to the product's premise that a better profile means a better match score.

## 12. Resume upload UI

Drag-target/click-to-upload zone with file-type hint, immediate confirmation toast, and a remove action. No file is actually persisted anywhere outside the browser tab (this is a UI/UX demonstration, not a document pipeline).

## 13. Analytics widgets (dashboard)

Saved / applied / recently-viewed counts plus a small weekly-activity area chart (Recharts). Gives the dashboard a "product," not just a "list," feel.

## 14. Share functionality

Uses the native Web Share API where available (mobile), falling back to copy-to-clipboard with a toast confirmation on desktop.

## 15. Toast notifications

A lightweight custom toast system (no extra dependency) confirms save/apply/upload actions without a blocking dialog.

## 16. Dark / light theme

System-aware by default via `next-themes`, togglable from the navbar, implemented with CSS custom properties so every component themes automatically — no per-component dark: overrides scattered through the codebase.

## 17. Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `aside`, `footer`), skip-to-content link.
- Every icon-only control has an `aria-label`; toggles use `aria-pressed`/`aria-expanded`/`aria-current` correctly.
- Visible focus rings on all interactive elements (`:focus-visible`), not just default browser outlines.
- Filter groups use `<fieldset>`/`<legend>` so screen readers announce filter categories.
- Reduced-motion media query disables non-essential animation.
- Color contrast checked against WCAG AA in both themes for text/background pairs.

## 18. Loading, empty, and error states

Skeleton loaders (shimmer effect) for the job grid, a route-level `loading.tsx` for the jobs page, a shared `EmptyState` component reused across dashboard tabs and zero-result search, and an app-level `error.tsx` boundary with a retry action.

## 19. SEO

Per-page `generateMetadata` (job title/company/salary in the meta description), Open Graph + Twitter card defaults in the root layout, `sitemap.ts` covering every static route and all 58 jobs, and `robots.ts`.

## 20. Responsive, mobile-first layout

Every page is designed at a 375px viewport first: the filter sidebar collapses into a dialog, the navbar collapses into a slide-down menu, cards stack to a single column, and the featured-jobs carousel becomes horizontally swipeable.
