import type { LadderPlayer, Vod } from "./types";

// SAMPLE ladder for the home page layout. Phase 5 replaces it with live data from the official game API.
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

// Broadcast archive. These link to the official channel's video list until individual VOD links are added.
const channel = "https://www.youtube.com/@ClashofClans/videos";

export const vods: Vod[] = [
  { id: "wf25-d1", title: "World Finals 2025 · Day 1", meta: "Full broadcast", href: channel, tone: "gold" },
  { id: "wf25-d2", title: "World Finals 2025 · Day 2", meta: "Full broadcast", href: channel, tone: "elixir" },
  { id: "wf25-d3", title: "World Finals 2025 · Day 3", meta: "Grand final", href: channel, tone: "ember" },
  { id: "aug26-mf", title: "August Monthly Final 2026", meta: "Full broadcast", href: channel, tone: "stone" },
  { id: "jul26-mf", title: "July Monthly Final 2026", meta: "Full broadcast", href: channel, tone: "gold" },
];
