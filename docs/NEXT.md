# Where we left off (2026-09-30)

Start the next session with: **"Read docs/NEXT.md and continue."**

## Status
- Site **Gildra** is live at https://coc-esports.vercel.app (repo: github.com/coc-esports/coc-esports). Phases 0–6 done, Phase 7 partly done; see `DONE.md`.
- Live game data (leaderboards, player pages) works only on the owner's PC (`.env.local` key locked to the home IP). Production live data is **deferred** (fixed-IP proxy, about $4–6/month, decide later).
- Design critique (Impeccable, 2026-09-30): **25/40**. Report: `.impeccable/critique/2026-09-30T10-00-06Z__src-app.md`. Main findings: generic "dark esports template" look, gold overused, placeholder art reads as empty, repetition and three CTAs to the same page, small text and tap targets. The P0 mobile-menu bug is already fixed.

## Decisions made
- **Full refinement** of everything, including a new logo (nothing is off-limits).
- **Event-aware home:** during event weeks (LCQ Oct 10–11) the hero leads with the countdown and the Golden Ticket race.
- Gold means only three things: main action, qualified/winner, "gilded" brand moments.
- Clash characters: **only official Supercell Fan Kit art**, animated in 2.5D layers. Never redraw or 3D-model characters (fan content policy).

## Waiting on the owner
1. **Pick the visual direction.** Board: https://claude.ai/artifact/4btnYJgKQUYF1ayryV4E2F (copy in `docs/design/visual-directions.html`). Recommended: **Gilded War Table** (Bricolage Grotesque + Hanken Grotesk, warm stone neutrals, gold as metal), with **Broadcast Night** styling only on live match days.
2. **Pick the 3D options.** Board: https://claude.ai/artifact/WLnXgTJsFqApZZXZBKLKUJ (copy in `docs/design/3d-directions.html`). Recommended: **1 + 2 + 5 + 6**: 3D Golden Ticket hero, holographic crest cards, gilded 3D numbers, Fan Kit characters in layered depth. Later: 3 (War Table map), 4 (gold dust).
3. **Download the Supercell Fan Kit** (fankit.supercell.com, Clash of Clans) and share the folder path. It's needed for the characters.
4. Optional: make the GitHub repo private (the old email is still reachable by exact commit ID), and rename the Vercel project to `gildra` (then update `site.url` in `src/config/site.ts`).

## Build plan once direction is confirmed (about 4–5 sessions)
1. New look: fonts, colour tokens (warm neutrals + gold metal ramp), beveled buttons, Gildra "G" crest logo + favicon, crest team marks. Update `/styleguide`.
2. 3D: Golden Ticket hero (Three.js via React Three Fiber, built in code like the demo, still-image first, lazy-loaded, pauses off-screen, reduced-motion fallback), holo crest cards (CSS), gilded 3D numbers (CSS).
3. Characters from the Fan Kit in 2.5D parallax layers (hero, team champions, Goblin on 404, Grand Warden on rules).
4. Event-aware home + Ticket Race; fix critique issues (remove StatBand repetition, one time-aware CTA, CountUp only for real quantities, explain LCQ and bracket codes, ≥12px text, ≥44px tap targets, fewer eyebrows, own copy instead of "What's happening?", remove Styleguide from the public footer).
5. Re-run `/impeccable critique` (target 32+/40), Lighthouse (keep 90+ mobile), phone test.

## Upcoming content
- **LCQ Oct 10–11:** update the September winner, LCQ line-up, bracket and results (see `UPDATING.md`).
