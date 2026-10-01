# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Competitive Clash of Clans fans** who follow the pro scene. Job: know when the next event is, who is playing, the brackets and results, and where to watch it live.
2. **Curious players** who have heard about the World Championship. Job: understand quickly what it is and how teams qualify.

(Confirmed by the owner, 2026-10-01.)

## Product Purpose

Gildra is an unofficial, fan-made hub for Clash of Clans esports: the 2026 World Championship, the Monthly Finals, the China Regional, the Last Chance Qualifier, teams, news and broadcasts. The one main action is **follow the next event**: when it is, who is playing, and where to watch.

Success: a visitor finds "when is the next match and where do I watch" in under 5 seconds; the site feels like a premium broadcast brand, not a template.

## Positioning

Confirmed by the owner (2026-10-01) as Gildra's real edge:
- **One place for everything:** every stage in the visitor's own time zone, add-to-calendar for each event, and direct links to the official streams.
- **Design and experience:** a broadcast-level site, built with more care than the official channels and the wikis.

Supporting features (built, not the headline): a site-wide "Hide results" switch for people who watch later, and sourced data with TBD states instead of guesses.

## Operating Context

- Event rhythm: Monthly Finals (June–September 2026), the China Regional (dates TBA), the Last Chance Qualifier (Oct 10–11, 2026), the World Finals (dates TBA). During event weeks the home page leads with the countdown and the Golden Ticket race.
- Matches stream on the official Clash of Clans YouTube and Twitch channels; Gildra links to them and never re-streams.
- Content is edited by the owner (a beginner) in `src/data` and `src/content/news`, guided by `UPDATING.md`.

## Capabilities and Constraints

- Pages: Home, Worlds, Schedule (with stage detail pages), Teams, team pages, News (list and articles), Watch, About, 404.
- English only. No live game data (leaderboards and player pages were removed: they need paid hosting).
- Stack: Next.js 16 App Router, Tailwind v4, GSAP + Lenis (loaded on demand), React Three Fiber for 3D (prototype). Hosting: Vercel (free tier).
- Free tools only; no paid services, subscriptions or credits.
- No trackers, no cookies, no analytics; strict security headers (CSP).
- Undecided: whether to show a projected LCQ field before the official list, and where team rosters come from.

## Brand Commitments

- Name: **Gildra** (from "gild"). Never "Clash" or "Supercell" in the brand or domain.
- Supercell Fan Content Policy: no money from visitors; the Supercell disclaimer is visible in the footer of every page; characters and art only from the **official Supercell Fan Kit**, never redrawn or AI-generated.
- Voice: short, factual, broadcast energy ("Three tickets left.", "Off the war map.").
- The **Golden Ticket** is the season's central idea (eight seats at the World Finals).

## Evidence on Hand

- Real 2026 season data with sources: stage dates, Monthly Final winners (ZOOS Esports, Repotted Gaming, Vatic), top-11 standings, rules (`src/data/season.ts`, `src/data/teams.ts`; sources: Clash Worlds tracker, Liquipedia CC-BY-SA).
- Three news articles (`src/content/news`).
- Official Fan Kit art: Town Hall 18 renders (warm, cold, front), TH18 war map, hero characters (King, Queen, Warden, Royal Champion), Goblin, Legend League badge, loading-screen key art (`public/art`, originals in `C:\Users\User\References\gildra-fankit`).
- Absent and never to be fabricated: team logos, player photos, rosters (not yet sourced), quotes, testimonials, viewer numbers, the September Final winner (pending), LCQ field and seeding, World Finals dates.

## Product Principles

1. The next event comes first: when, who, where to watch.
2. Never invent: every result has a source; unknowns are TBD.
3. Respect the fan's time and privacy: local times, calendar, hide results, no tracking.
4. Official and honest: fan-made, clearly unofficial, official art only.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard use with a visible focus ring (none on mouse click), 44 px tap targets, text ≥ 12 px, contrast AA, a reduced-motion version of every animation, and text equivalents for anything shown only in 3D.
