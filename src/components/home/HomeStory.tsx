"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HideResult } from "@/components/v2/HideResult";
import { useSpoilers } from "@/components/v2/Spoilers";
import { useMotion } from "@/lib/motion";
import { pointer, story } from "./store";
import type { SceneSeat } from "./HeroScene";

// Home hero, "Will Call" (surface brief: .impeccable/surfaces/src-app-page-tsx.md).
// Where each idea comes from: 3D object hero (basement.studio) + the 3D Golden Ticket the owner approved;
// giant type behind the object (The Romans, Exo Ape); pinned scroll story (The Romans, Awwwards scroll worlds);
// all seats always present with open ones as ghosts (Struck Numerals);
// local time as a live validity band (Daylight Section).
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

export type HeroData = {
  seats: SceneSeat[];
  event: { name: string; dateLabel: string; startTime: string; href: string };
  claimed: number;
  // Tickets on offer at the next event (3 at the LCQ), or null when the next event awards none.
  stakes: number | null;
};

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return now;
}

// First visit only: a short counter (Immersive Garden / Obys) that also covers the 3D warming up.
function Intro({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem("gildra-intro") === "1" || matchMedia("(prefers-reduced-motion: reduce)").matches;
      sessionStorage.setItem("gildra-intro", "1");
    } catch {
      skip = true;
    }
    if (skip) {
      onDone();
      return;
    }
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 700);
      setN(Math.round(k * 8));
      if (k < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setLeaving(true), 120);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return (
    <div
      aria-hidden
      onTransitionEnd={onDone}
      className="fixed inset-0 z-[60] flex items-end justify-between bg-ink p-6 transition-[clip-path] duration-[650ms] ease-expo sm:p-10"
      style={{ clipPath: leaving ? "inset(0 0 100% 0)" : "inset(0 0 0 0)" }}
    >
      <div className="guilloche-rosette absolute left-1/2 top-1/2 size-[min(115vmin,1100px)] -translate-x-1/2 -translate-y-1/2" />
      <span className="relative font-data text-label uppercase text-steel">Seats at the World Finals</span>
      <span className="relative font-cond text-[clamp(8rem,30vw,22rem)] leading-[0.8] tabular-nums text-bone">
        {String(n).padStart(2, "0")}
        <span className="text-bolt">/08</span>
      </span>
    </div>
  );
}

const spell = (n: number) => ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"][n] ?? String(n);

export function HomeStory({ data }: { data: HeroData }) {
  const { hide } = useSpoilers();
  const [intro, setIntro] = useState(true);
  const [sceneOn, setSceneOn] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [still, setStill] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const now = useNow();
  const open = 8 - data.claimed;

  // "Hide results" also covers the 3D: won seats keep their foil but not the team's name.
  const seats = useMemo(() => (hide ? data.seats.map((s) => (s.claimed ? { ...s, title: "Ticket claimed", sub: s.sub.replace(/ winner$/i, "") } : s)) : data.seats), [hide, data.seats]);

  const t = new Date(data.event.startTime).getTime();
  const left = now === null ? null : Math.max(0, Math.floor((t - now) / 1000));
  const parts = left === null ? null : { d: Math.floor(left / 86400), h: Math.floor((left % 86400) / 3600), m: Math.floor((left % 3600) / 60), s: left % 60 };
  const local = now === null ? null : new Date(t).toLocaleString(undefined, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    let ok = false;
    try {
      ok = !!document.createElement("canvas").getContext("webgl2");
    } catch {}
    if (!ok) return;
    // The 3D starts once the page has loaded and the main thread is idle, or on the first interaction,
    // whichever comes first: the first paint and first tap never wait on WebGL.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setStill(matchMedia("(prefers-reduced-motion: reduce)").matches);
      setSceneOn(true);
    };
    // Otherwise it starts after the page has been quiet for a moment (~3.5 s): the headline, countdown and actions are
    // already there, so the ticket fades in without ever competing with the first paint or the first tap.
    const idle = () => setTimeout(() => (typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(start, { timeout: 2000 }) : start()), 3500) as unknown as number;
    let id = 0;
    if (document.readyState === "complete") id = idle();
    else addEventListener("load", () => void (id = idle()), { once: true });
    for (const ev of ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"]) addEventListener(ev, start, { once: true, passive: true });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX / innerWidth - 0.5;
      pointer.y = e.clientY / innerHeight - 0.5;
    };
    addEventListener("pointermove", onMove);
    return () => {
      clearTimeout(id);
      for (const ev of ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"]) removeEventListener(ev, start);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useMotion(hero, ({ gsap, MOTION_OK }) => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        // pinSpacing must be explicit: GSAP turns it off by default when the pinned element's parent is a flex
        // container (the layout's <main> wrapper is), which collapsed the whole story to zero scroll distance.
        scrollTrigger: { trigger: hero.current, start: "top top", end: "+=250%", pin: true, pinSpacing: true, scrub: 0.8, onUpdate: (self) => void (story.p = self.progress) },
      });
      tl.to("[data-act1]", { yPercent: -16, opacity: 0, duration: 0.14 }, 0.16)
        .to("[data-hero-ui]", { opacity: 0, y: 24, duration: 0.12 }, 0.22)
        .fromTo("[data-act2]", { opacity: 0, yPercent: 18 }, { opacity: 1, yPercent: 0, duration: 0.16 }, 0.46)
        .to({}, { duration: 0.24 });
    });
    return () => mm.revert();
  });

  return (
    <>
      {intro ? <Intro onDone={() => setIntro(false)} /> : null}
      <section ref={hero} className="relative h-[100svh] overflow-hidden bg-ink" aria-labelledby="home-title">
        {/* Ticket stock: deep ultramarine engraved with a guilloche rosette (scripts/guilloche.mjs) */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_42%,var(--stock-glow),transparent_72%),linear-gradient(180deg,var(--stock-top),#0d0a3d)]" />
        <div aria-hidden className="guilloche-rosette absolute left-1/2 top-[44%] size-[min(115vmin,1100px)] -translate-x-1/2 -translate-y-1/2" />

        <div data-act1 className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start px-4 pt-[calc(var(--nav-h)+0.5rem)] text-center lg:pt-[calc(var(--nav-h)+1.5rem)]">
          {/* The headline states what the next event is worth, so it never contradicts the seat count below it. */}
          <h1 id="home-title" className="font-cond text-[clamp(3.25rem,13vw,17rem)] uppercase leading-[0.84] text-bone lg:text-[clamp(5rem,8.5vw,11rem)]">
            {data.stakes ? (
              <>
                <span className="block">
                  {spell(data.stakes)} <span className="text-transparent [-webkit-text-stroke:2px_var(--bone)]">tickets.</span>
                </span>
                <span className="block text-bolt">One weekend.</span>
              </>
            ) : (
              <>
                <span className="block">
                  Eight <span className="text-transparent [-webkit-text-stroke:2px_var(--bone)]">seats.</span>
                </span>
                <span className="block text-bolt">One champion.</span>
              </>
            )}
          </h1>
        </div>

        {/* Still poster: the same shot as the 3D at rest (public/art/hero-ticket-*.webp, rendered from HeroScene by
            scripts in the QA notes). It paints at once; the live 3D fades in over it when ready, and it stays if WebGL
            is unavailable. Wide screens frame by height, tall screens by width, exactly like the 3D camera. */}
        <picture className={`pointer-events-none absolute inset-0 block overflow-hidden transition-opacity duration-700 ${sceneReady ? "opacity-0" : "opacity-100"}`}>
          <source media="(max-aspect-ratio: 9/10)" srcSet="/art/hero-ticket-portrait.webp" />
          <img src="/art/hero-ticket-landscape.webp" alt="" fetchPriority="high" decoding="async" className="hero-poster" />
        </picture>
        <div className={`absolute inset-0 transition-opacity duration-1000 ${sceneReady ? "opacity-100" : "opacity-0"}`}>
          {sceneOn ? <HeroScene seats={seats} active={visible && !intro} still={still} onReady={() => setSceneReady(true)} /> : null}
        </div>

        <div data-act2 className="pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+1.5rem)] px-4 opacity-0 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <h2 className="font-cond text-[clamp(3rem,7.5vw,7.5rem)] uppercase leading-[0.86] text-bone">
            Eight seats.
            <br />
            <span className="text-bolt">{open} still open.</span>
          </h2>
          <p className="mt-4 max-w-[40ch] text-lead text-steel">
            Three were won at the Monthly Finals. The rest go to September&apos;s winner, the China Regional and the top three of the Last Chance Qualifier.
          </p>
        </div>

        <div data-hero-ui className="absolute inset-x-0 bottom-12 flex flex-wrap items-end justify-between gap-6 px-4 sm:bottom-14 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <div className="ticket-field grid max-w-[min(100%,27rem)] gap-2 px-5 py-4">
            <div className="flex gap-4 font-data text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tabular-nums text-bone" role="timer" aria-label={`Time until the ${data.event.name}`}>
              {(["d", "h", "m", "s"] as const).map((k, i) => (
                <span key={k} className="grid gap-1">
                  <span>
                    {parts ? String(parts[k]).padStart(2, "0") : "--"}
                    {i < 3 ? <span className="ml-1 text-steel/60">:</span> : null}
                  </span>
                  <span className="font-data text-label uppercase text-steel">{{ d: "days", h: "hrs", m: "min", s: "sec" }[k]}</span>
                </span>
              ))}
            </div>
            <p className="font-data text-label uppercase text-steel">
              Until the first match · {data.event.name} · {local ? `${local} your time` : data.event.dateLabel}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#war-title" className="inline-flex min-h-11 items-center font-text text-sm font-semibold uppercase tracking-[0.12em] text-steel hover:text-bone">
              Skip the story
            </a>
            <Link href="/news/how-worlds-2026-works" className="inline-flex min-h-11 items-center font-text text-sm font-semibold uppercase tracking-[0.12em] text-bone underline decoration-bolt decoration-2 underline-offset-[6px] hover:text-bolt">
              How it works
            </Link>
            <Link href={data.event.href} className="inline-flex min-h-11 items-center font-text text-sm font-semibold uppercase tracking-[0.12em] text-bone underline decoration-bolt decoration-2 underline-offset-[6px] hover:text-bolt">
              See the bracket
            </Link>
            <Link href="/watch" className="stub-button">
              Where to watch
            </Link>
          </div>
        </div>

        {/* Validity band: the event in the visitor's own time, like the printed strip along a ticket's edge */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-9 overflow-hidden border-t border-rule bg-[var(--band)]">
          <div className="validity-band flex h-full w-max items-center whitespace-nowrap font-data text-label uppercase text-steel">
            {Array.from({ length: 2 }, (_, k) => (
              <span key={k} className="flex gap-10 pr-10">
                {Array.from({ length: 4 }, (_, i) => (
                  <span key={i} className="flex gap-10">
                    <span className="text-bolt">{data.event.name}</span>
                    <span>{local ? `${local} your time` : data.event.dateLabel}</span>
                    <span>{open} of 8 seats open</span>
                    <span>Admit one team</span>
                    <span>Serial GLD-2026-LCQ</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <ul className="sr-only">
          {data.seats.map((s) => (
            <li key={s.seat}>
              Seat {s.seat} of 8:{" "}
              {s.claimed ? (
                <HideResult safe="ticket claimed">
                  {s.title}, {s.sub}
                </HideResult>
              ) : (
                `open, ${s.title}, ${s.sub}`
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
