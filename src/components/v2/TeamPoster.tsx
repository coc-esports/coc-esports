import Link from "next/link";
import type { Team } from "@/data/types";
import { cn } from "@/lib/cn";
import { TeamMark } from "./TeamMark";
import { Label } from "./Type";

// A team as an event accreditation pass ("Will Call" world): lanyard slot, header band, the team's mark,
// and a code strip generated from the team's slug (a data pattern, not an illustration). Golden Ticket
// holders get the foil band. The mark morphs into the team page header on navigation.
// `neutral`: no ticket status, rank or points (used while "Hide results" is on).
function codeBars(slug: string) {
  return Array.from(slug.padEnd(18, slug), (ch, i) => 1 + ((ch.charCodeAt(0) * (i + 3)) % 4));
}

export function TeamPoster({ team, neutral = false }: { team: Team; neutral?: boolean }) {
  const ticket = !neutral && !!team.qualified;
  return (
    <Link
      href={`/teams/${team.slug}`}
      className={cn(
        "group relative grid min-w-0 content-start overflow-hidden bg-graphite shadow-[0_24px_50px_-28px_rgba(5,3,30,0.95)] ring-1 transition-transform duration-500 ease-expo hover:-translate-y-1 hover:-rotate-1",
        ticket ? "ring-foil/50" : "ring-rule",
      )}
    >
      <span className={cn("relative flex h-11 items-center justify-between px-4 font-data text-label uppercase", ticket ? "bg-[linear-gradient(135deg,#f6d27a,var(--foil)_45%,#c9922f)] text-bolt-ink" : "bg-plate text-steel")}>
        <span>{ticket ? "Golden Ticket" : "Team pass"}</span>
        <span aria-hidden className="absolute left-1/2 top-1/2 h-2 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
        {neutral ? <span>2026</span> : <span className="tabular-nums">#{String(team.rank).padStart(2, "0")}</span>}
      </span>
      <span className="grid gap-5 p-5">
        <TeamMark team={team} size="md" morph={!neutral} />
        <span className="grid gap-1.5">
          <span className="font-cond text-h3 uppercase leading-[0.95] text-bone group-hover:text-foil">{team.name}</span>
          {neutral ? (
            <Label>Season 2026</Label>
          ) : (
            <Label tone={ticket ? "foil" : "steel"}>
              {ticket ? "Booked for Worlds" : "Contender"} · {team.points} pts
            </Label>
          )}
        </span>
        <span aria-hidden className="flex h-6 items-stretch gap-[2px] opacity-70">
          {codeBars(team.slug).map((w, i) => (
            <span key={i} className="bg-steel" style={{ width: `${w}px` }} />
          ))}
        </span>
      </span>
    </Link>
  );
}
