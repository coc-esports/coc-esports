// Data model from PLAN.md §3. Phase 4 swaps the sample content for real JSON/MDX; the shapes stay.

export type Status = "completed" | "live" | "upcoming";

export type Team = {
  slug: string;
  name: string;
  short: string; // 2-3 letter code shown in the team mark
  color: string; // team brand color for the mark
  sample?: boolean; // invented placeholder team
};

export type WorldsSlot =
  | { kind: "qualified"; team: string; via: string }
  | { kind: "tbd"; via: string };

export type Stage = {
  slug: string;
  name: string;
  dateLabel: string;
  status: Status;
  prize?: string;
  isFinal?: boolean;
};

export type Match = {
  id: string;
  stage: string;
  round: string;
  teamA: string;
  teamB: string;
  startTime: string; // ISO, UTC
  state: Status;
  scoreA?: number;
  scoreB?: number;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  excerpt: string;
  tone: ArtTone;
};

export type LadderPlayer = {
  rank: number;
  name: string;
  clan: string;
  trophies: number;
  change: number; // rank change since yesterday
};

export type Vod = {
  id: string;
  title: string;
  meta: string;
  href: string;
  tone: ArtTone;
};

export type ArtTone = "gold" | "elixir" | "stone" | "ember";
