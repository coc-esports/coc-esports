import { ViewTransition } from "react";
import type { Team } from "@/data/types";
import { cn } from "@/lib/cn";

const sizes = {
  xs: "size-7 text-[0.8rem]",
  sm: "size-11 text-[1.1rem]",
  md: "size-16 text-[1.6rem]",
  lg: "size-24 text-[2.4rem]",
  xl: "size-32 text-[3.2rem] sm:size-44 sm:text-[4.4rem]",
};

// Our own monogram system (no third-party logos without permission): the team code in condensed caps on
// graphite, with the team's colour as a thin bar under it. Calm enough to sit in a monochrome layout.
// `morph`: the mark glides from a team card into the team page header (one per team per page).
export function TeamMark({ team, size = "md", className, morph = false }: { team: Team; size?: keyof typeof sizes; className?: string; morph?: boolean }) {
  const mark = (
    <span
      aria-hidden
      className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-hair border border-rule bg-graphite font-cond uppercase leading-none text-bone", sizes[size], className)}
    >
      {team.short}
      <span className="absolute inset-x-0 bottom-0 h-[8%] min-h-[2px]" style={{ background: team.color }} />
    </span>
  );
  if (!morph) return mark;
  return (
    <ViewTransition name={`team-${team.slug}`} share="morph" default="none">
      {mark}
    </ViewTransition>
  );
}
