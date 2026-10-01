import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bracket } from "@/components/v2/Bracket";
import { Button } from "@/components/v2/Button";
import { Container, Facts, PageIntro, Section } from "@/components/v2/Layout";
import { TeamMark } from "@/components/v2/TeamMark";
import { TicketFlip } from "@/components/v2/motion/TicketFlip";
import { RoadTimeline } from "@/components/v2/motion/RoadTimeline";
import { getStage, rules, season, sources } from "@/data/season";
import { standingsAsOf, teams } from "@/data/teams";
import { claimedCount, roadStops, seats } from "@/lib/season-view";

export const metadata: Metadata = {
  title: "World Championship 2026",
  description: "The 2026 Clash of Clans World Championship: $1,000,000 prize pool, the eight Golden Ticket teams, the World Finals bracket, rules and standings.",
};

export default function WorldsPage() {
  const finals = getStage("worlds-2026");
  const claimed = claimedCount();
  return (
    <>
      <PageIntro
        label={`Season 2026 · ${claimed} of 8 seats claimed`}
        title="World Championship"
        intro={`${season.prizePool} across the season, ${season.finalsPrize} at the World Finals. Eight teams earn a Golden Ticket and meet in a double-elimination bracket. Every war is 5v5 on ${season.townHall}.`}
        actions={
          <>
            <Button href={season.nextEvent.href}>Next: {season.nextEvent.name}</Button>
            <Button href="/schedule" variant="outline">
              Full schedule
            </Button>
          </>
        }
        aside={<Image src="/art/legend-badge.webp" alt="Legend League badge (Supercell Fan Kit)" width={600} height={600} priority className="mx-auto h-auto w-56 lg:w-72" />}
      />
      <Container>
        <div className="pt-12">
          <Facts
            items={[
              { label: "Season prize pool", value: season.prizePool, accent: true },
              { label: "World Finals", value: season.finalsPrize },
              { label: "Teams at Worlds", value: season.teamsAtWorlds },
              { label: "Played on", value: season.townHall },
            ]}
          />
        </div>

        <Section id="qualified" label="Golden Tickets" title="The Chosen Eight" intro="Four Monthly Final winners, the China Regional champion and the top three of the Last Chance Qualifier.">
          <TicketFlip seats={seats()} />
        </Section>
      </Container>

      <Container className="py-8">
        <RoadTimeline stops={roadStops()} label="The season" title="Road to Worlds" />
      </Container>

      <Container>
        {finals?.bracket ? (
          <Section id="bracket" label={finals.dateLabel} title="World Finals bracket" intro={finals.format}>
            <Bracket bracket={finals.bracket} label="World Finals bracket" />
          </Section>
        ) : null}

        <Section id="standings" label="Season leaderboard" title="Standings" intro={`Top 11, ${standingsAsOf}.`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule font-data text-label uppercase text-steel">
                  <th scope="col" className="py-3 pr-4 font-normal">#</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Team</th>
                  <th scope="col" className="py-3 pr-4 text-right font-normal">Points</th>
                  <th scope="col" className="py-3 font-normal">Worlds</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((t) => (
                  <tr key={t.slug} className="border-b border-rule">
                    <td className="py-3 pr-4 font-data tabular-nums text-steel">{String(t.rank).padStart(2, "0")}</td>
                    <td className="py-3 pr-4">
                      <Link href={`/teams/${t.slug}`} className="flex items-center gap-3 font-semibold text-bone hover:text-bolt">
                        <TeamMark team={t} size="xs" />
                        {t.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-right font-data tabular-nums text-bone">{t.points}</td>
                    <td className="py-3 font-data text-label uppercase">{t.qualified ? <span className="text-bolt">Golden Ticket</span> : <span className="text-steel">LCQ contender</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="rules" label="Rulebook summary" title="How a war is won">
          <div className="grid gap-px overflow-hidden rounded-hair border border-rule bg-rule md:grid-cols-2">
            {rules.map((r) => (
              <div key={r.title} className="grid content-start gap-3 bg-ink p-6">
                <h3 className="font-cond text-h3 font-black uppercase text-bone">{r.title}</h3>
                <p className="text-steel">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-steel">
            Sources:{" "}
            {sources.map((s, i) => (
              <span key={s.href}>
                {i > 0 ? " · " : ""}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-bone underline decoration-bolt underline-offset-4">
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        </Section>
      </Container>
    </>
  );
}
