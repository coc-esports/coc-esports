"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Signature moment #1: Town Hall 18 rises into the hero with one lightning "strike" of the bolt glow,
// then follows the mouse with a small, damped tilt (fine pointers only). The image is never hidden
// (only moved/scaled), so it still counts as the LCP immediately. Reduced motion: everything static.
export function HeroStage({ children, art = "/art/th18-cold.webp", artAlt = "Town Hall 18 (Supercell Fan Kit)" }: { children: ReactNode; art?: string; artAlt?: string }) {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-th]", { yPercent: 9, scale: 0.94, duration: 1.4 }, 0.15)
          .fromTo("[data-glow]", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1.08, duration: 0.18, ease: "power2.in" }, 0.55)
          .to("[data-glow]", { opacity: 0.55, scale: 1, duration: 1.2 }, ">");
      });
      mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
        const el = stage.current!.querySelector<HTMLElement>("[data-tilt]")!;
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3" });
        const x = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const px = e.clientX / innerWidth - 0.5;
          const py = e.clientY / innerHeight - 0.5;
          ry(px * 10);
          rx(-py * 6);
          x(px * 18);
        };
        addEventListener("pointermove", onMove);
        return () => removeEventListener("pointermove", onMove);
      });
      return () => mm.revert();
    },
    { scope: stage },
  );

  return (
    <div ref={stage} className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div className="min-w-0">{children}</div>
      <div className="relative order-first mx-auto w-full max-w-[34rem] [perspective:900px] lg:order-none">
        <div data-glow aria-hidden className="absolute inset-[14%_10%] -z-0 rounded-full bg-[radial-gradient(closest-side,rgba(91,155,255,0.45),transparent)] opacity-55 blur-2xl" />
        <div data-tilt className="relative [transform-style:preserve-3d]">
          <Image data-th src={art} alt={artAlt} width={1400} height={1400} priority sizes="(min-width: 1024px) 34rem, 90vw" className="relative h-auto w-full" />
        </div>
      </div>
    </div>
  );
}
