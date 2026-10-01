# Updating the site

All esports content lives in `src/data` and `src/content`. Edit a file, save, and the site updates (push to GitHub to put it live).

| To change… | Edit |
|---|---|
| Dates, stage status, winners, prize money | `src/data/season.ts` (`stages`) |
| The Chosen Eight slots | `src/data/season.ts` (`worldsSlots`) |
| Teams, leaderboard points, ranks | `src/data/teams.ts` |
| Bracket matchups and scores | `src/data/season.ts`, the stage's `bracket` (see below) |
| News articles | add to `src/data/news.ts` (with `art`: an image from `public/art/` and its alt text) **and** create `src/content/news/<slug>.mdx` |
| Video links | `src/data/samples.ts` (`vods`) |

## Common jobs

**A stage finished:** set its `status: "completed"` and `winner: "<team-slug>"` in `stages`.

**A team qualified for Worlds:** in `teams.ts` add `qualified: "September Monthly Final winner"` to the team. In `season.ts`, change the matching `worldsSlots` entry from `{ kind: "tbd", … }` to `{ kind: "qualified", team: "<team-slug>", via: "…" }`.

**Fill a bracket:** brackets start empty from `doubleElim8()`. Build one and set team slugs and scores by match id (U1–U7, L1–L6, GF):

```ts
const lcq = doubleElim8();
lcq.upper[0].matches[0] = { ...lcq.upper[0].matches[0], a: "tribe-gaming", b: "cb7-esports", scoreA: 2, scoreB: 1 };
```

**Add a roster:** in `teams.ts`, give the team `players: [{ name: "Player", tag: "#2PP" }, …]`. The team page lists them. Find tags in-game under the player's name.

**Spoilers:** "Hide results" hides every winner, score and qualified team automatically. One thing to do by hand: if a news title names winners, also give it a `safeTitle` without the names (see `golden-tickets-so-far` in `news.ts`).

**New team:** add it to `teams` in `teams.ts` with a unique `slug`, a 2–3 letter `short` code and a `color`.

Tip: ask Claude "Read UPDATING.md, then mark the September final as won by X", and it will make the edits.

**Check your change:** `npm run build` then `npm run test:qa` (the same checks also run on GitHub after every push).
