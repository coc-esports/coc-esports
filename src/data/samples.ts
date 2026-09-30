import type { Article, LadderPlayer, Match, Vod } from "./types";

// Everything in this file is SAMPLE content for the Phase 2 layout.
// Phase 4 replaces matches/articles with real data; Phase 5 makes the ladder live from the game API.

export const upcomingMatches: Match[] = [
  { id: "lcq-r1-1", stage: "Last Chance Qualifier", round: "Upper bracket · Round 1", teamA: "northgate", teamB: "ember-wolves", startTime: "2026-10-10T16:00:00Z", state: "upcoming" },
  { id: "lcq-r1-2", stage: "Last Chance Qualifier", round: "Upper bracket · Round 1", teamA: "stonewake", teamB: "arcfall", startTime: "2026-10-10T17:30:00Z", state: "upcoming" },
  { id: "lcq-r1-3", stage: "Last Chance Qualifier", round: "Upper bracket · Round 1", teamA: "hollow-crown", teamB: "rift-owls", startTime: "2026-10-10T19:00:00Z", state: "upcoming" },
];

export const articles: Article[] = [
  { slug: "lcq-viewers-guide", title: "Last Chance Qualifier: three tickets, one weekend", category: "Viewer's guide", date: "2026-09-29", excerpt: "Everything you need to follow the final road to Worlds: format, schedule and the teams to watch.", tone: "gold" },
  { slug: "double-elimination-explained", title: "How the Worlds double-elimination bracket works", category: "Explainer", date: "2026-09-26", excerpt: "", tone: "elixir" },
  { slug: "road-to-worlds-2026", title: "Road to Worlds: every stage of 2026", category: "Season", date: "2026-09-22", excerpt: "", tone: "stone" },
  { slug: "th18-meta", title: "The TH18 meta: what the pros attack with", category: "Strategy", date: "2026-09-18", excerpt: "", tone: "ember" },
  { slug: "chosen-eight-so-far", title: "The Chosen Eight so far", category: "Teams", date: "2026-09-15", excerpt: "", tone: "gold" },
];

export const ladder: LadderPlayer[] = [
  { rank: 1, name: "Vantor", clan: "Northgate", trophies: 6812, change: 0 },
  { rank: 2, name: "Kaelis", clan: "Arcfall", trophies: 6779, change: 2 },
  { rank: 3, name: "Brakk", clan: "Ember Wolves", trophies: 6771, change: -1 },
  { rank: 4, name: "Seren", clan: "Rift Owls", trophies: 6740, change: 1 },
  { rank: 5, name: "Ironvale", clan: "Stonewake", trophies: 6733, change: -2 },
  { rank: 6, name: "Mirelle", clan: "Hollow Crown", trophies: 6719, change: 3 },
  { rank: 7, name: "Dusk", clan: "Northgate", trophies: 6702, change: 0 },
  { rank: 8, name: "Toren", clan: "Arcfall", trophies: 6698, change: -1 },
  { rank: 9, name: "Quill", clan: "Rift Owls", trophies: 6690, change: 4 },
  { rank: 10, name: "Haldor", clan: "Stonewake", trophies: 6684, change: -2 },
];

const channel = "https://www.youtube.com/@ClashofClans/videos";

export const vods: Vod[] = [
  { id: "wf25-d1", title: "World Finals 2025 · Day 1", meta: "Full broadcast", href: channel, tone: "gold" },
  { id: "wf25-d2", title: "World Finals 2025 · Day 2", meta: "Full broadcast", href: channel, tone: "elixir" },
  { id: "wf25-d3", title: "World Finals 2025 · Day 3", meta: "Grand final", href: channel, tone: "ember" },
  { id: "aug26-mf", title: "August Monthly Final 2026", meta: "Full broadcast", href: channel, tone: "stone" },
  { id: "jul26-mf", title: "July Monthly Final 2026", meta: "Full broadcast", href: channel, tone: "gold" },
];
