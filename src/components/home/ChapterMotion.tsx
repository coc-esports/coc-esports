"use client";

import { useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/motion";

// Scroll choreography for the home chapters (GSAP loads after the page is up; reduced motion = still page).
export function ChapterMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useMotion(root, ({ gsap, MOTION_OK }) => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const war = { trigger: "[data-war]", start: "top bottom", end: "bottom top", scrub: true } as const;
      const hasWar = !!root.current!.querySelector("[data-war]");
      // Key moment 2 (Town Hall 18): the render rises out of the war map while two giant lines cross.
      // Strong motion lives only in the three key moments (hero ticket, Town Hall, road); elsewhere just the reveal.
      if (hasWar) gsap.fromTo("[data-th]", { scale: 0.62, yPercent: 14 }, { scale: 1.05, yPercent: -6, ease: "none", scrollTrigger: war });
      if (hasWar) gsap.fromTo("[data-war-map]", { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: war });
      if (hasWar) gsap.fromTo("[data-line-a]", { xPercent: 8 }, { xPercent: -8, ease: "none", scrollTrigger: war });
      if (hasWar) gsap.fromTo("[data-line-b]", { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: war });

      // Professional touch on section titles: lines rise out of a mask as they enter.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((h) => {
        gsap.from(h.querySelectorAll(".reveal-line > span"), { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: h, start: "top 85%" } });
      });

      const track = root.current!.querySelector<HTMLElement>("[data-road-track]");
      const frame = root.current!.querySelector<HTMLElement>("[data-road]");
      if (track && frame) {
        const dist = () => Math.max(0, track.scrollWidth - frame.clientWidth);
        const tween = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: frame, start: "top top", end: () => "+=" + dist(), pin: true, pinSpacing: true, scrub: 0.6, invalidateOnRefresh: true } });
        // Key moment 3 (the road): each stub is dealt onto the table as it arrives.
        gsap.utils.toArray<HTMLElement>(".stub-card").forEach((card, i) => {
          gsap.fromTo(card, { rotate: i % 2 ? 5 : -5, y: 60 }, { rotate: 0, y: 0, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 100%", end: "left 65%", scrub: true } });
        });
        // Keyboard: focusing a stub that is off to the side scrolls the page to where it's in view.
        const onFocus = (e: FocusEvent) => {
          const st = tween.scrollTrigger;
          const card = (e.target as HTMLElement).closest("li");
          frame.scrollLeft = 0;
          if (!st || !card || dist() === 0) return;
          const right = card.getBoundingClientRect().right - track.getBoundingClientRect().left;
          const want = Math.min(1, Math.max(0, (right - frame.clientWidth + 32) / dist()));
          window.scrollTo({ top: st.start + want * (st.end - st.start), behavior: "instant" });
        };
        track.addEventListener("focusin", onFocus);
        return () => track.removeEventListener("focusin", onFocus);
      }
    });
    return () => mm.revert();
  });
  return <div ref={root}>{children}</div>;
}
