"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Counts a number up from 0 when it scrolls into view (PLAN.md §6 #16).
// Keeps any prefix/suffix, e.g. "$1,000,000" or "TH18". Server HTML always shows the final value.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const match = value.match(/^(\D*)([\d,]+)(\D*)$/);
      if (!el || !match) return;
      const [, prefix, digits, suffix] = match;
      const target = Number(digits.replace(/,/g, ""));

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        const state = { n: 0 };
        const render = () => {
          el.textContent = `${prefix}${Math.round(state.n).toLocaleString("en-US")}${suffix}`;
        };
        render();
        gsap.to(state, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: render,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
        return () => {
          el.textContent = value;
        };
      });
      return () => mm.revert();
    },
    { dependencies: [value] },
  );

  return <span ref={ref}>{value}</span>;
}
