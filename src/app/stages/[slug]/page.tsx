import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bracket } from "@/components/Bracket";
import { PageHeader } from "@/components/PageHeader";
import { StageCard } from "@/components/StageCard";
import { TeamMark } from "@/components/TeamMark";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getStage, sources, stages } from "@/data/season";
import { findTeam } from "@/data/teams";
import { formatDateTimeUTC } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return stages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const stage = getStage(slug);
  return stage ? { title: stage.name, description: stage.format } : {};
}

export default async function StagePage({ params }: PageProps<"/stages/[slug]">) {
  const { slug } = await params;
  const stage = getStage(slug);
  if (!stage) notFound();

  const winner = stage.winner ? findTeam(stage.winner) : undefined;
  const others = stages.filter((s) => s.slug !== stage.slug).slice(0, 3);
  const tone = stage.status === "completed" ? "completed" : stage.status === "live" ? "live" : "upcoming";

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex flex-wrap items-center gap-3">
            <Link href="/stages" className="hover:text-gold-bright">
              Stages
            </Link>
            <span aria-hidden className="text-muted">/</span>
            <Badge tone={tone} />
          </span>
        }
        title={stage.name}
        intro={stage.format}
      >
        <div className="flex flex-wrap gap-3">
          {stage.startTime && <Button href={`/calendar/${stage.slug}`} prefetch={false} download>Add to calendar</Button>}
          <Button href="/schedule" variant="secondary">
            Full schedule
          </Button>
        </div>
      </PageHeader>

      <Container className="py-16 sm:py-20">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(!stage.schedule || stage.startTime) && (
            <div data-reveal className="rounded-sm border border-line bg-surface p-5">
              <dt className="text-xs uppercase tracking-widest text-muted">When</dt>
              <dd className="mt-2 font-display text-2xl uppercase leading-none">{stage.dateLabel}</dd>
              {stage.startTime && <dd className="mt-2 text-sm text-muted">Starts {formatDateTimeUTC(stage.startTime)}</dd>}
            </div>
          )}
          {stage.schedule?.map((step) => (
            <div key={step.label} data-reveal className="rounded-sm border border-line bg-surface p-5">
              <dt className="text-xs uppercase tracking-widest text-muted">{step.label}</dt>
              <dd className="mt-2 font-display text-2xl uppercase leading-none">{step.dates}</dd>
            </div>
          ))}
          {stage.prize && (
            <div data-reveal className="rounded-sm border border-line bg-surface p-5">
              <dt className="text-xs uppercase tracking-widest text-muted">Prize pool</dt>
              <dd className="mt-2 font-display text-2xl leading-none text-gold tabular-nums">{stage.prize}</dd>
            </div>
          )}
        </dl>

        {(winner || stage.winnerNote) && (
          <section aria-labelledby="champion" className="mt-16">
            <SectionHeader id="champion" eyebrow="Golden Ticket" title="Champion" />
            {winner ? (
              <Link
                href={`/teams/${winner.slug}`}
                data-reveal
                className="group flex items-center gap-6 rounded-sm border border-gold/50 bg-[radial-gradient(ellipse_at_left,color-mix(in_oklab,var(--gold)_18%,transparent),var(--surface)_60%)] p-6 transition-colors duration-150 hover:border-gold"
              >
                <TeamMark team={winner} size="lg" />
                <div>
                  <p className="font-display text-3xl uppercase leading-none">
                    <span className="title-underline">{winner.name}</span>
                  </p>
                  <p className="mt-2 text-muted">Earned a Golden Ticket to the World Finals</p>
                </div>
              </Link>
            ) : (
              <p data-reveal className="text-muted">{stage.winnerNote}</p>
            )}
          </section>
        )}

        <section aria-labelledby="stage-bracket" className="mt-16">
          <SectionHeader id="stage-bracket" eyebrow="Bracket" title={stage.bracket ? "Double elimination" : "Match results"} />
          {stage.bracket ? (
            <>
              <p data-reveal className="-mt-2 mb-10 max-w-2xl text-muted">
                Matchups appear here as soon as they&apos;re set. Hover a team to follow its path.
              </p>
              <Bracket bracket={stage.bracket} label={`${stage.name} bracket`} />
            </>
          ) : (
            <p data-reveal className="max-w-2xl text-muted">
              Match-by-match results for this stage aren&apos;t on the site yet. Full brackets are on{" "}
              <a href={sources[1].href} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4">
                Liquipedia
              </a>
              .
            </p>
          )}
        </section>

        <section aria-labelledby="more-stages" className="mt-20">
          <SectionHeader id="more-stages" title="More stages" href="/stages" linkLabel="All stages" />
          <ul className="grid gap-4 md:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug} className="grid">
                <StageCard stage={s} />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
