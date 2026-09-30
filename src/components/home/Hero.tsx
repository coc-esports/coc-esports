import type { CSSProperties } from "react";
import { Countdown } from "@/components/Countdown";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { season } from "@/data/season";
import { formatDateTimeUTC } from "@/lib/format";

// Placeholder key art: layered glows, a stone-brick grid and a large shield emblem.
// Swap the emblem for Fan Kit art or a looping video later.
// data-hero-art moves with scroll (parallax); data-hero-art-inner fades/scales in on load.
function HeroArt() {
  return (
    <div aria-hidden data-hero-art className="pointer-events-none absolute inset-0">
      <div data-hero-art-inner className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_25%,color-mix(in_oklab,var(--elixir)_35%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_90%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_70%)]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.06] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]">
          <defs>
            <pattern id="hero-bricks" width="96" height="48" patternUnits="userSpaceOnUse">
              <path d="M0 0.5H96M0 24.5H96M0.5 0V24M48.5 24V48" stroke="white" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-bricks)" />
        </svg>
        <svg
          viewBox="0 0 400 400"
          className="absolute right-[-40%] top-[30%] w-[110vw] max-w-[820px] -translate-y-1/2 opacity-20 sm:right-[-8%] sm:top-1/2 sm:w-[70vw] sm:opacity-40 lg:right-[-6%] lg:w-[42vw] lg:opacity-100"
        >
          <circle cx="200" cy="200" r="190" fill="none" stroke="var(--line)" strokeWidth="1" />
          <circle cx="200" cy="200" r="160" fill="none" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 10" />
          <circle cx="200" cy="200" r="128" fill="none" stroke="var(--line)" strokeWidth="1" />
          <g transform="translate(200 206) scale(9.5) translate(-11 -13)">
            <path d="M11 1l9 3.5v7.2c0 6-3.9 10.6-9 13.3C5.9 22.3 2 17.7 2 11.7V4.5L11 1z" fill="url(#shield-fill)" />
            <path d="M11 6l4.5 1.8v4c0 3.2-1.9 5.6-4.5 7.1-2.6-1.5-4.5-3.9-4.5-7.1v-4L11 6z" fill="var(--bg)" />
          </g>
          <defs>
            <linearGradient id="shield-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--gold-bright)" />
              <stop offset="1" stopColor="#a8741a" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[min(100svh,960px)] items-end overflow-hidden"
    >
      <HeroArt />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      <Container className="relative pb-16 pt-[calc(var(--nav-h)+4rem)] sm:pb-20">
        <div data-hero-content>
          <p data-hero-intro style={{ "--i": 0 } as CSSProperties} className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
            Clash of Clans esports · Fan hub
          </p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(3.5rem,11vw,9.5rem)] uppercase leading-[0.86] tracking-tight"
          >
            {/* Each line rises out of its own mask (CSS .hero-line in globals.css) */}
            <span className="hero-line" style={{ "--i": 0 } as CSSProperties}>
              <span>World </span>
            </span>
            <span className="hero-line" style={{ "--i": 1 } as CSSProperties}>
              <span>Championship </span>
            </span>
            <span className="hero-line text-gold" style={{ "--i": 2 } as CSSProperties}>
              <span>2026</span>
            </span>
          </h1>
          <p data-hero-intro style={{ "--i": 1 } as CSSProperties} className="mt-6 max-w-lg text-lg text-text/80">
            Eight teams. {season.finalsPrize} on the line. Every match on {season.townHall}. Follow the road from the
            monthly finals to the world title.
          </p>
          <div data-hero-intro style={{ "--i": 2 } as CSSProperties} className="mt-8 flex flex-wrap gap-3">
            <Button href="/worlds" size="lg">
              Road to Worlds
            </Button>
            <Button href="/watch" variant="secondary" size="lg">
              Watch
            </Button>
          </div>

          <div
            data-hero-intro
            className="mt-12 inline-flex flex-col gap-4 rounded-sm border border-line bg-surface/70 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-8"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Next up</p>
              <p className="mt-1 font-display text-2xl uppercase leading-none">{season.nextEvent.name}</p>
              <p className="mt-1.5 text-sm text-muted">{formatDateTimeUTC(season.nextEvent.startTime)}</p>
            </div>
            <Countdown
              target={season.nextEvent.startTime}
              label={`Countdown to the ${season.nextEvent.name}, ${formatDateTimeUTC(season.nextEvent.startTime)}`}
            />
          </div>
        </div>
      </Container>
      <HeroMotion />
    </section>
  );
}
