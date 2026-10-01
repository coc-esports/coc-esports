"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { site } from "@/config/site";
import { useMotion } from "@/lib/motion";
import { pointer, story } from "./store";
import { themes, type ThemeName } from "./themes";
import type { SceneSeat } from "./TicketScene";

// Prototype v3 (owner feedback 2026-10-01: "too basic, weak animation, no 3D"). One page, three colour treatments.
// Ideas and where they come from:
// - Real 3D Golden Ticket as the hero object: basement.studio (object hero) + Gildra 3D board option 1 (owner-approved)
// - Giant type behind/around the object: The Romans (giant condensed caps), Exo Ape (type overlapping the visual)
// - Pinned scroll story where the camera pulls back to the eight seats: The Romans (pinned title), Awwwards scroll worlds
// - Town Hall melted into the page with opposing giant lines: POTATO reel (object blended into the page), Dennis Snellenberg (moving name)
// - Counter intro 0 → 8: Immersive Garden / Obys (counter preloader), first visit only
// - Season road as huge dates travelling sideways: The Romans (pinned title, work drifting past)
const TicketScene = dynamic(() => import("./TicketScene"), { ssr: false, loading: () => null });

export type V3Data = {
  sceneSeats: SceneSeat[];
  event: { name: string; dateLabel: string; startTime: string; href: string };
  stops: { slug: string; name: string; date: string; state: "done" | "next" | "later"; note: string }[];
  claimed: number;
};

function useCountdown(target: string) {
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
  if (now === null) return null;
  const s = Math.max(0, Math.floor((new Date(target).getTime() - now) / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

function Intro({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem("gildra-v3-intro") === "1" || matchMedia("(prefers-reduced-motion: reduce)").matches;
      sessionStorage.setItem("gildra-v3-intro", "1");
    } catch {}
    if (skip) {
      onDone();
      return;
    }
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 1300);
      setN(Math.round(k * 8));
      if (k < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setLeaving(true), 250);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return (
    <div
      aria-hidden
      onTransitionEnd={onDone}
      className="fixed inset-0 z-[60] flex items-end justify-between bg-[var(--v3-bg)] p-6 text-[var(--v3-fg)] transition-[clip-path] duration-[900ms] ease-expo sm:p-10"
      style={{ clipPath: leaving ? "inset(0 0 100% 0)" : "inset(0 0 0 0)" }}
    >
      <span className="font-data text-label uppercase text-[var(--v3-muted)]">Seats at the World Finals</span>
      <span className="font-cond text-[clamp(8rem,30vw,22rem)] font-black leading-[0.8] tabular-nums">
        {String(n).padStart(2, "0")}
        <span className="text-[var(--v3-muted)]">/08</span>
      </span>
    </div>
  );
}

export function V3Page({ data }: { data: V3Data }) {
  const [themeName, setThemeName] = useState<ThemeName>("trophy");
  const theme = themes[themeName];
  const [intro, setIntro] = useState(true);
  const [sceneOn, setSceneOn] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const cd = useCountdown(data.event.startTime);
  const open = 8 - data.claimed;

  // Mount the 3D after the page has painted (the giant type is what loads first), and only where WebGL exists.
  useEffect(() => {
    const ok = (() => {
      try {
        return !!document.createElement("canvas").getContext("webgl2");
      } catch {
        return false;
      }
    })();
    if (!ok) return;
    const id = setTimeout(() => setSceneOn(true), 120);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX / innerWidth - 0.5;
      pointer.y = e.clientY / innerHeight - 0.5;
    };
    addEventListener("pointermove", onMove);
    return () => {
      clearTimeout(id);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  // Pause the 3D when the hero is off screen.
  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useMotion(root, ({ gsap, MOTION_OK, ScrollTrigger }) => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // 1. Hero story: pinned for 2.4 screens; the 3D reads story.p, the DOM text changes act with it.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => void (story.p = self.progress),
        },
      });
      tl.to("[data-act1]", { yPercent: -18, opacity: 0, duration: 0.18 }, 0.22)
        .to("[data-hero-ui]", { opacity: 0, y: 30, duration: 0.12 }, 0.2)
        .fromTo("[data-act2]", { opacity: 0, yPercent: 20 }, { opacity: 1, yPercent: 0, duration: 0.18 }, 0.58)
        .to({}, { duration: 0.24 });

      // 2. Town Hall: the render grows out of the page while two giant lines slide past each other.
      gsap.fromTo("[data-th]", { scale: 0.62, yPercent: 12 }, { scale: 1.08, yPercent: -6, ease: "none", scrollTrigger: { trigger: "[data-th-section]", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo("[data-line-a]", { xPercent: 8 }, { xPercent: -28, ease: "none", scrollTrigger: { trigger: "[data-th-section]", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo("[data-line-b]", { xPercent: -28 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: "[data-th-section]", start: "top bottom", end: "bottom top", scrub: true } });

      // 3. Season road: pinned, the giant dates travel sideways.
      const track = document.querySelector<HTMLElement>("[data-road-track]");
      const frame = document.querySelector<HTMLElement>("[data-road]");
      if (track && frame) {
        const dist = () => Math.max(0, track.scrollWidth - frame.clientWidth);
        gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: frame, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true } });
      }

      // Word-by-word rise on the closing line.
      gsap.from("[data-end] span", { yPercent: 110, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: "[data-end]", start: "top 80%" } });
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  });

  return (
    <div ref={root} data-v3 className="v3 relative min-h-screen bg-[var(--v3-bg)] text-[var(--v3-fg)] transition-colors duration-500" style={theme.css as CSSProperties}>
      {/* The prototype has its own bar; the site header/footer stay off this page. */}
      <style>{`.site-header, body > div > footer, footer.mt-auto { display: none !important; }`}</style>
      {intro ? <Intro onDone={() => setIntro(false)} /> : null}

      <nav aria-label="Prototype" className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-10">
        <Link href="/" className="inline-flex min-h-11 items-center font-cond text-2xl font-black uppercase tracking-tight">
          Gildra
        </Link>
        <div className="flex items-center gap-6 font-data text-label uppercase">
          <Link href="/worlds" className="hidden min-h-11 items-center sm:inline-flex">Worlds</Link>
          <Link href="/schedule" className="hidden min-h-11 items-center sm:inline-flex">Schedule</Link>
          <Link href="/watch" className="inline-flex min-h-11 items-center rounded-full border border-[var(--v3-rule)] px-4">Watch</Link>
        </div>
      </nav>

      {/* ACT 1-2: the Golden Ticket */}
      <section ref={hero} className="relative h-[100svh] overflow-hidden" aria-labelledby="v3-title">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,var(--v3-glow),transparent_70%),linear-gradient(180deg,var(--v3-bg),var(--v3-bg-2))]" />
        <div data-act1 className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 id="v3-title" className="font-cond text-[clamp(5.5rem,19vw,19rem)] font-black uppercase leading-[0.78] tracking-[-0.01em]">
            <span className="block">Three</span>
            <span className="block text-transparent [-webkit-text-stroke:2px_var(--v3-fg)]">tickets</span>
            <span className="block italic">left.</span>
          </h1>
        </div>
        <div className={`absolute inset-0 transition-opacity duration-1000 ${sceneReady ? "opacity-100" : "opacity-0"}`}>
          {sceneOn ? <TicketScene seats={data.sceneSeats} theme={theme} active={heroVisible && !intro} onReady={() => setSceneReady(true)} /> : null}
        </div>
        <div data-act2 className="pointer-events-none absolute inset-x-0 top-24 px-5 opacity-0 sm:px-10">
          <p className="font-cond text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.85]">
            Eight seats.<br />
            <span className="text-[var(--v3-accent)]">{open} still open.</span>
          </p>
          <p className="mt-4 max-w-[38ch] text-lead text-[var(--v3-muted)]">
            Three won at the Monthly Finals. The rest go to September&apos;s winner, the China Regional and the top three of the Last Chance Qualifier.
          </p>
        </div>
        <div data-hero-ui className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 px-5 pb-8 sm:px-10">
          <div className="grid gap-3">
            <p className="font-data text-label uppercase text-[var(--v3-muted)]">
              {data.event.name} · {data.event.dateLabel}
            </p>
            <div className="flex gap-4 font-cond text-5xl font-black tabular-nums" role="timer" aria-label={`Time until the ${data.event.name}`}>
              {(["d", "h", "m", "s"] as const).map((k) => (
                <span key={k} className="grid">
                  {cd ? String(cd[k]).padStart(2, "0") : "--"}
                  <span className="font-data text-label font-normal uppercase text-[var(--v3-muted)]">{{ d: "days", h: "hrs", m: "min", s: "sec" }[k]}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/watch" className="inline-flex h-12 items-center rounded-full bg-[var(--v3-accent)] px-6 font-text text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-[var(--v3-accent-ink)] transition-transform hover:scale-[1.03]">
              Where to watch
            </Link>
            <Link href={data.event.href} className="inline-flex h-12 items-center rounded-full border border-[var(--v3-rule)] px-6 font-text text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors hover:border-[var(--v3-fg)]">
              See the bracket
            </Link>
          </div>
        </div>
        {/* Text version of the 3D seats for screen readers */}
        <ul className="sr-only">
          {data.sceneSeats.map((s) => (
            <li key={s.seat}>
              Seat {s.seat} of 8: {s.claimed ? `${s.title}, ${s.sub}` : `open, ${s.title}, ${s.sub}`}
            </li>
          ))}
        </ul>
      </section>

      {/* ACT 3: Town Hall 18 */}
      <section data-th-section className="relative overflow-hidden py-[18vh]" aria-labelledby="v3-th">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_50%,var(--v3-glow),transparent_70%)]" />
        <h2 id="v3-th" className="relative z-10 font-cond text-[clamp(5rem,17vw,17rem)] font-black uppercase leading-[0.8] whitespace-nowrap">
          <span data-line-a className="block">Every war ·</span>
          <span data-line-b className="block text-right italic text-[var(--v3-accent)]">Town Hall 18</span>
        </h2>
        <div data-th className="relative z-0 mx-auto -mt-[22vw] w-[min(78vw,46rem)] will-change-transform">
          <Image src={theme.townHall} alt="Town Hall 18 (Supercell Fan Kit)" width={1400} height={1400} sizes="(min-width: 768px) 46rem, 78vw" className="h-auto w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]" />
        </div>
        <div className="relative z-10 mx-auto mt-10 grid max-w-5xl gap-8 px-5 sm:grid-cols-3 sm:px-10">
          {[
            ["5 v 5", "Every war is five players a side."],
            ["45 min", "Five minutes to prepare, forty-five to attack."],
            ["1 base", "Everyone plays the same max-level Town Hall."],
          ].map(([big, small]) => (
            <div key={big} className="grid gap-2 border-t border-[var(--v3-rule)] pt-4">
              <span className="font-cond text-6xl font-black uppercase">{big}</span>
              <span className="text-[var(--v3-muted)]">{small}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ACT 4: the road */}
      <section data-road className="relative h-[100svh] overflow-hidden" aria-labelledby="v3-road">
        <h2 id="v3-road" className="absolute left-5 top-24 z-10 font-data text-label uppercase text-[var(--v3-muted)] sm:left-10">
          The road to Worlds · 2026
        </h2>
        <ol data-road-track className="flex h-full w-max items-center gap-[6vw] px-5 sm:px-10">
          {data.stops.map((s, i) => (
            <li key={s.slug} className="grid w-[min(80vw,34rem)] gap-4">
              <span className={`font-data text-label uppercase ${s.state === "next" ? "text-[var(--v3-accent)]" : "text-[var(--v3-muted)]"}`}>
                {String(i + 1).padStart(2, "0")} · {s.state === "done" ? "Done" : s.state === "next" ? "Next" : "Later"}
              </span>
              <Link href={`/stages/${s.slug}`} className="group grid gap-3">
                <span className={`font-cond text-[clamp(5rem,13vw,12rem)] font-black uppercase leading-[0.8] ${s.state === "done" ? "text-[var(--v3-muted)] [-webkit-text-stroke:1.5px_var(--v3-muted)] [color:transparent]" : s.state === "next" ? "text-[var(--v3-accent)]" : ""}`}>
                  {s.date}
                </span>
                <span className="font-cond text-4xl font-black uppercase group-hover:text-[var(--v3-accent)]">{s.name}</span>
              </Link>
              <span className="max-w-[34ch] text-[var(--v3-muted)]">{s.note}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ENDING */}
      <section className="relative px-5 pb-28 pt-[16vh] sm:px-10" aria-labelledby="v3-end">
        <h2 id="v3-end" data-end className="font-cond text-[clamp(5rem,18vw,18rem)] font-black uppercase leading-[0.8]">
          {["See", "you", "at", "Worlds."].map((w) => (
            <span key={w} className="mr-[0.2em] inline-block overflow-hidden align-bottom">
              <span className="inline-block">{w}</span>
            </span>
          ))}
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/schedule" className="inline-flex h-12 items-center rounded-full bg-[var(--v3-accent)] px-6 font-text text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-[var(--v3-accent-ink)]">
            Full schedule
          </Link>
          <Link href="/worlds" className="inline-flex h-12 items-center rounded-full border border-[var(--v3-rule)] px-6 font-text text-[0.8125rem] font-semibold uppercase tracking-[0.08em]">
            The World Championship
          </Link>
        </div>
        <p className="mt-16 max-w-[70ch] text-sm text-[var(--v3-muted)]">
          {site.disclaimer} Art from the official Supercell Fan Kit. {site.name} is a fan project. Prototype page: not linked from the site.
        </p>
      </section>

      {/* Colour treatments to compare */}
      <div role="radiogroup" aria-label="Colour treatment" className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-[var(--v3-rule)] bg-[var(--v3-bg)]/85 p-1 backdrop-blur">
        {(Object.keys(themes) as ThemeName[]).map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={themeName === k}
            title={themes[k].note}
            onClick={() => setThemeName(k)}
            className={`h-11 rounded-full px-4 font-data text-label uppercase transition-colors ${themeName === k ? "bg-[var(--v3-fg)] text-[var(--v3-bg)]" : "text-[var(--v3-muted)] hover:text-[var(--v3-fg)]"}`}
          >
            {themes[k].label}
          </button>
        ))}
      </div>
    </div>
  );
}
