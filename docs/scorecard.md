# Step 6 scorecard: Gildra v2 (2026-10-01)

Measured on a local production build (`next build` + `next start`). Lighthouse is the median of 3 runs, mobile, simulated throttling (the PageSpeed Insights method).

| Gate | Target | Result | What we fixed |
|---|---|---|---|
| Design critique | ≥ 32/40, no P0/P1 | **Not met: 28 → 28 → 27/40** over three formal impeccable rounds (two independent reviewers + detector each; v1 was 25). P0 count 1 → 0. Reports in `.impeccable/critique/` | Fixed: phone menu, site-wide hide results, phone zoom-out, date order, labels above headings, Golden Ticket foil + ticket cut, colour meaning, bracket fit, contrast, art on headers. Remaining P1s are structure/content decisions for the owner (see docs/NEXT.md) |
| AI-slop audit | No generic defaults | **Pass**: one accent (bolt blue from official TH18 art), real fonts (no Inter/Anton), real copy and TBD states, no card-grid filler, no stock gradients | Gold-on-dark "esports template" look from v1 removed entirely |
| Lighthouse performance | ≥ 90 | **94–98** on all 5 audited pages (was 91–95) | Fonts 156 → 89 KB; search loads on demand; GSAP and Lenis load after the page is up (never on pages without effects, Lenis never on touch); hero rise in CSS; body font preloaded |
| Lighthouse a11y / best practices / SEO | ≥ 95 / 100 / 100 | **100 / 100 / 100** everywhere | Ticket link label matched its visible text |
| LCP (lab, simulated slow 4G) | ≤ 2.5 s | **2.4–3.1 s** (team 2.4, news 2.7, worlds 2.8, schedule 2.8, home 3.1). **Partly met.** In Chrome without throttling the main content paints at about 0.4 s | Hero image at high priority; body font preloaded (its late swap was delaying LCP). The rest is the framework's own JavaScript on a simulated slow 4G link |
| CLS / TBT | ≤ 0.1 / low | **0.00** / 35–58 ms | A font swap re-wrapped lines (CLS 0.05): fixed by preloading the body font |
| Visual test | 5 sizes, no overflow, taps ≥ 44 px, text ≥ 12 px, controls on screen | **112/112 pass** (`tests/qa.spec.ts`: 14 pages × 5 sizes, controls-on-screen, hide-results on 7 pages, keyboard timeline), runs automatically on every push | Breadcrumb and table links to 44 px; off-screen phone menu button fixed and now tested |
| Keyboard & motion | Keyboard works, visible focus, reduced motion respected | **Pass**: skip link, blue ring on every control (none on mouse click), Ctrl+K search, Esc closes; reduced motion = fully still page | Search button had no visible ring: fixed |
| Contrast | AA | **Pass**: steel 6.2:1, bone 17.4:1, bolt 7.1:1 on ink | — |
| Security & privacy | Headers, no secrets, no trackers | **Pass**: CSP, HSTS, nosniff, frame and permissions policies, no `x-powered-by`; no keys in the browser bundle; 0 npm vulnerabilities; no analytics or cookies; privacy section on /about | — |
| Originality | Inspired, not copied | **Pass**: patterns from Riot/LoL Esports (schedule rows, spoiler switch), editorial references (Asili, SN2, The Romans) and broadcast graphics, rebuilt in our own code and words. Art is only official Fan Kit | — |
| Languages | Each language checked | English only (owner decision) | — |
| Content | No placeholders | **Pass**: real 2026 dates and winners with sources; unknowns shown as TBD/TBA | Invented "next matches" replaced by real event days |
| Legal | Disclaimer, no Clash/Supercell in brand, no money | **Pass**: footer disclaimer on every page | — |

Not yet done (Step 7): owner review of the preview link, LCQ results (Oct 10–11), then merge to `main` and launch.
