"use client";

import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

// Hero entrance (PLAN.md §6 #1, #6) and scroll parallax (#7).
// The hero starts hidden via `.motion-ok [data-hero-hide]` in globals.css so it never flashes.
export function HeroMotion() {
  useGSAP(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const title = hero.querySelector("[data-hero-title]");
      const split = SplitText.create(title, { type: "lines", mask: "lines" });
      // Give each line mask a little room so the tall Anton capitals aren't clipped.
      gsap.set(split.masks, { paddingBlock: "0.08em", marginBlock: "-0.08em" });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .set(hero.querySelectorAll("[data-hero-hide]"), { visibility: "visible" })
        .from("[data-hero-art-inner]", { autoAlpha: 0, scale: 0.94, duration: 1.4, ease: "power3.out" }, 0)
        .from(split.lines, { yPercent: 110, duration: 1, stagger: 0.09 }, 0.1)
        .from(
          hero.querySelectorAll("[data-hero-intro]"),
          { autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          0.45,
        );

      const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-art]", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: scrub });
      // Plain opacity, not autoAlpha: autoAlpha would read the CSS-hidden start state as 0.
      gsap.fromTo("[data-hero-content]", { y: 0, opacity: 1 }, { y: -60, opacity: 0.15, ease: "none", scrollTrigger: scrub });

      return () => split.revert();
    });
    return () => mm.revert();
  });

  return null;
}
