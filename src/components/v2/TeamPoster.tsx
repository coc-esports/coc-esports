import Link from "next/link";
import type { Team } from "@/data/types";
import { cn } from "@/lib/cn";
import { TeamMark } from "./TeamMark";
import { Label } from "./Type";

// Tall team card (Riot poster proportion). The mark morphs into the team page header on navigation.
export function TeamPoster({ team }: { team: Team }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className={cn(
        "group flex aspect-[3/4] min-w-0 flex-col justify-between rounded-hair border p-5 transition-colors duration-300 ease-expo",
        team.qualified ? "border-bolt/50 bg-[linear-gradient(180deg,#101a2b,var(--graphite))] hover:border-bolt" : "border-rule bg-graphite hover:border-steel",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Label tone={team.qualified ? "bolt" : "steel"}>{team.qualified ? "Ticket" : "Contender"}</Label>
        <span className="font-data text-label tabular-nums text-steel">#{String(team.rank).padStart(2, "0")}</span>
      </div>
      <TeamMark team={team} size="lg" morph />
      <div className="grid gap-1.5">
        <span className="font-cond text-h3 font-black uppercase leading-[0.95] text-bone group-hover:text-bolt">{team.name}</span>
        <span className="font-data text-label uppercase text-steel">{team.points} pts</span>
      </div>
    </Link>
  );
}
