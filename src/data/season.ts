import type { Stage, WorldsSlot } from "./types";

// 2026 season facts (PLAN.md §3): $1M total, TH18, 8 teams at Worlds, double elimination.
// Stage statuses reflect the unofficial tracker as of 2026-09-30; update as results come in.
export const season = {
  name: "World Championship 2026",
  prizePool: "$1,000,000",
  finalsPrize: "$700,000",
  teamsAtWorlds: 8,
  townHall: "TH18",
  nextEvent: {
    name: "Last Chance Qualifier",
    href: "/stages/lcq-2026",
    startTime: "2026-10-10T16:00:00Z",
  },
};

export const stages: Stage[] = [
  { slug: "june-2026", name: "June Monthly Final", dateLabel: "June", status: "completed" },
  { slug: "july-2026", name: "July Monthly Final", dateLabel: "July", status: "completed" },
  { slug: "august-2026", name: "August Monthly Final", dateLabel: "August", status: "completed" },
  { slug: "september-2026", name: "September Monthly Final", dateLabel: "September", status: "upcoming" },
  { slug: "china-2026", name: "China Regional Qualifier", dateLabel: "Autumn", status: "upcoming" },
  { slug: "lcq-2026", name: "Last Chance Qualifier", dateLabel: "Oct 10", status: "upcoming", prize: "$80,000" },
  { slug: "worlds-2026", name: "World Finals", dateLabel: "Date TBA", status: "upcoming", prize: "$700,000", isFinal: true },
];

// "The Chosen Eight": qualified teams per the unofficial Worlds tracker (3 / 8 announced).
export const worldsSlots: WorldsSlot[] = [
  { kind: "qualified", team: "zoos-esports", via: "Golden Ticket" },
  { kind: "qualified", team: "repotted-gaming", via: "Golden Ticket" },
  { kind: "qualified", team: "vatic", via: "Golden Ticket" },
  { kind: "tbd", via: "September Monthly Final" },
  { kind: "tbd", via: "China Regional champion" },
  { kind: "tbd", via: "Last Chance Qualifier #1" },
  { kind: "tbd", via: "Last Chance Qualifier #2" },
  { kind: "tbd", via: "Last Chance Qualifier #3" },
];
