"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Lenis smooth scroll (PLAN.md §6 #2), driven by GSAP's ticker so ScrollTrigger stays in sync.
// Touch scrolling stays native; reduced-motion users get normal scrolling.
export function SmoothScroll() {
  useEffect(() => {
    // Web fonts change text heights; re-measure scroll positions once they're in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12, autoRaf: false, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
