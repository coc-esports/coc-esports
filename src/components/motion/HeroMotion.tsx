"use client";

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Hero scroll parallax (PLAN.md §6 #7). The entrance itself is pure CSS (.hero-line / [data-hero-intro]
// in globals.css) so it plays on first paint without waiting for JavaScript. That keeps LCP fast.
export function HeroMotion() {
  useGSAP(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-art]", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: scrub });
      gsap.fromTo("[data-hero-content]", { y: 0, opacity: 1 }, { y: -60, opacity: 0.15, ease: "none", scrollTrigger: scrub });
    });
    return () => mm.revert();
  });

  return null;
}
