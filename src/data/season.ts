import { doubleElim8 } from "./brackets";
import type { Stage, WorldsSlot } from "./types";

// 2026 season facts. Sources: Supercell's announced roadmap and the unofficial tracker
// worlds.competitiveclash.network (dates, results, rules). Update this file as results come in.
export const season = {
  name: "World Championship 2026",
  prizePool: "$1,000,000",
  finalsPrize: "$700,000",
  monthlyPrize: "$220,000",
  lcqPrize: "$80,000",
  teamsAtWorlds: 8,
  townHall: "TH18",
  nextEvent: {
    name: "Last Chance Qualifier",
    href: "/stages/lcq-2026",
    startTime: "2026-10-10T16:00:00Z",
  },
};

const monthlyFormat = "128-team double-elimination Monthly Qualifier over 2 days; the top 8 play an 8-team double-elimination Monthly Final. The winner earns a Golden Ticket to Worlds.";

export const stages: Stage[] = [
  {
    slug: "june-2026", name: "June Monthly Final", kind: "monthly", dateLabel: "Jun 27–28", status: "completed",
    schedule: [{ label: "Ladder", dates: "Jun 3–8" }, { label: "Qualifier", dates: "Jun 20–21" }, { label: "Final", dates: "Jun 27–28" }],
    format: monthlyFormat, winner: "zoos-esports",
  },
  {
    slug: "july-2026", name: "July Monthly Final", kind: "monthly", dateLabel: "Jul 25–26", status: "completed",
    schedule: [{ label: "Ladder", dates: "Jul 1–6" }, { label: "Qualifier", dates: "Jul 11–12" }, { label: "Final", dates: "Jul 25–26" }],
    format: monthlyFormat, winner: "repotted-gaming",
  },
  {
    slug: "august-2026", name: "August Monthly Final", kind: "monthly", dateLabel: "Aug 29–30", status: "completed",
    schedule: [{ label: "Ladder", dates: "Aug 5–10" }, { label: "Qualifier", dates: "Aug 15–16" }, { label: "Final", dates: "Aug 29–30" }],
    format: monthlyFormat, winner: "vatic",
  },
  {
    slug: "september-2026", name: "September Monthly Final", kind: "monthly", dateLabel: "Sep 26–27", status: "completed",
    schedule: [{ label: "Ladder", dates: "Sep 2–7" }, { label: "Qualifier", dates: "Sep 12–13" }, { label: "Final", dates: "Sep 26–27" }],
    format: monthlyFormat, winnerNote: "Winner not yet confirmed here. Their Golden Ticket is the 4th Worlds slot.",
  },
  {
    slug: "china-2026", name: "China Regional Qualifier", kind: "china", dateLabel: "Dates TBA", status: "upcoming",
    format: "China's own qualification path. The regional champion takes one Golden Ticket to Worlds.",
  },
  {
    slug: "lcq-2026", name: "Last Chance Qualifier", kind: "lcq", dateLabel: "Oct 10–11", status: "upcoming",
    startTime: "2026-10-10T16:00:00Z", endTime: "2026-10-12T00:00:00Z",
    schedule: [{ label: "Day 1", dates: "Oct 10" }, { label: "Day 2", dates: "Oct 11" }],
    prize: "$80,000",
    format: "The eight highest-ranked teams on the season leaderboard without a Golden Ticket play an 8-team double-elimination bracket. The top 3 take the last Golden Tickets to Worlds.",
    bracket: doubleElim8(),
  },
  {
    slug: "worlds-2026", name: "World Finals", kind: "worlds", dateLabel: "Dates TBA", status: "upcoming", isFinal: true,
    prize: "$700,000",
    format: "All 8 Golden Ticket teams (4 Monthly Final winners, the China Regional champion and 3 LCQ qualifiers) play an 8-team double-elimination bracket for the world title.",
    bracket: doubleElim8(),
  },
];

export function getStage(slug: string) {
  return stages.find((s) => s.slug === slug);
}

// "The Chosen Eight": the 8 Golden Ticket slots for Worlds.
export const worldsSlots: WorldsSlot[] = [
  { kind: "qualified", team: "zoos-esports", via: "June Monthly Final winner" },
  { kind: "qualified", team: "repotted-gaming", via: "July Monthly Final winner" },
  { kind: "qualified", team: "vatic", via: "August Monthly Final winner" },
  { kind: "tbd", via: "September Monthly Final winner" },
  { kind: "tbd", via: "China Regional champion" },
  { kind: "tbd", via: "Last Chance Qualifier #1" },
  { kind: "tbd", via: "Last Chance Qualifier #2" },
  { kind: "tbd", via: "Last Chance Qualifier #3" },
];

// Match rules (from the published rulebook summary).
export const rules = [
  { title: "Esports Mode wars", body: "Every match is a 5v5 Friendly War in Esports Mode on Town Hall 18. Each player gets one attack per war." },
  { title: "Timers", body: "5-minute preparation, then a 45-minute battle in Qualifiers, Finals, the LCQ and the World Finals (30 minutes on the Ladder)." },
  { title: "Who wins a war", body: "1) Total stars. 2) Destruction percentage. 3) Fastest average attack time. A tied war goes to a 1v1 best-of-1 Friendly Challenge on the same base." },
  { title: "Rosters", body: "Teams are clans of 5 or 6 players. Monthly Finals, the LCQ and the World Finals require exactly 5." },
];

export const sources = [
  { label: "Clash Worlds tracker (unofficial)", href: "https://worlds.competitiveclash.network/" },
  { label: "Liquipedia: Clash of Clans World Championship 2026", href: "https://liquipedia.net/clashofclans/Clash_of_Clans_World_Championship/2026" },
];
