# Decision log

| Date | Decision | Approved by |
|---|---|---|
| 2026-10-01 | Rebuild Gildra's design from scratch, using the web-studio-playbook and all research from 2026-10-01 | Owner |
| 2026-10-01 | This morning's unfinished redesign is saved on branch `wip/morning-redesign-2026-10-01` for reference and not used as the base | Owner |
| 2026-10-01 | All Gildra work happens in this one chat (no parallel chats on the repo) | Owner |
| 2026-10-01 | Current site stays live for the LCQ (Oct 10–11), results only; the rebuild launches after the LCQ | Owner |
| 2026-10-01 | English only | Owner |
| 2026-10-01 | Leaderboards and player pages removed from the public site (live data would need paid hosting) | Owner |
| 2026-10-01 | Owner will download the Supercell Fan Kit for official art/characters | Owner |
| 2026-10-01 | Earlier picks (Gilded War Table, 3D options 1+2+5+6) are reconsidered in Step 4, not assumed | Claude (per rebuild-from-scratch decision) |
| 2026-10-01 | Brief approved (docs/brief.md); Step 1 done | Owner |
| 2026-10-01 | Research (docs/research.md) and plan (docs/plan.md) approved; Steps 2–3 done | Owner |
| 2026-10-01 | Fan Kit starter set (18 official files: TH18 renders, loading-screen key art, heroes, Goblin, Legend League badge) downloaded by Claude at web size into References\gildra-fankit; used under the Supercell Fan Content Policy | Owner ("u do it") |
| 2026-10-01 | Wireframes approved; owner delegated design choices to Claude ("u do what is the best") | Owner |
| 2026-10-01 | Visual direction: **A · Broadcast Editorial** (Sofia Sans Extra Condensed + Hanken Grotesk + JetBrains Mono; ink/graphite/steel/bone + TH18 lightning blue; colour from official art). Chosen by Claude under the owner's delegation; owner can override | Claude (delegated) |
| 2026-10-01 | Motion prototype passed on a 4x-slowed phone (docs/design/motion-prototype.md); all 3 signature moments kept; timeline pin bug fixed | Claude (delegated) |
| 2026-10-01 | Step 5 built: all pages on the v2 design system; /leaderboards and /players/* redirect to /teams | Claude (delegated) |
| 2026-10-01 | Speed: GSAP/Lenis load after the page is up (not on touch screens or pages without effects); hero rise is CSS. Lab LCP 2.5–3.4 s accepted for now (framework baseline on simulated slow 4G); revisit with real-visitor data after launch | Claude (delegated) |
| 2026-10-01 | Step 6 scorecard green except lab LCP (partly met), see docs/scorecard.md; /lab/motion test page removed | Claude (delegated) |
| 2026-10-01 | `rebuild/v2` pushed for a Vercel preview link only; `main` (live site) untouched until after the LCQ | Owner ("go on finish everything"; preview link agreed earlier) |
| 2026-10-01 | Formal impeccable critique (two independent reviewers + detector): 28/40 twice. Fixed: phone menu off screen, hide results site-wide (before paint), date order, labels above headings removed, Fan Kit art on page headers, per-page closing band, phone zoom-out on /worlds | Claude (owner chose "everything") |
| 2026-10-01 | **Foil gold (#d9b45a) added for the Golden Ticket only** (claimed seats cut like a ticket, ticket labels). Bolt blue stays the one general accent. Reason: the season's story had no visual form | Claude (delegated) |
| 2026-10-01 | Road to Worlds timeline lives on /worlds only (home no longer repeats it) | Claude (delegated) |
| 2026-10-01 | Open question for the owner: merge /stages into /schedule (reviewer: near-duplicate lists) | Pending owner |
