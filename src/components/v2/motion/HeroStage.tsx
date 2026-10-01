"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/motion";

// Signature moment #1: Town Hall 18 rises into the hero with one lightning "strike" of the bolt glow,
// then follows the mouse with a small, damped tilt (fine pointers only). The rise and strike are plain CSS
// (.hero-rise/.hero-strike) so they need no script; the image is never hidden, so it still paints first.
// Reduced motion: everything static.
export function HeroStage({ children, art = "/art/th18-cold.webp", artAlt = "Town Hall 18 (Supercell Fan Kit)" }: { children: ReactNode; art?: string; artAlt?: string }) {
  const stage = useRef<HTMLDivElement>(null);

  useMotion(stage, ({ gsap, MOTION_OK }) => {
    const mm = gsap.matchMedia();
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
  });

  return (
    <div ref={stage} className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div className="min-w-0">{children}</div>
      <div className="relative order-first mx-auto w-full max-w-[14rem] sm:max-w-[24rem] lg:max-w-[34rem] [perspective:900px] lg:order-none">
        <div aria-hidden className="hero-strike absolute inset-[14%_10%] -z-0 rounded-full bg-[radial-gradient(closest-side,rgba(91,155,255,0.45),transparent)] opacity-55 blur-2xl" />
        <div data-tilt className="relative [transform-style:preserve-3d]">
          <Image src={art} alt={artAlt} width={1400} height={1400} loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 34rem, (min-width: 640px) 24rem, 14rem" className="hero-rise relative h-auto w-full" />
        </div>
      </div>
    </div>
  );
}
