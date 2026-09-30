import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StageCard } from "@/components/StageCard";
import { TeamCard } from "@/components/TeamCard";
import { TeamMark } from "@/components/TeamMark";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stages } from "@/data/season";
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
  const facts = [
    ["Season rank", `#${team.rank}`],
    ["Leaderboard points", team.points],
    ["Worlds status", team.qualified ? "Qualified" : "LCQ contender"],
  ];

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex items-center gap-3">
            <Link href="/teams" className="hover:text-gold-bright">
              Teams
            </Link>
            <span aria-hidden className="text-muted">/</span>
            {team.qualified ? <Badge tone="qualified" /> : <Badge tone="neutral">LCQ contender</Badge>}
          </span>
        }
        title={team.name}
        intro={team.qualified ? `${team.qualified}. Booked for the World Finals.` : "Chasing one of the last three Golden Tickets."}
      >
        <TeamMark team={team} size="xl" />
      </PageHeader>

      <Container className="py-16 sm:py-20">
        <dl className="grid gap-4 sm:grid-cols-3">
          {facts.map(([label, value]) => (
            <div key={label} data-reveal className="rounded-sm border border-line bg-surface p-5">
              <dt className="text-xs uppercase tracking-widest text-muted">{label}</dt>
              <dd className="mt-2 font-display text-3xl uppercase leading-none text-gold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted">Leaderboard {standingsAsOf}.</p>

        <section aria-labelledby="titles" className="mt-16">
          <SectionHeader id="titles" eyebrow="2026" title="Titles this season" />
          {wins.length ? (
            <ul className="grid gap-4 md:grid-cols-3">
              {wins.map((s) => (
                <li key={s.slug} className="grid">
                  <StageCard stage={s} />
                </li>
              ))}
            </ul>
          ) : (
            <p data-reveal className="text-muted">
              No Monthly Final titles yet. Next chance: the{" "}
              <Link href="/stages/lcq-2026" className="text-gold underline underline-offset-4">
                Last Chance Qualifier
              </Link>
              .
            </p>
          )}
        </section>

        <section aria-labelledby="roster" className="mt-16">
          <SectionHeader id="roster" eyebrow="Players" title="Roster" />
          <p data-reveal className="max-w-2xl text-muted">
            Roster coming soon. In Phase 5, each player gets a live profile from the official Clash of Clans API: Town
            Hall, heroes, trophies and war stars.
          </p>
        </section>

        {nearby.length > 0 && (
          <section aria-labelledby="nearby" className="mt-20">
            <SectionHeader id="nearby" title="Nearby in the standings" href="/worlds#standings" linkLabel="Full standings" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {nearby.map((t) => (
                <li key={t.slug} className="grid">
                  <TeamCard team={t} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  );
}
