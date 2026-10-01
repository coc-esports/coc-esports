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
    <div className="grid gap-8 py-16 sm:py-20">
      <p className="font-cond text-mega font-black uppercase text-bone text-balance">
        {c.line[0]} <span className="italic text-steel">{c.line[1]}</span>
      </p>
      <div className="flex flex-wrap gap-3">
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
