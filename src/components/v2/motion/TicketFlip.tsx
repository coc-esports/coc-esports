"use client";

import { useRef } from "react";
import { useMotion } from "@/lib/motion";
import { TicketCard, type TicketCardProps } from "../TicketCard";

// Signature moment #2: when The Chosen Eight scrolls into view, each claimed seat turns over
// from its "open seat" side to the team that won it, one after another. Without motion (or JS)
// the claimed side is simply shown: the page is complete at rest.
export function TicketFlip({ seats }: { seats: TicketCardProps[] }) {
  const root = useRef<HTMLDivElement>(null);

  useMotion(root, ({ gsap, MOTION_OK }) => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const flips = gsap.utils.toArray<HTMLElement>("[data-flip]");
      if (!flips.length) return;
      // The won side is what renders by default (print, no-JS, fast scroll); the flip starts from the open side
      // only when the cards actually scroll into view.
      gsap.fromTo(flips, { rotationY: 180 }, {
        immediateRender: false,
        rotationY: 0,
        duration: 1.1,
        ease: "expo.inOut",
        stagger: 0.16,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    });
    return () => mm.revert();
  });

  return (
    <div ref={root} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {seats.map((s) =>
        s.state === "claimed" ? (
          <div key={s.seat} className="[perspective:1000px]">
            <div data-flip className="relative [transform-style:preserve-3d]">
              <div className="[backface-visibility:hidden]">
                <TicketCard {...s} />
              </div>
              <div aria-hidden className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <TicketCard state="open" seat={s.seat} via={s.via} when="Up for grabs" />
              </div>
            </div>
          </div>
        ) : (
          <TicketCard key={s.seat} {...s} />
        ),
      )}
    </div>
  );
}
