"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Loaded on demand through loadMotion()/useMotion() in ./motion.ts, never imported directly by pages.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.6 });
  // Web fonts change text heights; re-measure scroll positions once they're in.
  document.fonts?.ready.then(() => {
    if (ScrollTrigger.getAll().length) ScrollTrigger.refresh();
  });
}

// Every GSAP effect runs inside gsap.matchMedia(MOTION_OK) so reduced-motion users get a still page.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger };
