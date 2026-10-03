import { HomeChapters } from "@/components/home/HomeChapters";
import { HomeStory } from "@/components/home/HomeStory";
import { claimedCount, nextEvent, seats } from "@/lib/season-view";

// Re-render at most hourly so countdown targets and seats stay current after each stage.
export const revalidate = 3600;

// Home, "Will Call" (surface brief: .impeccable/surfaces/src-app-page-tsx.md): the Golden Ticket hero and the
// seating chart of eight, then the war on Town Hall 18, the season as ticket stubs, the press box and broadcast passes.
export default function Home() {
  const event = nextEvent();
  const sceneSeats = seats().map((s) =>
    s.state === "claimed"
      ? { seat: s.seat, claimed: true, title: s.team, sub: s.via }
      : { seat: s.seat, claimed: false, title: s.via, sub: s.when ?? "To be decided" },
  );
  return (
    <>
      <HomeStory
        data={{
          seats: sceneSeats,
          event: { name: event.name, dateLabel: event.stage?.dateLabel ?? "", startTime: event.startTime, href: event.href },
          claimed: claimedCount(),
          stakes: event.stage?.kind === "lcq" ? 3 : null,
        }}
      />
      <HomeChapters />
    </>
  );
}
