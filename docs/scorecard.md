# Scorecard: Gildra v3 "Will Call" (updated 2026-10-03)

(v2 numbers kept below where they still apply; v3 rows updated.)

Measured on a local production build (`next build` + `next start`). Lighthouse is the median of 3 runs, mobile, simulated throttling (the PageSpeed Insights method).

| Gate | Target | Result | What we fixed |
|---|---|---|---|
| Design review | ≥ 32/40 | **32/40 met** (formal impeccable critique, 2026-10-03). History: v1 25 → v2 28/28/27 → v3 29 → 30 → **32** | Instant ticket poster, stakes headline, hint placement, one primary CTA, unseeded bracket format card, schedule chips, Watch next-broadcast card, single close |
| AI-slop audit | No generic defaults | **Pass**: one accent (bolt blue from official TH18 art), real fonts (no Inter/Anton), real copy and TBD states, no card-grid filler, no stock gradients | Gold-on-dark "esports template" look from v1 removed entirely |
| Lighthouse performance | ≥ 90 | **Home 78** (with the real 3D hero; was 57 before the boot fix) · inner pages **90–94** | 3D boots after idle (~3.5 s) or on first interaction; seat grid and its 3D text built on demand; lighter environment map; no bloom on phones; no italic font download |
| Lighthouse a11y / best practices / SEO | ≥ 95 / 100 / 100 | **100 / 100 / 100** everywhere | Ticket link label matched its visible text |
| LCP (lab, simulated slow 4G) | ≤ 2.5 s | **3.1–3.7 s**. Not met | New display/text fonts (Tanker, Satoshi) and the engraved background. Next lever: a poster image of the ticket and font subsetting is not allowed by the Fontshare licence, so consider preloading only Tanker |
| CLS / TBT | ≤ 0.1 / low | CLS ≤ 0.06 · TBT home 0.45 s, inner 35–100 ms | Font preload; 3D deferred |
| Visual test | 5 sizes, overflow, taps, text, on-screen controls | **104/104 pass** incl. hide-results, keyboard road, 3D smoke test and a pinned-story distance test | Pin-spacing bug (story had zero scroll distance) found by the review captures and fixed |
| Keyboard & motion | Keyboard works, visible focus, reduced motion respected | **Pass**: skip link, blue ring on every control (none on mouse click), Ctrl+K search, Esc closes; reduced motion = fully still page | Search button had no visible ring: fixed |
| Contrast | AA | **Pass**: steel 6.2:1, bone 17.4:1, bolt 7.1:1 on ink | — |
| Security & privacy | Headers, no secrets, no trackers | **Pass**: CSP, HSTS, nosniff, frame and permissions policies, no `x-powered-by`; no keys in the browser bundle; 0 npm vulnerabilities; no analytics or cookies; privacy section on /about | — |
| Originality | Inspired, not copied | **Pass**: patterns from Riot/LoL Esports (schedule rows, spoiler switch), editorial references (Asili, SN2, The Romans) and broadcast graphics, rebuilt in our own code and words. Art is only official Fan Kit | — |
| Languages | Each language checked | English only (owner decision) | — |
| Content | No placeholders | **Pass**: real 2026 dates and winners with sources; unknowns shown as TBD/TBA | Invented "next matches" replaced by real event days |
| Legal | Disclaimer, no Clash/Supercell in brand, no money | **Pass**: footer disclaimer on every page | — |

Not yet done (Step 7): owner review of the preview link, LCQ results (Oct 10–11), then merge to `main` and launch.
