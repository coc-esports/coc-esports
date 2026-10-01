"use client";

import { useState } from "react";
import { findTeam } from "@/data/teams";
import type { Bracket as BracketData, BracketMatch, BracketRound } from "@/data/types";
import { cn } from "@/lib/cn";
import { useSpoilers } from "./Spoilers";
import { TeamMark } from "./TeamMark";

// Double-elimination bracket. Hover a team to follow its path. Scores respect the spoiler switch:
// one "Show results" button reveals the whole bracket. Scrolls sideways inside its own box on phones.
function Slot({ slug, label, score, won, hovered, onHover, hideScore }: { slug?: string; label: string; score?: number; won: boolean; hovered: string | null; onHover: (s: string | null) => void; hideScore: boolean }) {
  const team = slug ? findTeam(slug) : undefined;
  const lit = team && hovered === team.slug;
  const dim = hovered && !lit;
  return (
    <div
      onMouseEnter={() => team && onHover(team.slug)}
      onMouseLeave={() => onHover(null)}
      className={cn("flex h-11 items-center gap-2.5 px-3 transition-[background-color,opacity] duration-150", lit && "bg-plate", dim && "opacity-45")}
    >
      {team ? (
        <>
          <TeamMark team={team} size="xs" />
          <span className={cn("min-w-0 flex-1 truncate text-sm", won && !hideScore ? "font-semibold text-bone" : "text-bone/80")}>{team.name}</span>
        </>
      ) : (
        <span className="min-w-0 flex-1 truncate font-data text-label uppercase text-steel">{label}</span>
      )}
      <span className={cn("w-5 text-right font-cond text-lg font-black tabular-nums", won && !hideScore ? "text-signal-win" : "text-steel")}>{hideScore ? "" : (score ?? "")}</span>
    </div>
  );
}

function Match({ match, hovered, onHover, hideScore, final = false }: { match: BracketMatch; hovered: string | null; onHover: (s: string | null) => void; hideScore: boolean; final?: boolean }) {
  const decided = match.scoreA !== undefined && match.scoreB !== undefined;
  return (
    <div className="relative w-48">
      <span className="absolute -top-2.5 right-2 z-10 bg-ink px-1 font-data text-label text-steel" aria-hidden>
        {match.id}
      </span>
      <div className={cn("overflow-hidden rounded-hair border bg-graphite", final ? "border-steel" : "border-rule")}>
        <Slot slug={match.a} label={match.aLabel} score={match.scoreA} won={decided && match.scoreA! > match.scoreB!} hovered={hovered} onHover={onHover} hideScore={hideScore} />
        <div className="h-px bg-rule" />
        <Slot slug={match.b} label={match.bLabel} score={match.scoreB} won={decided && match.scoreB! > match.scoreA!} hovered={hovered} onHover={onHover} hideScore={hideScore} />
      </div>
    </div>
  );
}

function Rounds({ rounds, ...rest }: { rounds: BracketRound[]; hovered: string | null; onHover: (s: string | null) => void; hideScore: boolean }) {
  return (
    <div className="flex gap-6">
      {rounds.map((round) => (
        <div key={round.name} className="flex flex-col">
          <h4 className="mb-4 font-data text-label uppercase text-steel">{round.name}</h4>
          <div className="flex flex-1 flex-col justify-around gap-5">
            {round.matches.map((m) => (
              <Match key={m.id} match={m} {...rest} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Bracket({ bracket, label }: { bracket: BracketData; label: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const { hide } = useSpoilers();
  const [shown, setShown] = useState(false);
  const anyScore = [...bracket.upper, ...bracket.lower, bracket.final].some((r) => r.matches.some((m) => m.scoreA !== undefined));
  const hideScore = hide && !shown;
  const seeded = [...bracket.upper, ...bracket.lower, bracket.final].some((r) => r.matches.some((m) => m.a || m.b));
  return (
    <div className="grid gap-4">
      <p className="max-w-[62ch] text-sm text-steel">
        {seeded ? null : <span className="text-bone">No teams seeded yet: names appear here once the field is confirmed. </span>}
        Match codes: U = upper bracket, L = lower bracket, GF = Grand Final. &ldquo;Winner U5&rdquo; means the winner of match U5.
        <span className="lg:hidden"> Scroll sideways to see the whole bracket.</span>
      </p>
      {anyScore && hide && !shown ? (
        <button type="button" onClick={() => setShown(true)} className="h-11 w-fit rounded-hair border border-dashed border-rule px-4 font-data text-label uppercase text-steel hover:border-steel hover:text-bone">
          Show results
        </button>
      ) : null}
      <div role="region" aria-label={label} tabIndex={0} className="overflow-x-auto pb-4 [scrollbar-color:var(--rule)_transparent] [scrollbar-width:thin]">
        <div className="flex w-max items-center gap-10 pr-6 pt-3">
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="mb-5 font-cond text-h3 font-black uppercase text-bone">Upper bracket</h3>
              <Rounds rounds={bracket.upper} hovered={hovered} onHover={setHovered} hideScore={hideScore} />
            </div>
            <div>
              <h3 className="mb-5 font-cond text-h3 font-black uppercase text-steel">Lower bracket</h3>
              <Rounds rounds={bracket.lower} hovered={hovered} onHover={setHovered} hideScore={hideScore} />
            </div>
          </div>
          <div className="self-center">
            <h3 className="mb-5 font-cond text-h3 font-black uppercase text-bone">{bracket.final.name}</h3>
            {bracket.final.matches.map((m) => (
              <Match key={m.id} match={m} hovered={hovered} onHover={setHovered} hideScore={hideScore} final />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
