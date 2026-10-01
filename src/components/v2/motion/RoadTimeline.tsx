"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Label } from "../Type";

export type RoadStop = { slug: string; name: string; date: string; state: "done" | "next" | "later"; note: string };

// Signature moment #3: on large screens the season timeline pins while you scroll and travels
// sideways stop by stop, with a bolt progress line. Pinned distance is capped (~1.5 screens) so it
// never traps. Phones and reduced motion get a plain vertical list.
export function RoadTimeline({ stops, label, title }: { stops: RoadStop[]; label?: string; title?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const t = track.current!;
        // The track is wider than the screen; measure against the visible frame, not the track itself
        // (a flex row inside a grid grows to its content, so its own clientWidth is not the viewport).
        const distance = () => Math.max(0, t.scrollWidth - wrap.current!.clientWidth);
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "center center",
            end: () => "+=" + Math.min(distance(), innerHeight * 1.5),
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: wrap.current, start: "center center", end: () => "+=" + Math.min(distance(), innerHeight * 1.5), scrub: 0.6 } });
        return () => {
          tween.scrollTrigger?.kill();
          ScrollTrigger.refresh();
        };
      });
      return () => mm.revert();
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className="grid gap-6 overflow-hidden py-4">
      {title ? (
        <div className="grid gap-3">
          {label ? <Label tone="bolt">{label}</Label> : null}
          <h2 className="font-cond text-h1 font-black uppercase text-bone">{title}</h2>
        </div>
      ) : null}
      <div className="relative h-px bg-rule">
        <div data-progress className="absolute inset-0 origin-left scale-x-100 bg-bolt" />
      </div>
      <ol ref={track} className="grid min-w-0 gap-3 lg:flex lg:w-max lg:gap-4">
        {stops.map((s, i) => (
          <li key={s.slug} className="lg:w-[22rem] lg:shrink-0">
            <Link
              href={`/stages/${s.slug}`}
              className={cn(
                "grid h-full gap-6 rounded-hair border p-5 transition-colors duration-300 ease-expo hover:border-steel",
                s.state === "next" ? "border-bolt/60 bg-[linear-gradient(180deg,#101a2b,var(--graphite))]" : "border-rule bg-graphite",
              )}
            >
              <div className="flex items-center justify-between">
                <Label tone={s.state === "next" ? "bolt" : "steel"}>{s.state === "done" ? "Done" : s.state === "next" ? "Next" : "Later"}</Label>
                <span className="font-data text-label text-steel tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="grid gap-2">
                <p className={cn("font-cond text-h3 font-black uppercase", s.state === "done" ? "text-steel" : "text-bone")}>{s.name}</p>
                <p className="font-data text-sm text-bone">{s.date}</p>
                <p className="text-sm text-steel">{s.note}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
