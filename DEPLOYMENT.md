# Deployment

Signal is a standard Next.js 14 App Router project with zero required environment variables and no external services, so deployment to Vercel is a direct, one-step process.

## Option A — Vercel dashboard (no CLI)

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — leave the default build command (`next build`) and output settings as-is.
4. No environment variables are required for the demo build. Click **Deploy**.

## Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel        # preview deployment
vercel --prod # production deployment
```

## Option C — GitHub Actions (included)

`.github/workflows/ci.yml` runs install → lint → typecheck → build on every push/PR to `main`, and deploys to Vercel on pushes to `main` once three repository secrets are set:

| Secret | Where to get it |
|---|---|
| `VERCEL_TOKEN` | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | Run `vercel link` locally, then read `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Same file, after `vercel link` |

If you don't want automatic deployment, delete the `deploy` job from the workflow and keep only `build-and-lint` as a CI gate — Vercel's own GitHub integration (Option A) will still deploy on every push once the repo is imported.

## Build settings reference

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Build command | `next build` (default) |
| Output directory | `.next` (default) |
| Install command | `npm install` (default) |
| Node.js version | 20.x |

## Notes

- Fonts (`next/font/google`) are fetched at build time — this requires outbound network access during the build, which Vercel's build environment provides by default.
- All job/company data is generated deterministically at build/runtime from `lib/data/`, so no database or seed script is needed post-deploy.
- If you later connect a real backend, the natural seams are `lib/data/jobs.ts` / `lib/data/companies.ts` (swap for fetch calls) and the `hooks/use*` files (swap `localStorage` for authenticated API calls).
