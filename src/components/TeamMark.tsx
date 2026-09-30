import type { Team } from "@/data/types";
import { cn } from "@/lib/cn";

const sizes = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-20 w-20 text-2xl",
};

// Placeholder team logo: the team's short code on its brand color. Swap for real logos later.
export function TeamMark({ team, size = "md", className }: { team: Team; size?: keyof typeof sizes; className?: string }) {
  return (
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
}
