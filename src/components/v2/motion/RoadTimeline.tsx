"use client";

import Link from "next/link";
import { useRef } from "react";
import { useMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { HideResult } from "../HideResult";
import { Label } from "../Type";

export type RoadStop = { slug: string; name: string; date: string; state: "done" | "next" | "later"; note: string; spoiler?: boolean };

// Signature moment #3: on large screens the season timeline pins while you scroll and travels
// sideways stop by stop, with a bolt progress line. Pinned distance is capped (~0.9 screen) so it
// never traps. Phones and reduced motion get a plain vertical list.
export function RoadTimeline({ stops, label, title }: { stops: RoadStop[]; label?: string; title?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useMotion(wrap, ({ gsap, MOTION_OK, ScrollTrigger }) => {
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
          end: () => "+=" + Math.min(distance(), innerHeight * 0.9),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      // Keyboard users: tabbing to a card that is still off to the side scrolls the page to where it's in view.
      const onFocus = (e: FocusEvent) => {
        // The browser scrolls the clipped frame sideways to show a focused element; undo that, the pin moves the track.
        wrap.current!.scrollLeft = 0;
        const st = tween.scrollTrigger;
        const card = (e.target as HTMLElement).closest("li");
        if (!st || !card || distance() === 0) return;
        const cardRight = card.getBoundingClientRect().right - t.getBoundingClientRect().left; // position inside the track
        const want = Math.min(1, Math.max(0, (cardRight - wrap.current!.clientWidth) / distance()));
        if (Math.abs(want - st.progress) > 0.02) window.scrollTo({ top: st.start + want * (st.end - st.start), behavior: "instant" });
      };
      t.addEventListener("focusin", onFocus);
      gsap.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: wrap.current, start: "center center", end: () => "+=" + Math.min(distance(), innerHeight * 0.9), scrub: 0.6 } });
      return () => {
        t.removeEventListener("focusin", onFocus);
        tween.scrollTrigger?.kill();
        ScrollTrigger.refresh();
      };
    });
    return () => mm.revert();
  });

  return (
    <div ref={wrap} className="grid gap-6 overflow-hidden py-4">
      {title ? (
        <div className="grid gap-3">
          <h2 className="font-cond text-h1 font-black uppercase text-bone">{title}</h2>
          {label ? <Label>{label}</Label> : null}
        </div>
      ) : null}
      <div className="relative h-px bg-rule">
        <div data-progress className="absolute inset-0 origin-left scale-x-100 bg-bolt" />
      </div>
      <ol ref={track} data-scroll-track className="grid min-w-0 gap-3 lg:flex lg:w-max lg:gap-4">
        {stops.map((s, i) => (
          <li key={s.slug} className="lg:w-[24rem] lg:shrink-0">
            <Link
              href={`/stages/${s.slug}`}
              className={cn(
                "grid h-full content-between gap-6 rounded-hair border p-5 lg:min-h-[17rem] lg:p-6 transition-colors duration-300 ease-expo hover:border-steel",
                s.state === "next" ? "border-bolt/60 bg-[linear-gradient(180deg,#101a2b,var(--graphite))]" : "border-rule bg-graphite",
              )}
            >
              <div className="flex items-center justify-between">
                <Label tone={s.state === "next" ? "bolt" : "steel"}>{s.state === "done" ? "Done" : s.state === "next" ? "Next" : "Later"}</Label>
                <span className="font-data text-label text-steel tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="grid gap-2">
                <p className={cn("font-cond text-h2 font-black uppercase leading-none", s.state === "done" ? "text-steel" : "text-bone")}>{s.date}</p>
                <p className={cn("font-cond text-h3 font-black uppercase", s.state === "done" ? "text-steel" : "text-bone")}>{s.name}</p>
                <p className="text-sm text-steel">{s.spoiler ? <HideResult safe="Winner hidden">{s.note}</HideResult> : s.note}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
