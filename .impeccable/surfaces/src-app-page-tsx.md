---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/v3/V3Page.tsx"]
---

# Surface brief: Home (v3 world, applied site-wide after)

Scope: the home page first, then the same world on every page. Mode: Persuade (home), Operate (schedule, worlds standings), Read (news).
Audience: competitive Clash fans + curious players (PRODUCT.md). Job: know the next event, who plays, where to watch, and feel the Golden Ticket race.
Owner answers (2026-10-01): success = a "wow" in the first second; nothing must stay; wrong = template look, weak motion, copied from a reference. Owner delegated the direction: "use the best of everything we learned".
Constraints: Fan Kit art only; never invent results; free tools; no trackers; Lighthouse ≥ 90 kept by lazy-loading, not by cutting the idea.

## Direction contract
THESIS: Gildra is the will-call window for the World Finals. Every seat is a security-printed Golden Ticket; the season is the queue for eight of them. Refuses the category default (dark key-art hero + cards + neon accent).
OWN-WORLD: drenched royal-ultramarine ticket stock (#1b1580 → #0e0a4a) engraved with fine guilloche security rosettes; foil gold (real PBR metal in 3D, #e2b04a in 2D) only for won tickets; bone paper (#f2eee4) for reading sections; ink #12102e. Tanker display, Satoshi text, Geist Mono only for serials, seats and times. Components are ticket parts: stubs, perforations, seat boxes, serials, barcodes, validity bands. Square-cut corners with punched notches; no rounded cards.
STORY: the visitor sees one foil ticket and "three left", understands eight seats exist and which three are won, sees when and where to watch, then reads the season as ticket stubs and the war on Town Hall 18.
FIRST VIEWPORT: full-bleed ultramarine stock with guilloche; a real 3D foil ticket centred, tilting to the pointer with a holographic strip; "THREE TICKETS LEFT." in Tanker printed across the width behind it; bottom-left the event line and a big Geist Mono countdown in a "doors open" box; bottom-right the primary action "Where to watch" shaped as a tear-off stub; a live validity band (local time, event, date) runs along the bottom edge.
FORM: candidate 3 of 7 (Event ephemera: tickets, passes, security print), raised by: Struck Numerals (all 8 seats always present, open ones as ghosts), Live Tiles (printed fields are the controls), Daylight Section (local time as a live band), Signal Bench (one seat-number grid), plus War Map (TH18 war map as the cinematic scene) and Broadcast Blocks (whole colour fields). Seed key 84e747e6.
SIGNATURE INTERACTION: scroll tears the stub off the hero ticket along the perforation, then the camera pulls back to the seating chart of eight (foil = won, ghost = open). Motion grammar: expo-out entrances from already-visible states, one pinned 3D story, one horizontal stub road, word reveals on headlines; reduced motion = still frames.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
- LCQ projected field and roster source: owner answers pending ("Other" text did not arrive).
- 21st.dev components: available once the owner adds API_KEY_21ST.
