import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Facts, PageIntro, Section } from "@/components/v2/Layout";
import { HiddenNote, HideResult } from "@/components/v2/HideResult";
import { StageRow } from "@/components/v2/StageRow";
import { TeamCredential } from "@/components/v2/TeamCredential";
import { TeamPoster } from "@/components/v2/TeamPoster";
import { sources, stages } from "@/data/season";
import { findTeam, standingsAsOf, teams } from "@/data/teams";

export const dynamicParams = false;

export function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/teams/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const team = findTeam(slug);
  return team ? { title: team.name, description: `${team.name} on the road to the 2026 Clash of Clans World Championship.` } : {};
}

export default async function TeamPage({ params }: PageProps<"/teams/[slug]">) {
  const { slug } = await params;
  const team = findTeam(slug);
  if (!team) notFound();

  const wins = stages.filter((s) => s.winner === team.slug);
  const nearby = teams.filter((t) => t.slug !== team.slug && Math.abs(t.rank - team.rank) <= 2).slice(0, 4);

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Teams", href: "/teams" }]}
        label={<HideResult safe="Season 2026 team">{team.qualified ? "Golden Ticket · World Finals" : "LCQ contender"}</HideResult>}
        title={team.name}
        intro={<HideResult safe="Season standings and titles are hidden while “Hide results” is on.">{team.qualified ? `${team.qualified}. Booked for the World Finals.` : "Chasing one of the last three Golden Tickets at the Last Chance Qualifier."}</HideResult>}
        aside={<TeamCredential team={team} />}
      />
      <Container>
        <HideResult block safe={<div className="pt-12"><HiddenNote>This team&apos;s titles, standing and rivals are hidden while “Hide results” is on.</HiddenNote></div>}>
        <div className="grid gap-3 pt-12">
          <Facts
            items={[
              { label: "Season rank", value: `#${team.rank}` },
              { label: "Season points", value: team.points },
              { label: "Worlds status", value: team.qualified ? "Golden Ticket" : "Contender", accent: !!team.qualified },
              { label: "Titles 2026", value: wins.length },
            ]}
          />
          <p className="text-sm text-steel">Leaderboard {standingsAsOf}</p>
        </div>
        </HideResult>

        <HideResult block safe={null}>
        <Section id="titles" title="Titles this season">
          <div>
          {wins.length ? (
            <ol className="grid">
              {wins.map((s) => (
                <StageRow key={s.slug} stage={s} asTitle />
              ))}
            </ol>
          ) : (
            <p className="max-w-[60ch] text-steel">
              No Monthly Final title yet. Next chance:{" "}
              <Link href="/stages/lcq-2026" className="text-bone underline decoration-bolt underline-offset-4 hover:text-bolt">
                the Last Chance Qualifier
              </Link>
              .
            </p>
          )}
          </div>
        </Section>
        </HideResult>

        <Section id="roster" title="Roster">
          {team.players?.length ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {team.players.map((p) => (
                <li key={p.tag} className="grid gap-1 rounded-hair border border-rule bg-graphite p-4">
                  <span className="font-semibold text-bone">{p.name}</span>
                  <span className="font-data text-label text-steel">{p.tag}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-[60ch] text-steel">
              The roster isn&apos;t listed on Gildra yet. Current lineups are on{" "}
              <a href={sources[1].href} target="_blank" rel="noopener noreferrer" className="text-bone underline decoration-bolt underline-offset-4">
                Liquipedia
              </a>
              .
            </p>
          )}
        </Section>

        {nearby.length ? (
          <HideResult block safe={null}>
          <Section id="nearby" title="Nearby in the table" href="/worlds#standings" linkLabel="Full standings">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {nearby.map((t) => (
                <li key={t.slug} className="grid">
                  <TeamPoster team={t} />
                </li>
              ))}
            </ul>
          </Section>
          </HideResult>
        ) : null}
      </Container>
    </>
  );
}
