# Gildra rebuild: Plan (Step 3: sitemap, content, copy)

Status: **draft, waiting for owner approval** (2026-10-01). Facts come only from `src/data` (season.ts, teams.ts, news.ts); nothing invented. Anything unknown stays "TBA".

## Voice
Short, confident, broadcast-energy; facts first (ESL/The Romans attitude, Riot clarity). Examples: "Three tickets left." · "Eight teams. One weekend." · "The road to Worlds runs through here."
No hype words without facts ("legendary", "insane"), no fake quotes.

## Sitemap (9 pages + 404)
```
/                 Home (event-aware)
/worlds           World Championship 2026 hub
/schedule         Every match, grouped by day, your timezone, spoiler-free
/stages/[slug]    One event: format, schedule, bracket, results
/teams            All teams (poster grid)
/teams/[slug]     One team: ticket status, roster, results
/news, /news/[slug]   Articles
/watch            Where to watch live + video vault
/about            What Gildra is, sources, fan-content disclaimer
/404              Lost in the village
```
Removed: /leaderboards, /players/[tag] (old URLs redirect to /teams).

## Key journeys (must take ≤ 2 taps)
1. "When is the next match and where do I watch?" → Home hero (countdown + Watch live).
2. "Who has qualified for Worlds?" → Home "Golden Tickets" → /worlds.
3. "What happened in the LCQ?" → Home or /stages/lcq-2026 (results hidden until tapped).
4. "How does this even work?" → Home "How it works" → /news/how-worlds-2026-works.

## Global elements
- **Nav:** logo · Worlds · Schedule · Teams · News · Watch · one CTA "Watch live" (only shows when an event is live or within 24 h; otherwise "Add to calendar").
- **Spoiler switch** in the nav: hides every result and winner site-wide until turned off (remembered on this device).
- **Footer:** giant line "Follow the road to Worlds." + calendar subscribe + official broadcast links + Supercell disclaimer (readable size) + sources.

## Home (event-aware)
| # | Section | Content (real copy) | Data |
|---|---|---|---|
| 1 | **Hero** (event mode, until Oct 11) | Eyebrow "Last Chance Qualifier · Oct 10–11". Headline "THREE TICKETS LEFT." Line: "Eight teams. Double elimination. The top three go to Worlds." Countdown to Oct 10, 16:00 UTC (shown in the visitor's time). Buttons: "Watch live" (official channels) · "See the bracket" | season.nextEvent, lcq-2026 |
| 1b | Hero (normal mode, after LCQ) | "WORLD CHAMPIONSHIP 2026" · "$1,000,000. Eight teams. Town Hall 18." · next event + "Follow the road" | season |
| 2 | **Next up** | The next matches grouped by day, team marks, times in local time; "Full schedule →" | stages |
| 3 | **Golden Tickets** (the race to 8) | Headline "THE CHOSEN EIGHT" · 3 claimed: ZOOS Esports (June), Repotted Gaming (July), Vatic (August) · 5 open: September winner, China Regional champion, LCQ #1–3. Open slots show how they're won, not empty boxes | worldsSlots |
| 4 | **Road to Worlds** | Season timeline: June ✓ · July ✓ · August ✓ · September (winner TBC) · China Regional (TBA) · LCQ Oct 10–11 · World Finals (TBA); each step links to its stage | stages |
| 5 | **How it works** (for curious players) | "From 128 teams to one world champion." 3 steps: Monthly Qualifiers (128-team double elimination) → Golden Tickets (monthly winners, China champion, LCQ top 3) → World Finals (8 teams, $700,000). Link to the explainer | season, stages |
| 6 | **News** | 1 featured (latest) + 2 list items with date and category | news |
| 7 | **Watch** | "Watch it live" · official YouTube and Twitch, plus the latest VODs (click-to-load) | samples (vods) |
| 8 | Footer | (global) | site config |
Removed from the old home: the big-number band and the duplicate CTAs (critique findings).

## Worlds (/worlds)
Hero "WORLD CHAMPIONSHIP 2026" + prize $1,000,000 ($700,000 at the finals) · Golden Tickets (8 slots, full detail) · World Finals bracket (TBD until set) · How teams qualify · Rules (Esports Mode 5v5, timers, tiebreaks, rosters) · Sources.

## Schedule (/schedule)
Filter by stage · matches grouped by day · local times · add any event to the calendar (.ics, existing route) · results hidden when the spoiler switch is on.

## Stage (/stages/[slug])
Header (name, dates, prize, status) · format in one paragraph · schedule (Ladder/Qualifier/Final or Day 1/Day 2) · bracket (double-elimination, spoiler-aware) · winner (when confirmed; September shows "winner not yet confirmed here") · VODs.

## Teams (/teams) and Team (/teams/[slug])
Grid of tall team cards ordered by season rank: rank, name, points, Golden Ticket badge (if qualified). Team page: ticket status and how it was earned, season rank and points, roster names (no live stats), results, links. Card → page uses a shared-element transition.

## News, Watch, About, 404
News: featured + list; article pages from MDX. Watch: official channels + vault. About: what Gildra is, that it's unofficial, the data sources (Clash Worlds tracker, Liquipedia CC-BY-SA), the disclaimer. 404: "You've wandered off the war map." + back home (a Fan Kit Goblin if available).

## SEO (per page)
Home "Clash of Clans World Championship 2026: schedule, teams, results" · Worlds "CoC World Championship 2026 qualified teams" · Schedule "Clash of Clans esports schedule" · LCQ "Clash of Clans Last Chance Qualifier 2026" · Teams "Clash of Clans esports teams 2026". JSON-LD SportsEvent for stages; OG image per page (existing generator, restyled).

## Asset list
| Asset | Source | Who | When |
|---|---|---|---|
| Event key art (hero), characters for sections, 404 Goblin | **Supercell Fan Kit** | Owner downloads | Before Step 4 |
| Gildra logo + favicon | We design (`logo-design`) | Claude | Step 4 |
| Team marks | Our own monogram system (no third-party logos without permission) | Claude | Step 4 |
| Textures (stone, gold metal) if the direction uses them | Poly Haven / ambientCG (CC0) | Claude | Step 4 |
| Photography of players/events | None licensed, so **not used** | — | — |
