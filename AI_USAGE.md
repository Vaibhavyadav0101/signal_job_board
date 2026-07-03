# AI Usage Transparency

This document describes how AI assistance was used to build Signal, in the interest of transparency about the development process.

## Tool

Claude (Anthropic) was used as a pair-programmer across the full lifecycle of this project: product framing, UI/UX design decisions, component implementation, and documentation.

## How the work was scoped

The starting brief asked for a generic, feature-complete job board. Before writing code, the brief was deliberately reframed around one differentiating idea — a transparent, explainable "match score" — and a matching product identity (name, color system, and a signature visual component, `SignalBars`) so that the feature list wasn't just a checklist but expressions of one coherent concept. That reframing is the single biggest design decision in the project and is not something a prompt does automatically; it required judgment about what would make the difference between "a job board" and "a product."

## Where AI accelerated development

- **Boilerplate and repetitive component scaffolding.** Writing 10+ shadcn/ui-style primitives (button, card, dialog, select, tabs, slider, etc.) on top of Radix UI is mechanical once the pattern is set — AI assistance made this fast without sacrificing consistency (shared `cn()` utility, consistent variant naming, consistent focus-ring treatment).
- **Mock data generation.** The seeded-PRNG job generator (58 jobs × 22 companies × realistic salary bands by seniority) would be tedious to hand-write; AI assistance produced it in one pass, then it was reviewed for hydration-safety (deterministic output) and realism (salary bands actually correlate with experience level).
- **Documentation.** This file, along with README/FEATURES/ARCHITECTURE/DEPLOYMENT, were drafted with AI assistance and then edited for accuracy against the actual code that was written, not the other way around.
- **Iterative build verification.** The project was actually installed and built (`npm run build`) during development inside the assistant's sandboxed environment, and real compiler/lint errors — a naming collision between a custom Tailwind color token and the built-in `text-base` utility, an incorrect module export, unescaped JSX entities — were caught and fixed before delivery, rather than being left for the developer to discover.

## What was a human (developer) decision

- The product concept itself: "match score as the organizing idea," the name Signal, and the signal-bars metaphor.
- Which of the brief's many requested features were worth building fully (search, filters, save/apply/track, profile) versus explicitly scoping out (real auth, a backend, real resume parsing) — and saying so plainly in ARCHITECTURE.md rather than faking depth that isn't there.
- The color and typography system (signal green for "live match," violet reserved for AI/smart-feature surfaces, monospace for numeric data) and where glassmorphism is and isn't appropriate (navbar and toasts, not every card).
- Final review of generated code for correctness, accessibility, and whether it actually matched the stated product reasoning in FEATURES.md.

## What AI did not do

No AI system was used to fabricate user testimonials as real people, fabricate real company data, or claim real usage metrics — all "statistics," "testimonials," and company profiles in this project are explicitly labeled and treated as mock data throughout the documentation and, where user-facing, in the UI copy itself (e.g., the footer states listings are mock data).
