import { ViewTransition } from "react";
import type { Team } from "@/data/types";
import { cn } from "@/lib/cn";

const sizes = {
  xs: "h-6 w-6 text-[9px]",
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-20 w-20 text-2xl",
  xl: "h-28 w-28 text-4xl sm:h-36 sm:w-36 sm:text-5xl",
};

// Placeholder team logo: the team's short code on its brand color. Swap for real logos later.
// `morph`: the mark glides from a team card into the team page header. Only one mark per team
// may use it on any page, or the browser skips the transition.
export function TeamMark({
  team,
  size = "md",
  className,
  morph = false,
}: {
  team: Team;
  size?: keyof typeof sizes;
  className?: string;
  morph?: boolean;
}) {
  const mark = (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-sm font-display uppercase leading-none text-white shadow-[inset_0_-3px_0_rgb(0_0_0/0.25)]",
        sizes[size],
        className,
      )}
      style={{ background: `linear-gradient(145deg, ${team.color}, color-mix(in oklab, ${team.color} 55%, black))` }}
    >
      {team.short}
    </span>
  );
  if (!morph) return mark;
  return (
    <ViewTransition name={`team-${team.slug}`} share="morph" default="none">
      {mark}
    </ViewTransition>
  );
}
