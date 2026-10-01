# Motion prototype (Step 4 · phase 8)

Test bench: `/lab/motion` (noindex, removed before launch). Production build, measured on 2026-10-01 with Playwright + Chrome.
Phone = 412×915, touch, **CPU slowed 4×** (a mid-range Android). Laptop = 1440×900, normal CPU.

## Results
| Check | Laptop | Phone (4× slower) | Target | Pass |
|---|---|---|---|---|
| LCP (hero shows) | 0.43 s | 0.33 s | ≤ 2.5 s | ✓ |
| Layout shift (CLS) | 0 | 0 | ≤ 0.1 | ✓ |
| Frame time while scrolling (p95) | 7 ms | 7 ms | ≤ 16.7 ms | ✓ |
| Dropped frames while scrolling | 0.1 % | 0 % | < 5 % | ✓ |
| Long tasks (> 50 ms) | 0 | 3, longest 227 ms (during load) | none while scrolling | ✓ (load-time JS watched in Step 6) |
| Horizontal overflow | none | none | none | ✓ |
| Reduced motion | — | — | page complete and still | ✓ (claimed tickets shown directly) |

## The three moments
| # | Moment | Verdict | Notes for the build |
|---|---|---|---|
| 1 | **Hero:** TH18 rises, one lightning "strike" of glow, damped mouse tilt (mouse only); headline lines rise from masks | Keep | Image is never hidden, so it stays the LCP. No idle looping. |
| 2 | **Chosen Eight:** claimed seats turn over from "Open seat" to the team, one after another, when the row scrolls into view | Keep | Runs once. Without motion/JS the claimed side is shown. |
| 3 | **Road to Worlds:** pinned, travels sideways with a bolt progress line (desktop ≥ 1024 px); vertical list on phones | Keep, with a fix | **Bug found and fixed:** the track measured its own width, so it never moved; now measured against the visible frame (travel 1344 px). **For the build:** pin the whole section (title + track) and centre it vertically; keep pinned distance ≤ 1.5 screens. |
