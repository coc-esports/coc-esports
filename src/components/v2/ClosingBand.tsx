"use client";

import { usePathname } from "next/navigation";
import { Button } from "./Button";

// The giant closing line (The Romans / Akufen pattern), written for the page you're on so it never reads
// as boilerplate. One primary and one secondary action, never the header's action again.
const lines: { match: (p: string) => boolean; line: [string, string]; primary: [string, string]; secondary?: [string, string] }[] = [
  { match: (p) => p.startsWith("/news/"), line: ["More from", "the season."], primary: ["All news", "/news"], secondary: ["Schedule", "/schedule"] },
  { match: (p) => p.startsWith("/teams"), line: ["Who takes the", "last tickets?"], primary: ["The Last Chance Qualifier", "/stages/lcq-2026"], secondary: ["Standings", "/worlds#standings"] },
  { match: (p) => p.startsWith("/schedule") || p.startsWith("/stages"), line: ["Never miss", "a war."], primary: ["Where to watch", "/watch"], secondary: ["The Chosen Eight", "/worlds#qualified"] },
  { match: (p) => p.startsWith("/watch"), line: ["See you", "on stream."], primary: ["Schedule", "/schedule"] },
  { match: (p) => p.startsWith("/worlds"), line: ["Eight seats.", "One champion."], primary: ["Where to watch", "/watch"], secondary: ["Schedule", "/schedule"] },
];
const fallback = { line: ["Follow the road", "to Worlds."] as [string, string], primary: ["Where to watch", "/watch"] as [string, string], secondary: ["Schedule", "/schedule"] as [string, string] };

export function ClosingBand() {
  const pathname = usePathname();
  const c = lines.find((l) => l.match(pathname)) ?? fallback;
  return (
    <div className="relative grid gap-8 overflow-hidden py-16 sm:py-20">
      <div aria-hidden className="guilloche-rosette absolute -right-[20vmin] top-1/2 size-[min(90vmin,900px)] -translate-y-1/2 opacity-40" />
      <p className="relative font-cond text-mega uppercase text-bone text-balance">
        {c.line[0]} <span className="text-bolt">{c.line[1]}</span>
      </p>
      <div className="relative flex flex-wrap items-center gap-4">
        <Button href={c.primary[1]}>{c.primary[0]}</Button>
        {c.secondary ? (
          <Button href={c.secondary[1]} variant="outline">
            {c.secondary[0]}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
