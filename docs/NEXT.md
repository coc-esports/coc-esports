# Where we left off (2026-10-01)

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
