import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { GMark, Wordmark } from "@/components/v2/Mark";
import { Button } from "@/components/v2/Button";
import { DisplayHeading, Label } from "@/components/v2/Type";
import { StatusTag } from "@/components/v2/Status";
import { TicketCard } from "@/components/v2/TicketCard";
import { MatchRow } from "@/components/v2/MatchRow";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false },
};

// Gildra v2 · Direction A "Broadcast Editorial". Every building block of the rebuild in one place.
const colors = [
  { name: "ink", hex: "#0B0C0E", use: "Page background" },
  { name: "graphite", hex: "#14171B", use: "Cards, rows" },
  { name: "plate", hex: "#1C2026", use: "Hover / pressed" },
  { name: "rule", hex: "#2A2F36", use: "Hairlines, borders" },
  { name: "steel", hex: "#8B929B", use: "Secondary text · 6.2:1 on ink" },
  { name: "bone", hex: "#F1F2F0", use: "Primary text, main button · 17.4:1 on ink" },
  { name: "bolt", hex: "#5B9BFF", use: "The one accent: links, focus, Golden Tickets · 7.1:1 on ink" },
  { name: "signal-live", hex: "#FF4D3D", use: "LIVE only (semantic)" },
];

const scale = [
  { token: "text-mega", sample: "Worlds", note: "64 → 152px · home moments only" },
  { token: "text-hero", sample: "Three tickets left", note: "48 → 112px · page heroes" },
  { token: "text-h1", sample: "The Chosen Eight", note: "40 → 72px · section titles" },
  { token: "text-h2", sample: "Road to Worlds", note: "32 → 48px" },
  { token: "text-h3", sample: "Last Chance Qualifier", note: "28px · card titles" },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-rule py-12">
      <Label>{title}</Label>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="bg-ink font-text text-bone">
      <div className="mx-auto w-full max-w-page px-4 pb-24 pt-[calc(var(--nav-h)+3rem)] sm:px-8">
        <header className="grid gap-4 pb-12">
          <Label tone="bolt">Gildra v2 · Direction A · Broadcast Editorial</Label>
          <DisplayHeading as="h1" size="hero" lines={[["Style", { image: { src: "/art/th18-warm.webp", alt: "" } }, "guide"]]} />
          <p className="max-w-[60ch] text-lead text-steel">
            The building blocks of the rebuilt site. Monochrome base, one accent from Town Hall 18&apos;s lightning, giant condensed
            type, colour from the official art. If something looks off here, it looks off everywhere: fix it here first.
          </p>
        </header>

        <Block title="Logo">
          <div className="flex flex-wrap items-end gap-10">
            <Wordmark />
            <GMark className="h-24 w-auto" title="Gildra mark" />
            <div className="grid size-16 place-items-center rounded-[14px] bg-ink ring-1 ring-rule">
              <GMark className="h-9 w-auto" />
            </div>
            <GMark className="h-4 w-auto" />
          </div>
          <p className="max-w-[60ch] text-steel">A squared condensed G; the crossbar is struck by a lightning notch (the TH18 bolt). Reads at 16px.</p>
        </Block>

        <Block title="Colour">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {colors.map((c) => (
              <li key={c.name} className="overflow-hidden rounded-hair border border-rule">
                <div className="h-20" style={{ background: `var(--${c.name})` }} />
                <div className="grid gap-1 bg-graphite p-3">
                  <span className="font-data text-sm">{c.name}</span>
                  <span className="font-data text-label text-steel">{c.hex}</span>
                  <span className="text-sm text-steel">{c.use}</span>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Type · Sofia Sans Extra Condensed / Hanken Grotesk / JetBrains Mono">
          <div className="grid gap-8">
            {scale.map((s) => (
              <div key={s.token} className="grid gap-2">
                <Label>
                  {s.token} · {s.note}
                </Label>
                <p className={`font-cond font-black uppercase ${s.token}`}>{s.sample}</p>
              </div>
            ))}
            <div className="grid max-w-[65ch] gap-3">
              <Label>Text · Hanken Grotesk 16–18px</Label>
              <p className="text-lead">
                Eight teams, a double-elimination bracket and the last three Golden Tickets to Worlds. Every match is a 5v5 war in Esports
                Mode on Town Hall 18.
              </p>
              <Label>Data · JetBrains Mono · times, stages, seats</Label>
              <p className="font-data text-sm tabular-nums">SAT 10 OCT · 18:00 · LCQ UPPER R1 · 03/08</p>
            </div>
          </div>
        </Block>

        <Block title="Buttons · 48px tall">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/watch">Watch live</Button>
            <Button href="/stages/lcq-2026" variant="outline">
              See the bracket
            </Button>
            <Button href="/news/how-worlds-2026-works" variant="text">
              How Worlds works
            </Button>
          </div>
          <p className="max-w-[60ch] text-steel">One solid button per view. Keyboard focus shows a bolt ring; mouse clicks don&apos;t.</p>
        </Block>

        <Block title="Status">
          <div className="flex flex-wrap gap-3">
            <StatusTag status="live" />
            <StatusTag status="upcoming" />
            <StatusTag status="completed" />
            <StatusTag status="ticket" />
            <StatusTag status="open" />
            <StatusTag status="tbd" />
          </div>
        </Block>

        <Block title="Golden Ticket cards (The Chosen Eight)">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            <TicketCard state="claimed" seat={1} team="ZOOS Esports" via="June Monthly Final" rank={1} points="350+" href="/teams/zoos-esports" />
            <TicketCard state="claimed" seat={2} team="Repotted Gaming" via="July Monthly Final" rank={2} points="300+" href="/teams/repotted-gaming" />
            <TicketCard state="claimed" seat={3} team="Vatic" via="August Monthly Final" rank={3} points="225+" href="/teams/vatic" />
            <TicketCard state="open" seat={4} via="September winner" when="Not yet confirmed here" />
            <TicketCard state="open" seat={5} via="China Regional" when="Dates TBA" />
            <TicketCard state="open" seat={6} via="LCQ #1" when="Oct 10–11" />
            <TicketCard state="open" seat={7} via="LCQ #2" when="Oct 10–11" />
            <TicketCard state="open" seat={8} via="LCQ #3" when="Oct 10–11" />
          </div>
        </Block>

        <Block title="Match rows (example data, spoilers on)">
          <div>
            <Label tone="bone">Saturday, October 10</Label>
            <div className="mt-3">
              <MatchRow startTime="2026-10-10T16:00:00Z" stage="LCQ · Upper R1" a="TBD" b="TBD" status="upcoming" />
              <MatchRow startTime="2026-08-30T18:00:00Z" stage="Example · Final" a="Team A" b="Team B" scoreA={3} scoreB={2} status="completed" />
            </div>
          </div>
        </Block>

        <Block title="Art (Supercell Fan Kit)">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { src: "/art/th18-cold.webp", label: "TH18 · cold" },
              { src: "/art/th18-warm.webp", label: "TH18 · warm" },
              { src: "/art/th18-front.webp", label: "TH18 · front" },
            ].map((a) => (
              <figure key={a.src} className="grid gap-2">
                <div className="relative aspect-square overflow-hidden rounded-hair bg-graphite">
                  <Image src={a.src} alt={`Town Hall 18 render, ${a.label}`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-contain p-4" />
                </div>
                <figcaption>
                  <Label>{a.label}</Label>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="max-w-[65ch] text-sm text-steel">
            Art from the official Supercell Fan Kit, used under the Fan Content Policy. This material is not official and is not approved
            by Supercell.
          </p>
        </Block>
      </div>
    </div>
  );
}
