"use client";

import { usePathname } from "next/navigation";
import { Button } from "./Button";

// The page close. The giant line (The Romans / Akufen pattern) is kept for the two climax pages (home, Worlds);
// every other page ends with one compact, page-specific next step so the big moment never becomes a formula.
// Error and About pages end with nothing extra.
type Close = { line: [string, string]; primary: [string, string]; secondary?: [string, string] };
const giant: Record<string, Close> = {
  "/": { line: ["Follow the road", "to Worlds."], primary: ["Where to watch", "/watch"], secondary: ["Schedule", "/schedule"] },
  "/worlds": { line: ["Eight seats.", "One champion."], primary: ["Where to watch", "/watch"], secondary: ["Schedule", "/schedule"] },
};
const compact: { match: (p: string) => boolean; text: string; action: [string, string] }[] = [
  { match: (p) => p.startsWith("/news/"), text: "More from the season", action: ["All news", "/news"] },
  { match: (p) => p === "/news", text: "Every stage, in your time", action: ["Schedule", "/schedule"] },
  { match: (p) => p.startsWith("/teams"), text: "Three tickets left at the Last Chance Qualifier", action: ["The LCQ", "/stages/lcq-2026"] },
  { match: (p) => p.startsWith("/schedule") || p.startsWith("/stages"), text: "Every match streams on the official channels", action: ["Where to watch", "/watch"] },
  { match: (p) => p.startsWith("/watch"), text: "Every stage, in your time", action: ["Schedule", "/schedule"] },
];

export function ClosingBand() {
  const pathname = usePathname();
  const g = giant[pathname];
  if (g) {
    return (
      <div className="relative grid gap-8 overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="guilloche-rosette absolute -right-[20vmin] top-1/2 size-[min(90vmin,900px)] -translate-y-1/2 opacity-40" />
        <p className="relative font-cond text-mega uppercase text-bone text-balance">
          {g.line[0]} <span className="text-bolt">{g.line[1]}</span>
        </p>
        <div className="relative flex flex-wrap items-center gap-4">
          <Button href={g.primary[1]}>{g.primary[0]}</Button>
          {g.secondary ? (
            <Button href={g.secondary[1]} variant="outline">
              {g.secondary[0]}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
  const c = compact.find((x) => x.match(pathname));
  if (!c) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 py-10">
      <p className="font-cond text-h2 uppercase text-bone">{c.text}</p>
      <Button href={c.action[1]}>{c.action[0]}</Button>
    </div>
  );
}
