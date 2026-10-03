---
name: Gildra
description: "Will Call: the Clash of Clans esports season printed as security-engraved Golden Tickets on royal-ultramarine stock."
colors:
  ink: "#0d0a3d"
  graphite: "#1b1580"
  plate: "#251ea3"
  rule: "#3a33b0"
  steel: "#bdb8f2"
  bone: "#f5f2ff"
  bolt: "#a8a2ff"
  foil: "#e8b64c"
  foil-deep: "#8a5d10"
  bolt-ink: "#0d0a3d"
  paper: "#f2eee4"
  paper-ink: "#12102e"
  paper-ink-2: "#4a4670"
  signal-live: "#ff5a4a"
  signal-win: "#5ff0a0"
typography:
  display:
    fontFamily: "Tanker, Arial Black, sans-serif"
    fontSize: "clamp(4rem, 2rem + 9vw, 9.5rem)"
    fontWeight: 400
    lineHeight: 0.82
    letterSpacing: "-0.01em"
  hero:
    fontFamily: "Tanker, Arial Black, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 6vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.85
  headline:
    fontFamily: "Tanker, Arial Black, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.9
  title:
    fontFamily: "Tanker, Arial Black, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)"
    fontWeight: 400
    lineHeight: 0.95
  title-sm:
    fontFamily: "Tanker, Arial Black, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1
  lead:
    fontFamily: "Satoshi, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Satoshi, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "Satoshi, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.08em"
  data-countdown:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "\"tnum\" 1"
rounded:
  none: "0px"
  hair: "2px"
spacing:
  gutter-sm: "16px"
  gutter: "32px"
  section: "64px"
  section-lg: "80px"
  chapter: "96px"
  nav-h: "72px"
  page-max: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.bolt}"
    textColor: "{colors.ink}"
  button-outline:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-outline-hover:
    textColor: "{colors.bolt}"
  link-action:
    textColor: "{colors.bone}"
    typography: "{typography.action}"
    height: "44px"
  link-action-hover:
    textColor: "{colors.bolt}"
  status-tag:
    textColor: "{colors.steel}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: "0 10px"
    height: "28px"
  status-tag-ticket:
    textColor: "{colors.foil}"
  ticket-field:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
  ticket-card-open:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.steel}"
    rounded: "{rounded.hair}"
    padding: "16px"
  ticket-card-claimed:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.bone}"
    rounded: "{rounded.hair}"
    padding: "16px"
  stub-card:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "24px"
    width: "min(78vw, 22rem)"
    height: "min(26rem, 58svh)"
  nav-link:
    textColor: "{colors.steel}"
    height: "44px"
  nav-link-active:
    textColor: "{colors.bone}"
  broadcast-pass:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    width: "240px"
---

# Design System: Gildra

## Overview

**Creative North Star: "The Will-Call Window"**

Gildra is the window where you collect your seat for the World Finals. Every surface is ticket stock: a drenched royal ultramarine engraved with fine guilloche security rosettes, cut into stubs, perforations, punched printed fields, serials, barcodes and validity bands. The season is the queue for eight Golden Tickets, so the one precious material, foil gold, exists only on tickets a team has actually won. Everything else is ultramarine, a pale lavender "halo", and bone.

The world is dense with type and almost empty of chrome. Giant one-weight condensed capitals (Tanker) carry every heading, a calm grotesk (Satoshi) carries reading text, and a mono (Geist Mono) is reserved for the printed data of a ticket: serials, seat numbers, times, dates. Long-form reading moves onto bone paper through a perforated edge, so news and About read like the printed programme tucked inside the ticket wallet.

Motion is concentrated, not sprinkled. Three key moments carry strong 3D or pinned scroll (the hero ticket story, the Town Hall 18 war chapter, the road of stubs); everywhere else the touches are refined: headline lines rising out of masks, stubs tilting on hover, a validity band drifting along an edge. Every one of them has a still, complete reduced-motion version. The world refuses the category default of a dark key-art hero, cards and a neon accent.

**Key Characteristics:**
- Drenched ultramarine ticket stock with guilloche security print as the ground of every page.
- Foil gold is a state, not a colour: it means "Golden Ticket won".
- Components are ticket parts: notched stubs, perforations, punched fields, serials, barcodes.
- Tanker capitals at extreme scale; Geist Mono only for printed data.
- Bone paper reading mode entered through a perforated edge.
- Strong motion in three key moments only; every effect has a still version.

## Colors

A near-monochrome ultramarine field lit by one cool lavender halo, with foil gold held back for the single thing the season is about.

### Primary
- **Halo Lavender** (`bolt`, #a8a2ff): the accent of the world. Links and their underlines, the keyboard focus ring, the "now / next" state, the stressed word in a headline ("left.", "Town Hall 18"), the hover fill of the primary stub, the caret and text selection. 8.2:1 on ink.

### Secondary
- **Foil Gold** (`foil`, #e8b64c): Golden Tickets that have been won, and nothing else: the claimed ticket card, the "Golden Ticket" status tag, an accented fact. In 3D it is a real PBR conductor (metalness 1), not a flat yellow.
- **Deep Foil** (`foil-deep`, #8a5d10): foil text on paper, where the bright foil fails contrast.

### Tertiary
- **Live Red** (`signal-live`, #ff5a4a): the LIVE dot and border only.
- **Win Green** (`signal-win`, #5ff0a0): bracket wins only.

### Neutral
- **Ticket Ink** (`ink`, #0d0a3d): page ground; also the text colour on halo, foil and bone fills (`bolt-ink`).
- **Ticket Stock** (`graphite`, #1b1580): raised surfaces, open ticket cards, stubs.
- **Pressed Stock** (`plate`, #251ea3): hover and pressed stock; the translucent open seats in 3D.
- **Engraved Hairline** (`rule`, #3a33b0): every border, divider, perforation dash and the inset outline of printed fields.
- **Mist** (`steel`, #bdb8f2): secondary text, labels, open-seat text. 10.0:1 on ink.
- **Bone** (`bone`, #f5f2ff): primary text, the primary stub button, broadcast passes.
- **Programme Paper** (`paper`, #f2eee4), **Paper Ink** (`paper-ink`, #12102e), **Paper Ink Secondary** (`paper-ink-2`, #4a4670): the reading mode.

### Named Rules
**The Won-Only Foil Rule.** Foil gold appears only on a Golden Ticket that a team has won. Never on buttons, headings, decoration or "premium" emphasis. If nothing on the screen has been won, nothing on the screen is gold.

**The Halo Accent Rule.** Every accent (links, focus, now/next, stressed headline words) uses the halo lavender. There is no second accent hue; red and green are signals, not accents.

**The Paper Remap Rule.** Reading surfaces (news list, articles, About) wrap in the paper mode, which redefines the shared token names in place: ink becomes paper (#f2eee4), graphite #e8e2d4, plate #ddd5c5, rule #cbc2ae, steel #4a4670, bone #12102e, bolt #1b1580, foil #74500c, bolt-ink #f2eee4. Components never get a paper variant of their own; they read the remapped tokens.

## Typography

**Display Font:** Tanker (with Arial Black, sans-serif), Fontshare, one weight (400), self-hosted at build.
**Body Font:** Satoshi variable 300–900 (with Segoe UI, system-ui), Fontshare, upright only.
**Label/Mono Font:** Geist Mono 400/500 (with ui-monospace), self-hosted by next/font.

**Character:** Tanker is the stencil-cut voice of a printed ticket, used at sizes where it becomes architecture; Satoshi stays calm and legible underneath it; Geist Mono is the numbering machine that stamps serials and times.

### Hierarchy
- **Display** (400, clamp(4rem, 2rem + 9vw, 9.5rem), 0.82, -0.01em, uppercase): the largest page statements. The home hero pushes this further, to clamp(4.25rem, 17.5vw, 17rem), printed across the width behind the 3D ticket.
- **Hero** (400, clamp(3rem, 1.6rem + 6vw, 7rem), 0.85, uppercase): inner page titles.
- **Headline** (400, clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem), 0.9, uppercase): section titles.
- **Title** (400, clamp(2rem, 1.5rem + 2vw, 3rem), 0.95) and **Title small** (400, 1.75rem, 1): card titles, facts values, match names.
- **Lead** (400, 1.125rem, 1.5): intros, max 40–62ch.
- **Body** (400, 1rem, 1.5): reading text; nothing below 16px.
- **Action** (700, 0.875rem, 0.12em, uppercase): the stub button and chapter links. Inline buttons and nav use 600, 0.8125rem, 0.08em.
- **Label** (400, 0.75rem, 1.2, 0.08em, uppercase, mono): dates, times, serials, seat numbers, status; never smaller than 12px.
- **Data countdown** (500 mono, clamp(2rem, 4vw, 3.25rem), tabular figures): the "doors open" countdown.

### Named Rules
**The One Weight Rule.** Tanker ships a single weight and `font-synthesis` is off site-wide. Never set Tanker bold or italic, and never set italic Satoshi; emphasis in a display line is colour (halo) or an outline stroke, not weight.

**The Info Line Under Rule.** Headings carry themselves. The facts line (category, date, stage) sits under the title, never as a label above it.

**The Printed Data Rule.** Geist Mono is only for what a ticket would print: serials, seats, times, dates, statuses. Never for prose or headings.

## Layout

Pages sit in a 1280px container (`page-max`) with 16px side gutters on phones and 32px from `sm` up; full-bleed chapters align their content to the same column with `max(2rem, (100vw - 80rem) / 2 + 2rem)`. Standard sections breathe 64px top and bottom (80px from `sm`), home chapters 96px or 16vh. The fixed header is 72px (`nav-h`) and every hero offsets its content by it. Scale contrast does the work instead of boxes: a giant headline, a short lead, and one printed field or row of stubs. Layouts collapse to one column on phones; the horizontal stub road becomes a native scroll-snap row when motion is reduced. Tap targets are at least 44px.

## Elevation & Depth

The 2D world is flat ticket stock: depth comes from tonal stock layers (ink, graphite, plate), engraved inset hairlines and printed guilloche, not from shadows. Real depth is reserved for 3D (the foil ticket and the seating chart of eight in React Three Fiber) and for the few physical objects lifted off the page.

### Shadow Vocabulary
- **Engraved inset** (`box-shadow: inset 0 0 0 1px var(--rule)`): the printed outline of ticket fields and row tickets; becomes `inset 0 0 0 2px var(--bolt)` on keyboard focus within.
- **Lifted pass** (`box-shadow: 0 30px 60px -28px rgba(5,3,30,0.95)`): broadcast passes, the only 2D object that hovers.
- **Object drop** (`filter: drop-shadow(0 50px 90px rgba(5,3,30,0.7))`): the Town Hall 18 render rising out of the war map.

### Named Rules
**The Flat Stock Rule.** Ticket stock is flat. A shadow appears only under a physical object (a pass, a Fan Kit render), never under a card or a section.

## Shapes

Square-cut corners with punched notches; no rounded cards. Shapes are cut with CSS masks, not drawn: tear-off stubs notched on both sides at mid-height (8px radius), stub cards notched at the tear line above a 5rem stub (12px), claimed tickets notched at the "Golden Ticket" row with a dashed foil perforation (0.55rem), printed fields with all four corners punched (9px), row tickets punched where the date stub meets the body (10px, from 768px up), and a perforated scalloped edge (7px circles every 22px) wherever stock meets paper. A 2px hair radius is allowed only on small chips, tags and wrappers. The only round elements are the LIVE dot and the lanyard slot on a pass.

**The Mask-Cut Rule.** Because masks clip everything outside the shape, focus rings on cut shapes are drawn inside them (negative outline offset), never outside.

## Components

### Buttons
Tactile ticket parts; one primary action per view.
- **Shape:** square, notched on both sides (mask, 8px notches), 52px tall.
- **Primary (tear-off stub):** bone card stock with ink text, Satoshi 700, 0.875rem, 0.12em, uppercase, 28px side padding. Bone, not foil: foil is kept for won tickets.
- **Hover / Focus:** lifts 2px and tilts -1.5deg while the fill turns halo lavender (300ms expo-out); keyboard ring is 2px ink inset at -7px.
- **Outline:** 48px engraved hairline field on translucent ink, bone text; border and text turn halo on hover.
- **Text link:** bone uppercase action text with a 2px halo underline at 6px offset; turns halo on hover.

### Chips (Status tags)
- **Style:** 28px tall, hair radius, 1px border, mono label text.
- **State:** shown in form as well as colour: Live has a pulsing red dot; Upcoming and Final are solid hairline in mist; Open seat and TBD are dashed; Golden Ticket is a foil border with foil text.

### Cards / Containers
- **Ticket card (one of eight seats):** tall poster proportion (3:4.2, 5:4 from `lg`), always eight present. Open seats are ghosts: dashed hairline on stock, mist text saying how the seat will be won. Claimed seats are cut like a real ticket with a foil-tinted stock gradient, foil border and serial `0N/08`.
- **Printed field:** translucent ink inside an engraved inset hairline with four punched corners; holds the countdown and event line.
- **Stub card (season road):** stock card with a dashed tear line and a 5rem stub carrying `No. 0N · GLD-2026` and Played / Next / Later. Next is lit halo, played is muted.
- **Broadcast pass:** bone credential with a lanyard slot, giant Tanker channel name, ink footer with serial and barcode; tilts -2deg and rises on hover.

### Navigation
Fixed 72px header, transparent over heroes, gaining a frosted ink backdrop (82% ink, 12px blur) once scrolled; hides on scroll down. Links are Satoshi 600 uppercase in mist, turning bone on hover with a 2px halo underline that grows from the left; the current page keeps its underline. The "Hide results" switch and the primary stub live at the right; phones get a full-screen sheet whose links rise in sequence.

### Golden Ticket (signature, 3D)
A real foil ticket in React Three Fiber: metalness 1 gold under a dim studio of bright softbox cards, an iridescent holographic strip, a perforated stub with the seat number. Scroll tears the stub along the perforation, then the camera pulls back to the seating chart of eight (foil = won, translucent stock with halo edges = open). It boots only after the page is idle (about 3.5s plus idle callback) or on the first interaction, adapts resolution (dpr 1.5 down to 1), stops rendering off-screen, and draws one still frame under reduced motion. A screen-reader list states every seat in text.

### Hide Results
Any result (winner, score, "Admitted" stamp, team on a claimed seat, even the 3D labels) is wrapped so the site-wide "Hide results" switch can replace it before first paint with a neutral version ("Ticket claimed", "Winner hidden"); per-match scores get a Reveal button.

## Do's and Don'ts

### Do:
- **Do** keep foil gold (#e8b64c) for won Golden Tickets only; use deep foil (#8a5d10) when gold text sits on paper.
- **Do** make the primary action the bone tear-off stub, one per view, turning halo on hover.
- **Do** use the halo lavender (#a8a2ff) for every accent: links, focus, now/next, stressed headline words.
- **Do** wrap news, articles and About in the paper reading mode, entered through a perforated edge, and let components read the remapped tokens.
- **Do** put info lines (category, date, stage) under titles.
- **Do** reserve strong 3D and pinned motion for the three key moments (hero ticket story, Town Hall 18 chapter, road of stubs) and use refined touches elsewhere (masked headline reveals with expo-out `cubic-bezier(0.16, 1, 0.3, 1)`, stub and pass hovers).
- **Do** give every effect a reduced-motion version: one still 3D frame, no pins, the road as a scroll-snap row.
- **Do** boot 3D after idle or the first interaction, so first paint and first tap never wait on WebGL.
- **Do** wrap every result in Hide Results (HideResult or the Spoiler switch).
- **Do** cut shapes with notches and perforations; square corners otherwise.

### Don't:
- **Don't** use foil gold on buttons, headings, borders or decoration.
- **Don't** set Tanker bold or italic, or turn `font-synthesis` back on.
- **Don't** put a label or kicker above a heading.
- **Don't** use rounded cards or soft pill shapes; the 2px hair radius is for small tags only.
- **Don't** add shadows under cards or sections; only physical objects (passes, Fan Kit renders) cast them.
- **Don't** add a second accent hue; red is LIVE only, green is bracket wins only.
- **Don't** add strong motion outside the three key moments, or any animation without a still version.
- **Don't** show a result anywhere without the Hide Results wrapper.
