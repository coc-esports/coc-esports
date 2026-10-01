import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bracket } from "@/components/v2/Bracket";
import { Button } from "@/components/v2/Button";
import { Container, Facts, PageIntro, Section } from "@/components/v2/Layout";
import { LocalTime } from "@/components/v2/LocalTime";
import { Spoiler } from "@/components/v2/Spoilers";
import { StageRow } from "@/components/v2/StageRow";
import { StatusTag } from "@/components/v2/Status";
import { TeamMark } from "@/components/v2/TeamMark";
import { getStage, sources, stages } from "@/data/season";
import { findTeam } from "@/data/teams";
import { PageArt } from "@/components/v2/PageArt";

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
  const status = stage.status === "completed" ? "completed" : stage.status === "live" ? "live" : "upcoming";
  const facts = [
    { label: "When", value: stage.dateLabel },
    ...(stage.schedule ?? []).map((s) => ({ label: s.label, value: s.dates })),
    ...(stage.prize ? [{ label: "Prize pool", value: stage.prize, accent: true }] : []),
  ].slice(0, 4);

  return (
    <>
      <PageIntro
        crumbs={[
          { label: "Worlds", href: "/worlds" },
          { label: "Stages", href: "/stages" },
        ]}
        label={<StatusTag status={status} />}
        title={stage.name}
        aside={<PageArt name={stage.kind === "lcq" ? "champion" : stage.kind === "china" ? "queen" : stage.kind === "worlds" ? "th18" : "king"} />}
        intro={stage.format}
        actions={
          <>
            {stage.startTime && stage.status !== "completed" ? (
              <Button href={`/calendar/${stage.slug}`} prefetch={false} download>
                Add to calendar
              </Button>
            ) : null}
            <Button href="/watch" variant="outline">
              Where to watch
            </Button>
          </>
        }
      />
      <Container>
        <div className="grid gap-3 pt-12">
          <Facts items={facts} />
          {stage.startTime ? (
            <p className="font-data text-label uppercase text-steel">
              Starts <LocalTime iso={stage.startTime} className="text-bone" />
            </p>
          ) : null}
        </div>

        {winner || stage.winnerNote ? (
          <Section id="champion" title="Champion">
            {winner ? (
              <Spoiler label="Show the champion">
                <Link href={`/teams/${winner.slug}`} className="group flex items-center gap-6 rounded-hair border border-foil/50 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--foil)_14%,var(--graphite)),var(--graphite)_70%)] p-6 hover:border-foil">
                  <TeamMark team={winner} size="lg" />
                  <span className="grid gap-2">
                    <span className="font-cond text-h1 font-black uppercase text-bone group-hover:text-bolt">{winner.name}</span>
                    <span className="text-steel">Earned a Golden Ticket to the World Finals</span>
                  </span>
                </Link>
              </Spoiler>
            ) : (
              <p className="max-w-[60ch] text-steel">{stage.winnerNote}</p>
            )}
          </Section>
        ) : null}

        <Section id="bracket" title={stage.bracket ? "Double elimination" : "Match results"} intro={stage.bracket ? <>Matchups appear as soon as they’re set.<span className="hidden [@media(hover:hover)]:inline"> Hover a team to follow its path.</span></> : undefined}>
          {stage.bracket ? (
            <Bracket bracket={stage.bracket} label={`${stage.name} bracket`} />
          ) : (
            <p className="max-w-[60ch] text-steel">
              Match-by-match results for this stage aren&apos;t on Gildra yet. Full brackets are on{" "}
              <a href={sources[1].href} target="_blank" rel="noopener noreferrer" className="text-bone underline decoration-bolt underline-offset-4">
                Liquipedia
              </a>
              .
            </p>
          )}
        </Section>

        <Section id="more" title="More stages" href="/stages" linkLabel="All stages">
          <ol className="border-t border-rule">
            {others.map((s) => (
              <StageRow key={s.slug} stage={s} />
            ))}
          </ol>
        </Section>
      </Container>
    </>
  );
}
