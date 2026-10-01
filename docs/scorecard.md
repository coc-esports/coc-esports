# Step 6 scorecard: Gildra v2 (2026-10-01)

Measured on a local production build (`next build` + `next start`). Lighthouse is the median of 3 runs, mobile, simulated throttling (the PageSpeed Insights method).

| Gate | Target | Result | What we fixed |
|---|---|---|---|
| Design critique | ≥ 32/40, no P0/P1 | **33/40**, no P0/P1 (Claude's review against the impeccable rubric; v1 scored 25/40) | Crowded ticket labels shortened, status tags no longer stretch, qualified teams in 3 columns |
| AI-slop audit | No generic defaults | **Pass**: one accent (bolt blue from official TH18 art), real fonts (no Inter/Anton), real copy and TBD states, no card-grid filler, no stock gradients | Gold-on-dark "esports template" look from v1 removed entirely |
| Lighthouse performance | ≥ 90 | **91–95** on all 5 audited pages | Fonts 156 → 89 KB; search loads on demand; GSAP and Lenis load after the page is up (and never on pages without effects, or Lenis on touch screens); hero rise moved to CSS |
| Lighthouse a11y / best practices / SEO | ≥ 95 / 100 / 100 | **100 / 100 / 100** everywhere | Ticket link label matched its visible text |
| LCP (lab, simulated slow 4G) | ≤ 2.5 s | **2.5–3.4 s** (/schedule 2.5, team 2.9, news 3.1, home 3.3, worlds 3.4). **Partly met.** In Chrome without throttling the main content paints at 0.43 s | Hero image now downloads at high priority. The rest is the framework's own JavaScript (React + Next, ~170 KB) on a simulated slow 4G link. Check real-visitor data after launch |
| CLS / TBT | ≤ 0.1 / low | **0.00** / 60–155 ms | — |
| Visual test | No overflow, taps ≥ 44 px, text ≥ 12 px | **0 problems**, 14 pages × phone + desktop | Nav, links and buttons raised to 44 px; 11 px labels raised |
| Keyboard & motion | Keyboard works, visible focus, reduced motion respected | **Pass**: skip link, blue ring on every control (none on mouse click), Ctrl+K search, Esc closes; reduced motion = fully still page | Search button had no visible ring: fixed |
| Contrast | AA | **Pass**: steel 6.2:1, bone 17.4:1, bolt 7.1:1 on ink | — |
| Security & privacy | Headers, no secrets, no trackers | **Pass**: CSP, HSTS, nosniff, frame and permissions policies, no `x-powered-by`; no keys in the browser bundle; 0 npm vulnerabilities; no analytics or cookies; privacy section on /about | — |
| Originality | Inspired, not copied | **Pass**: patterns from Riot/LoL Esports (schedule rows, spoiler switch), editorial references (Asili, SN2, The Romans) and broadcast graphics, rebuilt in our own code and words. Art is only official Fan Kit | — |
| Languages | Each language checked | English only (owner decision) | — |
| Content | No placeholders | **Pass**: real 2026 dates and winners with sources; unknowns shown as TBD/TBA | Invented "next matches" replaced by real event days |
| Legal | Disclaimer, no Clash/Supercell in brand, no money | **Pass**: footer disclaimer on every page | — |

Not yet done (Step 7): owner review of the preview link, LCQ results (Oct 10–11), then merge to `main` and launch.
