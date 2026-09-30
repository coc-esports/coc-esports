@AGENTS.md

# Project: fan-made Clash of Clans esports site

- Current status, decisions and next steps: `docs/NEXT.md` (read it first when resuming).
- The full plan lives in `PLAN.md`. Read the relevant section before starting a task; the owner will say which phase/task.
- Owner is a beginner: explain changes in plain language, keep tasks small, commit after each working step.
- Stack: Next.js 16 (App Router, `src/`), TypeScript, Tailwind v4, GSAP + Lenis (from Phase 3).
- Design tokens are CSS variables in `src/app/globals.css` (Tailwind names: `bg`, `surface`, `surface-2`, `line`, `text`, `muted`, `gold`, `elixir`, `dark-elixir`, `live`; fonts `font-display` = Anton, `font-sans` = Inter). Never hardcode colors.
- Brand name and disclaimer come from `src/config/site.ts`. The Supercell disclaimer must stay visible in the footer on every page.
- Legal: never use "Clash"/"Supercell" in the brand/domain, no paid features, only Fan Kit assets (PLAN.md §2).
- Clash of Clans API keys only on the server, in `.env.local` (git-ignored). Never in client components.
- Every animation needs a `prefers-reduced-motion` fallback; animate only transform/opacity/clip-path.
- Log shipped work in `DONE.md`.
- Esports content lives in `src/data` (TS) and `src/content/news` (MDX); `UPDATING.md` explains edits. Never invent results, scores or quotes: use TBD states and cite sources in `season.ts`.
