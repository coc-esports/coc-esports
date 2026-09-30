import Link from "next/link";
import { TeamMark } from "@/components/TeamMark";
import { Badge } from "@/components/ui/Badge";
import { standingsAsOf, teams } from "@/data/teams";
import { cn } from "@/lib/cn";

// Season leaderboard with the LCQ cutline after the 8th non-qualified team.
export function Standings({ limit }: { limit?: number }) {
  const rows = limit ? teams.slice(0, limit) : teams;
  // The LCQ takes the 8 best teams without a Golden Ticket; the line goes under the 8th.
  const cutlineSlug = teams.filter((t) => !t.qualified)[7]?.slug;

  return (
    <div data-reveal>
      <div className="overflow-hidden rounded-sm border border-line">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">2026 season leaderboard, {standingsAsOf}</caption>
          <thead className="bg-surface text-xs uppercase tracking-widest text-muted">
            <tr>
              <th scope="col" className="w-14 px-4 py-3 font-semibold">#</th>
              <th scope="col" className="px-4 py-3 font-semibold">Team</th>
              <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">Status</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Points</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((team) => {
              const cutline = team.slug === cutlineSlug;
              return (
                <tr
                  key={team.slug}
                  className={cn(
                    "border-t border-line transition-colors duration-150 hover:bg-surface/60",
                    cutline && "border-b-2 border-b-gold/60",
                  )}
                >
                  <td className={cn("px-4 py-3 font-display text-lg tabular-nums", team.qualified ? "text-gold" : "text-muted")}>
                    {team.rank}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/teams/${team.slug}`} className="group flex items-center gap-3">
                      <TeamMark team={team} size="xs" />
                      <span className="font-semibold">
                        <span className="title-underline">{team.name}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {team.qualified ? <Badge tone="qualified" /> : <span className="text-xs text-muted">LCQ contender</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">
        Points {standingsAsOf}, via the unofficial Clash Worlds tracker. The gold line marks the LCQ cutline: the eight
        best teams without a Golden Ticket. Ties shown as published.
      </p>
    </div>
  );
}
