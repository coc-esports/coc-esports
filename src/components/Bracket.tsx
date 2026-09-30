"use client";

import { useState } from "react";
import { TeamMark } from "@/components/TeamMark";
import { findTeam } from "@/data/teams";
import type { Bracket as BracketData, BracketMatch, BracketRound } from "@/data/types";
import { cn } from "@/lib/cn";

// Double-elimination bracket. Hovering a team highlights every match it plays (PLAN.md §6 #14).
// Scrolls sideways on small screens.
function Slot({
  slug,
  label,
  score,
  won,
  hovered,
  onHover,
}: {
  slug?: string;
  label: string;
  score?: number;
  won: boolean;
  hovered: string | null;
  onHover: (slug: string | null) => void;
}) {
  const team = slug ? findTeam(slug) : undefined;
  const lit = team && hovered === team.slug;
  const dim = hovered && !lit;
  return (
    <div
      onMouseEnter={() => team && onHover(team.slug)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "flex h-10 items-center gap-2 px-3 transition-[background-color,opacity] duration-150",
        lit && "bg-gold/15",
        dim && "opacity-50",
      )}
    >
      {team ? (
        <>
          <TeamMark team={team} size="xs" />
          <span className={cn("min-w-0 flex-1 truncate text-sm", won ? "font-semibold text-text" : "text-text/80")}>
            {team.name}
          </span>
        </>
      ) : (
        <span className="min-w-0 flex-1 truncate text-sm text-muted">{label}</span>
      )}
      <span className={cn("w-5 text-right font-display tabular-nums", won ? "text-gold" : "text-muted")}>
        {score ?? ""}
      </span>
    </div>
  );
}

function Match({ match, hovered, onHover }: { match: BracketMatch; hovered: string | null; onHover: (s: string | null) => void }) {
  const decided = match.scoreA !== undefined && match.scoreB !== undefined;
  const aWon = decided && match.scoreA! > match.scoreB!;
  const bWon = decided && match.scoreB! > match.scoreA!;
  return (
    <div className="relative w-52">
      <span className="absolute -top-2 right-2 z-10 bg-bg px-1 text-[10px] font-semibold leading-4 text-muted" aria-hidden>
        {match.id}
      </span>
      <div className="overflow-hidden rounded-sm border border-line bg-bg">
        <Slot slug={match.a} label={match.aLabel} score={match.scoreA} won={aWon} hovered={hovered} onHover={onHover} />
        <div className="h-px bg-line" />
        <Slot slug={match.b} label={match.bLabel} score={match.scoreB} won={bWon} hovered={hovered} onHover={onHover} />
      </div>
    </div>
  );
}

function Rounds({ rounds, hovered, onHover }: { rounds: BracketRound[]; hovered: string | null; onHover: (s: string | null) => void }) {
  return (
    <div className="flex gap-6">
      {rounds.map((round) => (
        <div key={round.name} className="flex flex-col">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">{round.name}</h4>
          <div className="flex flex-1 flex-col justify-around gap-4">
            {round.matches.map((match) => (
              <Match key={match.id} match={match} hovered={hovered} onHover={onHover} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Bracket({ bracket, label }: { bracket: BracketData; label: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div role="region" aria-label={label} tabIndex={0} className="scroll-row -mx-4 px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-10">
          <div>
            <h3 className="mb-4 font-display text-xl uppercase text-gold">Upper bracket</h3>
            <Rounds rounds={bracket.upper} hovered={hovered} onHover={setHovered} />
          </div>
          <div>
            <h3 className="mb-4 font-display text-xl uppercase text-muted">Lower bracket</h3>
            <Rounds rounds={bracket.lower} hovered={hovered} onHover={setHovered} />
          </div>
        </div>
        <div className="self-center">
          <h3 className="mb-4 font-display text-xl uppercase text-gold">{bracket.final.name}</h3>
          {bracket.final.matches.map((match) => (
            <div key={match.id} className="rounded-sm shadow-[0_0_0_1px_var(--gold),0_0_40px_-10px_var(--gold)]">
              <Match match={match} hovered={hovered} onHover={setHovered} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
