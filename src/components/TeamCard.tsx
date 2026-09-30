import Link from "next/link";
import { TeamMark } from "@/components/TeamMark";
import { Badge } from "@/components/ui/Badge";
import type { Team } from "@/data/types";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      data-reveal
      className="group relative flex flex-col justify-between gap-8 overflow-hidden rounded-sm border border-line bg-surface p-5 transition-colors duration-150 hover:border-gold/60"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 transition-opacity duration-300 group-hover:opacity-45"
        style={{ background: `radial-gradient(ellipse at 100% 0%, ${team.color}, transparent 65%)` }}
      />
      <div className="relative flex items-start justify-between gap-2">
        <TeamMark team={team} morph />
        {team.qualified ? <Badge tone="qualified" /> : <Badge tone="neutral">#{team.rank}</Badge>}
      </div>
      <div className="relative">
        <p className="font-display text-2xl uppercase leading-none">
          <span className="title-underline">{team.name}</span>
        </p>
        <p className="mt-2 text-sm text-muted">
          {team.qualified ?? "LCQ contender"} · <span className="tabular-nums">{team.points} pts</span>
        </p>
      </div>
    </Link>
  );
}
