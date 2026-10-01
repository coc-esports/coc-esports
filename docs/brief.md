# Gildra rebuild: Brief (Step 1: Understand)

Status: **approved by the owner** (2026-10-01)

## What it is
Gildra is a fan-made hub for **Clash of Clans esports**: World Championship 2026, monthly qualifiers, the Last Chance Qualifier (LCQ), teams, pro players, ladders, news and videos. It's unofficial and follows the Supercell Fan Content Policy.

## Why we're rebuilding
The current live site (coc-esports.vercel.app) works, but the design critique scored it **25/40**: a generic "dark esports template", gold overused, empty placeholder art, repeated sections, small text and tap targets. We're rebuilding the design from scratch using everything learned on 2026-10-01: the premium web principles, 17 studied award sites, the owner's taste, and the new skills.
The data, content files and page logic that already work (teams, stages, brackets, news, live-data code) are kept and reused.

## Audience
1. **Competitive CoC fans** who follow the pro scene: want dates, brackets, results, teams, where to watch.
2. **Curious players** who've heard about Worlds: need a quick "what is this and how does it work".

## The one main action
**Follow the next event**: see when it is, who's playing, and watch it live.
During event weeks (LCQ Oct 10–11) the home page leads with the countdown and the Golden Ticket race.

## Pages (9, public site)
Home · Worlds · Schedule · Stages (each event) · Teams · Team page · News (list + article) · Watch · About.
Removed from the public site: **Leaderboards** and **Player pages** (live game data needs a paid server; owner chose free-only). Team pages keep their rosters from our own data, with no live stats.

## Languages
English only.

## Look and feel
- Must feel like a **premium esports broadcast and editorial brand**, not a template.
- The owner's taste: bold condensed type, editorial, photography- and art-led, restrained colour (The Romans, SN2, Asili).
- First reference: **Riot Games**: key-art hero, featured news + list, tall cards per game/team, one accent colour.
- Previous direction picks (Gilded War Table, 3D Golden Ticket and so on) are **reconsidered** in Step 4 against the new research.

## Hard rules
- Supercell Fan Content Policy: no "Clash"/"Supercell" in the brand or domain; no money from visitors; the disclaimer is visible in the footer; characters only from the **official Fan Kit**, never redrawn or AI-generated.
- Free tools only. No trackers. Privacy first.
- Never invent results, scores or quotes; use TBD states and cite sources.

## Success measures
- Design critique ≥ **32/40** (was 25).
- Lighthouse mobile ≥ 90 in all four categories; LCP ≤ 2.5 s; no layout shift.
- A visitor can find "when is the next match and where do I watch" in **under 5 seconds**.

## Timing
- The **current site stays live for the LCQ (Oct 10–11)**; we only update its results there.
- The rebuild runs through the full plan without rushing, and launches **after the LCQ**.

## Assets
- The owner will download the **Supercell Fan Kit** (fankit.supercell.com) and share the folder path. It's needed by Step 4 (Design).

## Scope (Step 1, phase 1)
| In | Out |
|---|---|
| 9 pages above, rebuilt design system, new logo, event-aware home | Live game data pages (leaderboards, players) |
| Up to 3 signature "wow" moments (chosen in Step 4) | Arabic version |
| Existing data/content reused (teams, stages, brackets, news MDX) | Ads, donations, any money from visitors |
| Speed, accessibility, security and originality gates | Paid tools, paid hosting, trackers |
