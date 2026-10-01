import { getStage, season, stages, worldsSlots } from "@/data/season";
import { findTeam } from "@/data/teams";
import type { TicketCardProps } from "@/components/v2/TicketCard";
import type { RoadStop } from "@/components/v2/motion/RoadTimeline";

// Shapes the season data for the v2 views. Facts only come from src/data; unknowns stay "TBA".

export function seats(): TicketCardProps[] {
  return worldsSlots.map((s, i) => {
    if (s.kind === "qualified") {
      const t = findTeam(s.team);
      return { state: "claimed", seat: i + 1, team: t?.name ?? s.team, via: s.via, rank: t?.rank, points: t?.points, href: `/teams/${s.team}` };
    }
    const lcq = s.via.startsWith("Last Chance");
    const china = s.via.startsWith("China");
    return { state: "open", seat: i + 1, via: s.via, when: lcq ? "Decided Oct 10–11" : china ? "Dates TBA" : "Not yet confirmed here" };
  });
}

export function roadStops(): RoadStop[] {
  const nextSlug = season.nextEvent.href.split("/").pop();
  return stages.map((s) => ({
    slug: s.slug,
    name: s.name,
    date: s.dateLabel,
    state: s.status === "completed" ? "done" : s.slug === nextSlug ? "next" : "later",
    note:
      s.status === "completed"
        ? s.winner
          ? `Won by ${findTeam(s.winner)?.name ?? s.winner}`
          : (s.winnerNote ?? "Completed")
        : s.prize
          ? `${s.prize} prize pool`
          : "Golden Ticket path",
  }));
}

export function nextEvent() {
  const stage = getStage(season.nextEvent.href.split("/").pop() ?? "");
  return { ...season.nextEvent, stage };
}

// Event mode on the home page: from now until the next event ends.
export function inEventMode(now = Date.now()) {
  const { stage, startTime } = nextEvent();
  const end = stage?.endTime ? new Date(stage.endTime).getTime() : new Date(startTime).getTime() + 36e5 * 30;
  return now < end;
}

export const claimedCount = () => worldsSlots.filter((s) => s.kind === "qualified").length;
