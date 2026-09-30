import Link from "next/link";
import { TeamMark } from "@/components/TeamMark";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SampleBadge } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/icons";
import { upcomingMatches } from "@/data/samples";
import { getTeam } from "@/data/teams";
import { formatDateTimeUTC } from "@/lib/format";

export function NextMatches() {
  return (
    <section aria-labelledby="next-matches" className="border-y border-line bg-surface/50">
      <Container className="py-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 id="next-matches" className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Upcoming matches
            </h2>
            <SampleBadge />
          </div>
          <Link
            href="/schedule"
            className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted transition-colors duration-150 hover:text-text"
          >
            <span className="max-sm:hidden">Full schedule</span>
            <span className="sm:hidden">Schedule</span>
            <ArrowRight className="transition-transform duration-200 ease-snap group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {upcomingMatches.map((m) => {
            const a = getTeam(m.teamA);
            const b = getTeam(m.teamB);
            return (
              <li key={m.id} data-reveal>
                <Link
                  href="/schedule"
                  className="group flex h-full flex-col gap-4 rounded-sm border border-line bg-bg p-4 transition-colors duration-150 hover:border-muted"
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-muted">
                    <span className="truncate">{m.round}</span>
                    <Badge tone={m.state === "live" ? "live" : "upcoming"} />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <TeamMark team={a} size="sm" />
                      <span className="truncate font-semibold">{a.name}</span>
                    </div>
                    <span className="font-display text-sm text-muted">VS</span>
                    <div className="flex min-w-0 flex-row-reverse items-center gap-3 text-right">
                      <TeamMark team={b} size="sm" />
                      <span className="truncate font-semibold">{b.name}</span>
                    </div>
                  </div>
                  <p className="text-xs tabular-nums text-muted">{formatDateTimeUTC(m.startTime)}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
