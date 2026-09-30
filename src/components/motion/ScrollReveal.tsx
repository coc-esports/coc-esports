"use client";

import { usePathname } from "next/navigation";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Fade + rise for every [data-reveal] element as it scrolls into view (PLAN.md §6 #11).
// Elements already on screen at load are left alone, so nothing flickers.
export function ScrollReveal() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const els = gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
        if (!els.length) return;

        gsap.set(els, { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(els, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, overwrite: true }),
        });
      });
      return () => mm.revert();
    },
    { dependencies: [pathname] },
  );

  return null;
}
