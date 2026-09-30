import type { Vod } from "./types";

// Broadcast archive. These link to the official channel's video list until individual VOD links are added.
const channel = "https://www.youtube.com/@ClashofClans/videos";

export const vods: Vod[] = [
  { id: "wf25-d1", title: "World Finals 2025 · Day 1", meta: "Full broadcast", href: channel, tone: "gold" },
  { id: "wf25-d2", title: "World Finals 2025 · Day 2", meta: "Full broadcast", href: channel, tone: "elixir" },
  { id: "wf25-d3", title: "World Finals 2025 · Day 3", meta: "Grand final", href: channel, tone: "ember" },
  { id: "aug26-mf", title: "August Monthly Final 2026", meta: "Full broadcast", href: channel, tone: "stone" },
  { id: "jul26-mf", title: "July Monthly Final 2026", meta: "Full broadcast", href: channel, tone: "gold" },
];
