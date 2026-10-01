@AGENTS.md

# Project: fan-made Clash of Clans esports site

- Current status, decisions and next steps: `docs/NEXT.md` (read it first when resuming).
- The rebuild (v2) follows `docs/brief.md`, `docs/plan.md` and `docs/decisions.md`; the original plan is `PLAN.md`. Read the relevant section before starting a task; the owner will say which phase/task.
- Owner is a beginner: explain changes in plain language, keep tasks small, commit after each working step.
- Stack: Next.js 16 (App Router, `src/`), TypeScript, Tailwind v4, GSAP + Lenis (loaded on demand), Radix Dialog, cmdk.
- Design tokens (v2 "Broadcast Editorial") are CSS variables in `src/app/globals.css`: colours `ink`, `graphite`, `plate`, `rule`, `steel`, `bone`, `bolt` (the only accent), `signal-live`, `signal-win`; fonts `font-cond` (Sofia Sans Extra Condensed 900, display, always uppercase), `font-text` (Hanken Grotesk), `font-data` (JetBrains Mono); type scale `text-mega/hero/h1/h2/h3/lead/label`. Components live in `src/components/v2/`; see `/styleguide`. Never hardcode colors.
- Brand name and disclaimer come from `src/config/site.ts`. The Supercell disclaimer must stay visible in the footer on every page.
- Legal: never use "Clash"/"Supercell" in the brand/domain, no paid features, only Fan Kit assets (PLAN.md §2).
- Clash of Clans API keys only on the server, in `.env.local` (git-ignored). Never in client components.
- Every animation needs a `prefers-reduced-motion` fallback; animate only transform/opacity/clip-path. GSAP is never imported directly: use `useMotion()` / `loadMotion()` from `src/lib/motion.ts` so it loads after the page is up. At most 3 signature moments (HeroStage, TicketFlip, RoadTimeline).
- Any result (winner, score, qualified team, standings) must respect "Hide results": wrap it in `HideResult` (server-safe, CSS-driven) or `Spoiler` (with a reveal button). Tests in `tests/qa.spec.ts` check this; run `npm run build && npm run test:qa`.
- No labels above headings: info lines go under the title (Section/PageIntro `label`).
- Log shipped work in `DONE.md`.
- Esports content lives in `src/data` (TS) and `src/content/news` (MDX); `UPDATING.md` explains edits. Never invent results, scores or quotes: use TBD states and cite sources in `season.ts`.
