import type { Metadata } from "next";
import { season, stages, worldsSlots } from "@/data/season";
import { findTeam } from "@/data/teams";
import { Button } from "@/components/v2/Button";
import { DisplayHeading, Label } from "@/components/v2/Type";
import { HeroStage } from "@/components/v2/motion/HeroStage";
import { TicketFlip } from "@/components/v2/motion/TicketFlip";
import { RoadTimeline, type RoadStop } from "@/components/v2/motion/RoadTimeline";
import type { TicketCardProps } from "@/components/v2/TicketCard";

export const metadata: Metadata = { title: "Motion lab", robots: { index: false } };

// Step 4 · phase 8: throwaway test bench for the three signature moments, measured on a slowed-down phone
// before they go into real pages. Real data only.
export default function MotionLab() {
  const seats: TicketCardProps[] = worldsSlots.map((s, i) => {
    if (s.kind === "qualified") {
      const t = findTeam(s.team);
      return { state: "claimed", seat: i + 1, team: t?.name ?? s.team, via: s.via, rank: t?.rank, points: t?.points, href: `/teams/${s.team}` };
    }
    return { state: "open", seat: i + 1, via: s.via, when: s.via.startsWith("Last Chance") ? "Oct 10–11" : "To be decided" };
  });

  const stops: RoadStop[] = stages.map((s) => ({
    slug: s.slug,
    name: s.name,
    date: s.dateLabel,
    state: s.status === "completed" ? "done" : s.slug === "lcq-2026" ? "next" : "later",
    note: s.status === "completed" ? (s.winner ? `Winner: ${findTeam(s.winner)?.name ?? s.winner}` : (s.winnerNote ?? "")) : (s.prize ? `${s.prize} prize pool` : "Golden Ticket path"),
  }));

  return (
    <div className="bg-ink font-text text-bone">
      <div className="mx-auto grid w-full max-w-page gap-24 px-4 pb-[60vh] pt-[calc(var(--nav-h)+2rem)] sm:px-8">
        <section className="grid gap-4">
          <Label tone="bolt">Moment 1 · Hero</Label>
          <HeroStage>
            <Label tone="bolt">Last Chance Qualifier · Oct 10–11</Label>
            <DisplayHeading as="h1" size="mega" lines={[["Three"], ["tickets"], [{ em: "left." }]]} className="mt-3" />
            <p className="mt-5 max-w-[42ch] text-lead text-steel">Eight teams. Double elimination. The top three go to Worlds.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/watch">Watch live</Button>
              <Button href={season.nextEvent.href} variant="outline">
                See the bracket
              </Button>
            </div>
          </HeroStage>
        </section>

        <section className="grid gap-6">
          <Label tone="bolt">Moment 2 · The Chosen Eight</Label>
          <DisplayHeading size="h1" lines={[["The Chosen Eight"]]} />
          <TicketFlip seats={seats} />
        </section>

        <section className="grid gap-6">
          <Label tone="bolt">Moment 3 · Road to Worlds</Label>
          <DisplayHeading size="h1" lines={[["Road to Worlds"]]} />
          <RoadTimeline stops={stops} />
        </section>
      </div>
    </div>
  );
}
