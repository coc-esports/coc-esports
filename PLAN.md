# Clash Esports Hub — Research & Master Plan

> A Riot-Games-quality **fan-made** esports & events site for Clash of Clans.
> Owner: you (beginner, directing Claude). Stack chosen for a beginner who wants a pro result.
> Research date: 2026-09-30.

---

## 0. The one-page summary

| Decision | Choice | Why |
|---|---|---|
| Site type | Esports & events hub (World Championship, monthly qualifiers, teams, pro players, live ladders) | Clear focus, clear pages, fits the Riot layout well |
| Framework | **Next.js (App Router) + TypeScript** | What most award-winning React sites use; free hosting on Vercel |
| Styling | **Tailwind CSS** + design tokens (CSS variables) | Fast, consistent, beginner-friendly with Claude |
| Motion | **GSAP + ScrollTrigger + SplitText** (all free since 2025), **Lenis** smooth scroll, **View Transitions** for page changes | The standard "award-site" motion stack |
| Carousels | **Embla Carousel** | Light, touch/drag, scroll-snap |
| Brackets | **@g-loot/react-tournament-brackets** (restyled) or a custom SVG bracket later | Double-elimination is what CoC Worlds uses |
| Esports content | Hand-entered **JSON/MDX files** first → **Sanity CMS** later | Tournament data is *not* in the official game API |
| Live game data | **Official Clash of Clans API** via `clashofclans.js`, called **only from the server**, with caching | Pro player cards, Legend League ladder, pro clans' wars |
| Hosting | **Vercel** (site) + a small fixed-IP server for the API proxy (phase 4) | API keys are locked to IP addresses |
| Legal | Follow **Supercell Fan Content Policy** | Non-negotiable, see §2 |

---

## 1. Research: what makes riotgames.com feel "pro"

Structure (in page order) of riotgames.com/en today:

1. **Skip links** ("Jump to main content") → accessibility baseline.
2. **Global "Riot bar"** → a slim top bar that's the same on every Riot site, with a games mega-menu.
3. **Full-bleed hero** → one big event (currently *VALORANT Champions*), date range, one CTA ("Watch now").
4. **Secondary hero / promo** → a music release with character art.
5. **"What's happening?" news grid** → one big card + smaller cards, "See more".
6. **Games carousel** → horizontal product cards with platform icons.
7. **Esports & entertainment cards** → strong brand tiles linking out.
8. **Careers banner** → a big-number stat ("168 open positions · 24 offices").
9. **Footer** → company/legal links, socials, rating/legal logos.
10. **Image CDN** (`/darkroom/`) serves responsive sizes (500→1400px).

**The design principles behind it (what to copy in spirit, not in look):**

- **One message per screen.** Each band has one headline and one action.
- **Huge art, little text.** Key art does the storytelling and the UI stays out of the way.
- **Strict type scale.** Very large condensed uppercase headings, small calm body text.
- **Mostly dark and neutral, with one accent colour.** Riot uses red; we'll use **Clash gold**.
- **Motion is short and purposeful.** Hover zooms, fade-ups and slide-ins, never a show-off.
- **Consistent cards.** Every card has the same radius, the same hover and the same meta line (category · date).

> ⚠️ Take the *principles*, not Riot's logo, red, fonts or layout pixel-for-pixel. It must look like a Clash site, not a Riot clone.

**Direct competitor/reference studied:** `worlds.competitiveclash.network`, an unofficial CoC Worlds tracker. It has: Schedule, Stats, Standings, Rulebook, ⌘K search, "The Chosen Eight" qualified-teams grid (x / 8 announced), a points leaderboard, a "Road to Glory" timeline with countdown, VOD vault, ICS calendar export, RSS. **Our edge:** Riot-level visual polish + live player/clan data + better motion and mobile.

---

## 2. Legal ground rules (read before anything else)

From the **Supercell Fan Content Policy** (supercell.com/en/fan-content-policy):

- ✅ You may use Supercell assets (use the official **Fan Kit** at fankit.supercell.com) to display and discuss their games.
- ❌ **No money** from visitors without Supercell approval. That means no paywalls or paid features. (Check the policy yourself before adding ads or donations.)
- ❌ **Your domain name and social handles can't contain Supercell trademarks.** So no "clashofclans-esports.com" and no "clash…" domain. Pick a neutral brand (ideas: *TH18 Arena*, *WarRoom GG*, *Triple Star Hub*).
- ✅ **Show this text in a readable size in the footer:** *"This material is not official and is not approved by Supercell. For more information see Supercell's Fan Content Policy."*
- ❌ Don't use Supercell's own fonts (Supercell Magic etc.) unless the Fan Kit includes them with permission. Use Google Fonts (see §4).
- Liquipedia data (if used) is **CC-BY-SA 3.0** → you must credit it. Their DB API needs an approved key and allows only **60 requests/hour**. No scraping of their HTML pages.

---

## 3. What CoC esports looks like in 2026 (the content you'll model)

- **World Championship 2026:** $1,000,000 prize pool, played on **Town Hall 18**.
- **Monthly season (Jun–Sep):** Ladder → **Monthly Qualifier** (double elimination) → **Monthly Final**. $220k across Monthly Finals.
- **China Regional Qualifier** (separate path).
- **Last Chance Qualifier (LCQ):** 3 teams advance, $80k. Upcoming ~Oct 10, 2026.
- **World Finals:** **8 teams, double-elimination bracket**, $700k.
- Broadcasts: official Clash of Clans **YouTube & Twitch**.

**Data model** (this is your "database" even while it's just JSON files):

```
Season      { year, name, prizePool, stages[] }
Stage       { slug, name, type: ladder|qualifier|final|lcq|worlds, start, end, status, prize, bracketId }
Team        { slug, name, logo, region, socials, clanTag (links to live API), roster: PlayerRef[] }
PlayerRef   { name, playerTag (live API), role, country, photo }
Match       { id, stageSlug, round, teamA, teamB, scoreA, scoreB, stars/destruction, vodUrl, startTime, state }
Bracket     { id, type: double-elim, matches[] }
Article     { slug, title, category, date, heroImage, body (MDX) }
Video       { title, youtubeId, stageSlug, day }
```

---

## 4. Design system (build this FIRST — it's what makes everything consistent)

**Mood:** "a war-room at night". Dark stone and charcoal, lit by gold and elixir-purple. Chunky and confident like the game, disciplined like Riot.

**Color tokens** (CSS variables in `globals.css`):

| Token | Value (start point) | Use |
|---|---|---|
| `--bg` | `#0E0F13` | page background |
| `--surface` | `#17191F` | cards |
| `--surface-2` | `#20232B` | hovered cards, menus |
| `--line` | `#2C303A` | borders |
| `--text` | `#F4F1EA` | main text (warm white) |
| `--muted` | `#A3A7B3` | meta text |
| `--gold` | `#F5B82E` | **primary accent** (CTAs, live, winners) |
| `--elixir` | `#B04CE8` | secondary accent (stats, tags) |
| `--dark-elixir` | `#3B2A5A` | gradients |
| `--danger/live` | `#E8453C` | LIVE badge only |

Rule: gold is scarce. Use it on at most one CTA plus the LIVE badge per screen.

**Type** (Google Fonts, free):
- Display: **Anton** or **Bebas Neue** (tall, condensed, uppercase, esports-feel), *or* **Lilita One** if you want the rounder Supercell vibe. Pick one after seeing both in the hero.
- Body/UI: **Inter** (or **Manrope**).
- Numbers/scores: Inter with `font-variant-numeric: tabular-nums` so scores don't jiggle.
- Scale: 14 / 16 / 20 / 28 / 40 / 64 / 96 px (fluid with `clamp()`).

**Other tokens:** 8px spacing grid · radius 4px (sharp esports feel) or 12px (softer, Clash feel), pick one · 12-column grid, 1280px max width, 16px mobile gutter · shadows are almost none (use surface colors instead).

**Core components** (build once, reuse everywhere):
`Button` (primary/ghost) · `Badge` (LIVE / UPCOMING / COMPLETED / QUALIFIED) · `NewsCard` (large/small) · `TeamCard` · `PlayerCard` · `MatchRow` · `Countdown` · `SectionHeader` (title + "See all") · `Carousel` · `Bracket` · `StatTile` · `NavBar` + `MegaMenu` · `MobileMenu` · `Footer` · `VideoEmbed` (click-to-load).

---

## 5. Sitemap

```
/                     Home (Riot-style bands)
/schedule             All matches, filter by stage, add-to-calendar (.ics)
/worlds               World Championship hub: Chosen Eight, bracket, prize pool
/stages/[slug]        One qualifier/final: bracket + results + VODs
/teams                Team grid
/teams/[slug]         Team page: roster (live player cards), results, clan war log (live)
/players/[tag]        Pro player profile (LIVE from API: TH, heroes, trophies, league)
/leaderboards         Legend League global ladder (LIVE, cached)
/news  /news/[slug]   Articles (MDX)
/watch                Live Twitch/YouTube embed + VOD vault
/about                What this is + Supercell disclaimer + credits (Liquipedia)
```

**Home page bands (mirrors the Riot rhythm):**
1. Nav bar (logo · Worlds · Schedule · Teams · Leaderboards · Watch · News · search).
2. **Hero:** "WORLD CHAMPIONSHIP 2026". Looping muted key-art video, date, countdown, "Watch live" / "See bracket".
3. **Live/next strip:** the next 3 matches with countdowns (turns into a LIVE badge).
4. **"The Chosen Eight":** 8 team slots filling up (qualified vs TBD).
5. **"What's happening?":** news grid (1 big + 4 small).
6. **Road to Worlds:** pinned horizontal timeline of stages (scroll-driven).
7. **Live Legend Ladder:** top 10 players (API), "See full ladder".
8. **From the Vault:** VOD carousel.
9. Big-number band: "$1,000,000 · 8 teams · TH18".
10. Footer with disclaimer.

---

## 6. Every transition and interaction: how to build each one

Global motion rules: **enter 400–700ms, hover 150–250ms, exit shorter than enter.** Default ease `power3.out` (GSAP) / `cubic-bezier(.2,.8,.2,1)`. Animate **only `transform` and `opacity`** (plus `clip-path`) for 60fps. Every effect has a **`prefers-reduced-motion`** fallback (no movement, just fade or nothing).

| # | Effect | Where | How (tool + recipe) |
|---|---|---|---|
| 1 | **Intro reveal** | first visit only | GSAP timeline: logo `clip-path` wipe → hero text. ≤1.2s, skippable, stored in `sessionStorage` so it doesn't repeat |
| 2 | **Smooth scroll** | whole site | Lenis, wired to GSAP's ticker so ScrollTrigger stays in sync. Disabled for reduced-motion |
| 3 | **Hide-on-scroll nav** | NavBar | Scroll down → `translateY(-100%)`, scroll up → back. Background goes from transparent to blurred `--bg` after 80px |
| 4 | **Mega-menu** | "Worlds" / "Teams" hover | Panel fades + slides 8px; items stagger 30ms. Opens on hover **and** click/Enter; Esc closes; focus trapped |
| 5 | **Mobile menu** | < 768px | Full-screen overlay, links stagger up; body scroll locked |
| 6 | **Hero headline** | Home/Worlds | GSAP **SplitText** by line/char, `yPercent: 100 → 0` inside an overflow-hidden mask, stagger 0.03 |
| 7 | **Hero parallax** | hero art | ScrollTrigger `scrub`: video scales 1 → 1.1 and darkens as you scroll away |
| 8 | **Hero video** | hero | `<video autoplay muted loop playsinline poster=…>`, ≤3MB MP4/WebM, poster = LCP image. Pause when off-screen |
| 9 | **CTA shine** | primary button | Pseudo-element gradient sweeps across on hover (CSS `@keyframes`, 600ms) + 0.98 scale on press |
| 10 | **Card hover** | news/team/VOD cards | Image `scale(1.05)` in 400ms, gradient overlay deepens, title underline grows from left (`scaleX` 0→1). Same on `:focus-visible` |
| 11 | **Scroll reveal** | every section | `ScrollTrigger.batch`: items fade + rise 24px, stagger 0.08, once only |
| 12 | **Carousels** | games-style rows, VODs | Embla: drag, snap, arrow buttons, progress bar; peeking next card on mobile |
| 13 | **Pinned timeline** | Road to Worlds | ScrollTrigger `pin: true`, horizontal `x` tween scrubbed; stage dots fill gold as passed. **Mobile:** vertical list, no pin |
| 14 | **Bracket draw-in** | /worlds, /stages | SVG connector paths animate `stroke-dashoffset` when in view; hovering a team highlights its whole path, dims others |
| 15 | **Countdown** | hero, match rows | Digits flip/slide on change (CSS transform per digit); switches to pulsing **LIVE** badge at start time |
| 16 | **Number count-up** | $1,000,000 band, stats | GSAP tween on a number object, `tabular-nums`, runs once in view |
| 17 | **Page transitions** | route changes | **View Transitions API** (Next.js support / `next-view-transitions`): cross-fade by default; **card → detail morph** by giving the card image and the detail hero the same `view-transition-name` |
| 18 | **Skeleton loading** | live API blocks | Shimmer skeletons shaped like the final card; never spinners |
| 19 | **Live data update** | ladder, war score | Changed rows flash gold background 600ms; rank arrows ▲▼ |
| 20 | **⌘K search** | global | Command palette (`cmdk` library): teams, players, stages |

---

## 7. Live data: how the Clash of Clans API fits in

**Facts found:**
- Official API: developer.clashofclans.com. Sign in with Supercell ID → create a key → **the key only works from the IP addresses you list.**
- Must be called **from a server**, never from the browser (you'd leak the key, and browser IPs vary).
- The API has **no esports/tournament data.** It has players, clans, current war, war log, CWL, leagues, and **rankings (incl. Legend League)**. So brackets/results = your own JSON/CMS.
- Good libraries: **`clashofclans.js`** (clashofclans.js.org, 100% API coverage, supports email/password login that creates keys for the current IP), `coc.supercell` (TS types).
- Community proxies exist (RoyaleAPI runs one for Clash Royale; a CoC one may exist). **Unverified.** Check the RoyaleAPI docs yourself before relying on it.

**What we'll use it for:**
- `/players/[tag]` → Pro player card: TH level, heroes, trophies, league, war stars.
- `/teams/[slug]` → team's clan: members, war log, current war score.
- `/leaderboards` → global Legend League top 200.

**Architecture (recommended path for a beginner):**

```
Browser ──► Next.js on Vercel (server components / route handlers)
                │  fetch with cache: revalidate 60–300s
                ▼
        Small API proxy on a FIXED-IP server  ──►  api.clashofclans.com
        (tiny Node/Express app, key whitelisted to this IP)
```

- **Phase A (local dev):** create a key for your home IP and call the API from Next.js on your own PC. Fastest way to learn.
- **Phase B (production):** Vercel's outgoing IPs change, so put a ~15-line proxy on a cheap server with a static IP (e.g. a $4–6/month VPS from Hetzner, DigitalOcean etc.). Whitelist that IP. Protect the proxy with a secret header.
- **Cache hard:** ladder every 5 min, player profiles every 10 min, war data every 1–2 min. That keeps it fast and polite.
- Keys live in **`.env.local`** / Vercel env vars. **Never commit them to GitHub.**

---

## 8. Performance, accessibility and SEO targets (the "pro" checklist)

- **Lighthouse ≥ 90** on all four categories, mobile.
- **LCP < 2.5s:** hero poster image preloaded, served as AVIF/WebP via `next/image`, with a sized `sizes` attribute.
- Video lazy-loaded, **YouTube/Twitch embeds click-to-load** (a thumbnail first saves ~1MB per embed).
- Fonts via `next/font` (self-hosted, no layout shift).
- **Accessibility:** WCAG AA contrast (gold on dark passes; check muted text), full keyboard navigation, skip link, visible focus rings, alt text, reduced-motion.
- **SEO:** per-page metadata + Open Graph images, `sitemap.xml`, JSON-LD `SportsEvent` for matches.

---

## 9. The build roadmap (phases, with what you learn each time)

Estimated at ~6–10 hrs/week, working with Claude. Every phase ends with something visible and deployed.

### Phase 0: Setup (week 1)
- Install **Node.js LTS**, **Git**, a **GitHub** account, **Vercel** account (sign in with GitHub).
- Pick the **brand name** (no "Clash"/"Supercell" in it) and download the **Supercell Fan Kit**.
- Create the Next.js project in `C:\Users\User\coc-esports`, push to GitHub, connect to Vercel → a live URL on day 1.
- 🎓 Learn: terminal basics, `npm run dev`, what a commit is.

### Phase 1: Design system + shell (weeks 2–3)
- Tokens (colors, fonts, spacing) → `Button`, `Badge`, `SectionHeader`, `NavBar` (+ mobile menu), `Footer` with disclaimer.
- A `/styleguide` page showing every component (your personal mini Storybook).
- 🎓 Learn: components, props, Tailwind classes, CSS variables.

### Phase 2: Static home page (weeks 3–5)
- All 10 home bands with **fake JSON data**. No motion yet, just perfect layout on mobile + desktop.
- Collect/prepare art from the Fan Kit (export WebP/AVIF, consistent crops).
- 🎓 Learn: layout (grid/flex), responsive design, images.

### Phase 3: Motion pass (weeks 5–6)
- Add effects #1–#16 from §6, one at a time, each with a reduced-motion fallback.
- 🎓 Learn: GSAP timelines, ScrollTrigger, why only transform/opacity.

### Phase 4: Esports content (weeks 6–8)
- JSON/MDX for the 2026 season: stages, the 8 teams, matches, VODs, 5 real news posts.
- Pages: `/worlds`, `/stages/[slug]`, `/teams`, `/teams/[slug]`, `/schedule` (+ .ics export), `/news`, `/watch`.
- Bracket component (restyled library first).
- 🎓 Learn: dynamic routes, data modelling, MDX.

### Phase 5: Live API (weeks 8–10)
- Local key → `/players/[tag]`, `/leaderboards`, team clan wars, all with skeletons + caching.
- Then the fixed-IP proxy for production.
- 🎓 Learn: server vs client, env variables, caching, APIs.

### Phase 6: Page transitions + polish (weeks 10–11)
- View Transitions (card → detail morph), ⌘K search, live-row flash, 404 page, OG images.

### Phase 7: QA + launch (week 12)
- Lighthouse, accessibility audit, real-phone testing, SEO, custom domain, analytics (Vercel Analytics).
- *Optional later:* move content into **Sanity CMS** so you can edit news without code.

---

## 10. How to manage this with Claude (maximum output, minimum chaos)

1. **One feature per session.** "Build the NewsCard component with hover per PLAN.md §6 #10." Small, testable asks beat "build the home page".
2. **Always point Claude at this file.** Start sessions with: *"Read PLAN.md. We're in Phase X, task Y."* Also create a **`CLAUDE.md`** in the project (run `/init`) with the stack, tokens and rules.
3. **Show, don't describe.** Paste screenshots of references (Riot sections, Worlds tracker) and of your current result when something looks off.
4. **Commit after every working step.** If something breaks, you can go back. Ask Claude to "commit this with a clear message."
5. **Check on your phone every phase** (Vercel gives a preview URL for every push).
6. **Use the specialist skills at the right time** (type these in Claude Code):
   - Phase 1–2 design: `/design-taste-frontend`, `/impeccable`, `/emil-design-eng`
   - Phase 3 motion: `/animate`, `/find-animation-opportunities`, `/improve-animations`
   - Phase 2+ mobile: `/mobile-native`
   - Phase 7: `/accessibility-review`, `/seo-audit`, `/code-review`, `/performance-report`
7. **Keep a `DONE.md` log** (date + what shipped). Great motivation, great portfolio story.
8. **Don't** add a feature before the previous phase is deployed and looks right on mobile.

---

## 11. Shopping list (what you'll need)

**Software (free):** Node.js LTS · Git · VS Code (you have it) · GitHub · Vercel · Figma (optional, for moodboards) · Squoosh (image compression) · HandBrake (video compression).

**npm packages:** `next` `react` `typescript` `tailwindcss` · `gsap` `@gsap/react` · `lenis` · `embla-carousel-react` · `@g-loot/react-tournament-brackets` · `clashofclans.js` · `cmdk` · `next-view-transitions` (or Next's built-in View Transitions) · `@next/mdx` · `ics` (calendar files) · `zod` (validate your JSON data).

**Assets:** Supercell Fan Kit art & logos · your own brand logo (simple wordmark) · 1 hero loop video (cut from Fan Kit trailer material if permitted, or animated key art) · team logos (ask teams or use Liquipedia with credit).

**Money:** $0 until Phase 5 production → ~$5/month VPS for the API proxy + ~$10–15/year domain.

---

## 12. Sources & repos to study

**References**
- Riot Games home: https://www.riotgames.com/en
- Unofficial CoC Worlds tracker: https://worlds.competitiveclash.network/
- CoC World Championship 2026 roadmap: https://www.appspy.com/clash-of-clans/supercell-reveals-the-roadmap-to-clash-of-clans-world-championship-2026/
- Liquipedia CoC Worlds 2026: https://liquipedia.net/clashofclans/Clash_of_Clans_World_Championship/2026/September
- Awwwards: Riot "Star Guardian" (motion inspiration): https://www.awwwards.com/inspiration/thumbnail-riot-games-star-guardian

**Rules**
- Supercell Fan Content Policy: https://supercell.com/en/fan-content-policy/
- Liquipedia API terms: https://liquipedia.net/api-terms-of-use

**GitHub / libraries**
- clashofclans.js: https://clashofclans.js.org/ (guide: /guide)
- coc.supercell (TS): https://npmjs.com/package/coc.supercell
- CoC static data (troops/buildings): https://github.com/chiefpansancolt/clash-of-clans-data/
- Clash assets (check licence): https://www.github.com/Statscell
- Tournament brackets: https://github.com/g-loot/react-tournament-brackets
- next-view-transitions: https://github.com/shuding/next-view-transitions
- Next.js View Transitions guide: https://nextjs.org/docs/app/guides/view-transitions
- GSAP page transitions in Next (TweenPages): https://github.com/adamjw3/TweenPages
- GSAP vs Motion (when to use which): https://www.hontran.dev/blog/gsap-vs-framer-motion
- Next.js + GSAP + Lenis setup: https://www.hontran.dev/blog/nextjs-smooth-scroll-gsap-lenis
- r/nextjs "best scroll animation" thread (mirror): https://lr.sudovanilla.org/r/nextjs/comments/1f8xyh3/best_scroll_animation
- Sanity + Next.js template (for Phase 7+): https://vercel.com/templates/cms/sanity-next-js-personal-website

**Research gaps (be aware):** the official esports site (esports.clashofclans.com) was down (502) during research. Riot's current front-end libraries couldn't be confirmed from the outside, so the motion recipes above are the industry-standard way to get that feel, not a copy of Riot's code. Reddit search returned few direct threads; most useful community knowledge came from dev blogs and GitHub.
