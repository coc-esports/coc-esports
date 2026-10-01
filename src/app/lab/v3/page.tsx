import type { Metadata } from "next";
import { V3Page } from "@/components/v3/V3Page";
import { claimedCount, nextEvent, roadStops, seats } from "@/lib/season-view";

// Prototype for the owner to judge the v3 direction (3D, motion, colour). Not linked, not indexed.
export const metadata: Metadata = { title: "Prototype v3", robots: { index: false, follow: false } };

export default function LabV3() {
  const event = nextEvent();
  const sceneSeats = seats().map((s) =>
    s.state === "claimed"
      ? { seat: s.seat, claimed: true, title: s.team, sub: s.via }
      : { seat: s.seat, claimed: false, title: s.via, sub: s.when ?? "To be decided" },
  );
  return (
    <V3Page
      data={{
        sceneSeats,
        event: { name: event.name, dateLabel: event.stage?.dateLabel ?? "", startTime: event.startTime, href: event.href },
        stops: roadStops(),
        claimed: claimedCount(),
      }}
    />
  );
}

