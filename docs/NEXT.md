# Where we left off (2026-10-01)

## RESUME HERE (v3 "Will Call", updated 2026-10-03)
**v3 build complete** on branch `rebuild/v2` (preview link below). Impeccable flow done: PRODUCT.md, direction contract (.impeccable/surfaces/src-app-page-tsx.md), build, finish review (2 fix rounds, all items resolved), DESIGN.md + .impeccable/design.json.
Numbers (2026-10-03): design critique **32/40** (target met; v1 was 25); ticket visible at first paint 0.7 s on a mid-range phone (was 6 s); Lighthouse home 75 (lab, 3D kept), inner 90–94, a11y 100; 104 tests; detector 0.
Next design wins (from the last critique): mobile road as native swipe below 768 px; seat labels as DOM text on phones; tighter section rhythm; a signature element per inner page (/teams, /schedule); small polish (date breaks, serial wrap, format-box corners).
Open for the owner:
- Review the preview on phone and desktop (one consolidated feedback list).
- Speed choice for the home page: keep 78 with the 3D, or add a still poster of the ticket so the first paint is lighter (more work), or show 3D only on desktop.
- LCQ projected field and roster source (earlier "Other" answers never arrived).
- 21st.dev: add API_KEY_21ST to .env.local when you want components from it.
Then Step 7: LCQ results on `main` if asked (Oct 10–11), merge after Oct 11, launch checklist.

Start the next session with: **"Read docs/NEXT.md and continue."**

## Status
- **Live site** (unchanged, branch `main`): https://coc-esports.vercel.app. It stays as-is for the LCQ (Oct 10–11).
- **Rebuild v2** (branch `rebuild/v2`, pushed): playbook Steps 1–6 done. Brief, research, plan, design and prototype are in `docs/`; the scorecard is in `docs/scorecard.md`; decisions are in `docs/decisions.md`.
- Preview: https://coc-esports-git-rebuild-v2-coc-esports.vercel.app (updates on every push to `rebuild/v2`; Vercel asks you to sign in, so only the owner can see it).
- Scorecard: Lighthouse mobile perf 91–95, accessibility, best practices and SEO 100, CLS 0, 0 visual problems, keyboard and reduced motion pass, security headers on. The only gap: lab LCP 2.5–3.4 s (target 2.5). Check real-visitor data after launch.

## Owner decisions that would lift the design score (now 27–28/40, target 32)
1. **Merge /stages into /schedule**, or make /stages a visual season map? Reviewers see two near-identical lists.
2. **Show the LCQ field before it's official?** A "projected from the leaderboard (ranks 4–11)" list on the LCQ page, clearly labelled. Or wait for the official list.
3. **Rosters:** fill from Liquipedia (CC-BY-SA, credited) or remove the section.
4. **A full-width key-art hero** on home/Worlds using a Fan Kit loading-screen scene (we have TH16/TH17/TH18 scenes).
5. **Home:** show the ticket race as one compact strip and keep the 8 cards on /worlds only.

## Step 7: Launch & learn (next)
1. **Owner reviews the preview** on phone and desktop. Feedback goes in one list = one revision round.
2. **LCQ (Oct 10–11):** if asked, update results on `main` (live site, see `UPDATING.md`), then make the same data edits on `rebuild/v2` (`src/data/season.ts`, `teams.ts`, `brackets.ts`).
3. **After Oct 11:** merge `rebuild/v2` into `main` → Vercel deploys it live. Then run the launch checklist (`web-studio-playbook/references/launch-checklist.md`): redirects (/leaderboards and /players already go to /teams), sitemap, social preview images, 404.
4. **Week 1:** check speed and errors on the live site, then write lessons.

## Optional (owner's choice)
- Make the GitHub repo private (the old email is still reachable by exact commit ID).
- Rename the Vercel project to `gildra` (then update `site.url` in `src/config/site.ts`).
- A domain (gildra.gg / .io / .app looked free). Costs money, so only if the owner wants it.
