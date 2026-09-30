"use client";

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Desktop only: pin Road to Worlds and move the stages sideways as you scroll (PLAN.md §6 #13).
// Phones keep the swipeable row.
export function RoadMotion() {
  useGSAP(() => {
    const section = document.getElementById("road-section");
    const track = section?.querySelector<HTMLElement>("[data-road-track]");
    const bar = section?.querySelector<HTMLElement>("[data-road-progress]");
    if (!section || !track || !bar) return;

    const mm = gsap.matchMedia();
    mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
      gsap.set(track, { overflow: "visible" });
      gsap.set(bar.parentElement, { display: "block" });

      // How far the row must slide so the last stage lands at the right edge.
      // Measured from rects: the track and its cards move together, so the transform cancels out.
      const distance = () => {
        const last = track.lastElementChild as HTMLElement | null;
        if (!last) return 0;
        const pad = parseFloat(getComputedStyle(track).paddingRight) || 0;
        const overflow = last.getBoundingClientRect().right - track.getBoundingClientRect().left + pad;
        return Math.max(0, overflow - track.clientWidth);
      };

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${distance()}`,
          pin: true,
          // <main> is a flex column, where GSAP turns pin spacing off by default; we need it on.
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
        },
      });
    });
    return () => mm.revert();
  });

  return null;
}
