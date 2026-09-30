import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TeamMark } from "@/components/TeamMark";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stages } from "@/data/season";
import { findTeam } from "@/data/teams";
import type { Stage } from "@/data/types";
import { formatDateTimeUTC } from "@/lib/format";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Dates for every stage of the 2026 Clash of Clans World Championship, with add-to-calendar links.",
};

function Row({ stage }: { stage: Stage }) {
  const winner = stage.winner ? findTeam(stage.winner) : undefined;
  return (
    <li data-reveal className="grid gap-4 border-t border-line py-6 sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-8">
      <div>
        <p className="font-display text-2xl uppercase leading-none">{stage.dateLabel}</p>
        {stage.startTime && <p className="mt-1.5 text-xs text-muted">{formatDateTimeUTC(stage.startTime)}</p>}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/stages/${stage.slug}`} className="group text-lg font-semibold">
            <span className="title-underline">{stage.name}</span>
          </Link>
          <Badge tone={stage.status === "completed" ? "completed" : stage.status === "live" ? "live" : "upcoming"} />
        </div>
        {winner ? (
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <TeamMark team={winner} size="xs" /> Won by <span className="font-semibold text-text">{winner.name}</span>
          </p>
        ) : (
          stage.schedule && (
            <p className="mt-2 text-sm text-muted">{stage.schedule.map((s) => `${s.label} ${s.dates}`).join(" · ")}</p>
          )
        )}
      </div>
      <div className="flex gap-2">
        {stage.startTime && (
          <Button href={`/calendar/${stage.slug}`} size="sm" prefetch={false} download>
            Add to calendar
          </Button>
        )}
        <Button href={`/stages/${stage.slug}`} size="sm" variant="secondary">
          Details
        </Button>
      </div>
    </li>
  );
}

export default function SchedulePage() {
  const upcoming = stages.filter((s) => s.status !== "completed");
  const completed = stages.filter((s) => s.status === "completed").reverse();

  return (
    <>
      <PageHeader
        eyebrow="Season 2026"
        title="Schedule"
        intro="All times in UTC. Use “Add to calendar” to save an event to Google Calendar, Outlook or Apple Calendar."
      />
      <Container className="py-16 sm:py-20">
        <section aria-labelledby="upcoming">
          <SectionHeader id="upcoming" eyebrow="Next" title="Upcoming" />
          <ol className="border-b border-line">
            {upcoming.map((s) => (
              <Row key={s.slug} stage={s} />
            ))}
          </ol>
        </section>
        <section aria-labelledby="completed" className="mt-20">
          <SectionHeader id="completed" eyebrow="Results" title="Completed" />
          <ol className="border-b border-line">
            {completed.map((s) => (
              <Row key={s.slug} stage={s} />
            ))}
          </ol>
        </section>
      </Container>
    </>
  );
}
