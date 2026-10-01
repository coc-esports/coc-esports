"use client";

import { useEffect } from "react";
import { loadMotion } from "@/lib/motion";

// Lenis smooth scroll (PLAN.md §6 #2), driven by GSAP's ticker so ScrollTrigger stays in sync.
// Mouse/trackpad only and loaded after the page is up: touch screens keep native scrolling and never
// download it. Reduced-motion users get normal scrolling.
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)").matches) return;

    let stop = () => {};
    let cancelled = false;
    Promise.all([loadMotion(), import("lenis"), import("lenis/dist/lenis.css")]).then(([{ gsap, ScrollTrigger }, { default: Lenis }]) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.12, autoRaf: false, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      stop = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  return null;
}
