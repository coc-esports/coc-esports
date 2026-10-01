import Link from "next/link";
import type { Team } from "@/data/types";
import { cn } from "@/lib/cn";
import { TeamMark } from "./TeamMark";
import { Label } from "./Type";

// Team card: the mark, the name and the season facts, sized to its content (no empty poster space until
// real team art exists). The mark morphs into the team page header on navigation.
// `neutral`: no ticket status, rank or points (used while "Hide results" is on).
export function TeamPoster({ team, neutral = false }: { team: Team; neutral?: boolean }) {
  const ticket = !neutral && !!team.qualified;
  return (
    <Link
      href={`/teams/${team.slug}`}
      className={cn(
        "group grid min-w-0 content-start gap-5 rounded-hair border p-5 transition-colors duration-300 ease-expo",
        ticket ? "border-foil/40 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--foil)_12%,var(--graphite)),var(--graphite)_70%)] hover:border-foil" : "border-rule bg-graphite hover:border-steel",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <TeamMark team={team} size="md" morph={!neutral} />
        {neutral ? null : <span className="font-data text-label tabular-nums text-steel">#{String(team.rank).padStart(2, "0")}</span>}
      </div>
      <div className="grid gap-1.5">
        <span className="font-cond text-h3 font-black uppercase leading-[0.95] text-bone group-hover:text-bolt">{team.name}</span>
        {neutral ? null : (
          <Label tone={ticket ? "foil" : "steel"}>
            {ticket ? "Golden Ticket" : "Contender"} · {team.points} pts
          </Label>
        )}
      </div>
    </Link>
  );
}
