// Data model from PLAN.md §3. Edit the files in src/data to update the site; the pages read from here.

export type Status = "completed" | "live" | "upcoming";

export type Team = {
  slug: string;
  name: string;
  short: string; // 2-3 letter code shown in the team mark
  color: string; // placeholder brand color until real logos are added
  rank: number; // season leaderboard position
  points: string; // as published, e.g. "350+"
  qualified?: string; // how the team earned its Golden Ticket, if it has one
  players?: { name: string; tag: string }[]; // roster (names and player tags), shown on the team page
};

export type WorldsSlot =
  | { kind: "qualified"; team: string; via: string }
  | { kind: "tbd"; via: string };

export type Stage = {
  slug: string;
  name: string;
  kind: "monthly" | "china" | "lcq" | "worlds";
  dateLabel: string; // short label, e.g. "Jun 27–28"
  status: Status;
  startTime?: string; // ISO UTC, when the exact start is known
  endTime?: string;
  schedule?: { label: string; dates: string }[];
  prize?: string;
  format: string;
  winner?: string; // team slug
  winnerNote?: string; // shown when a completed stage has no confirmed winner here yet
  bracket?: Bracket;
  isFinal?: boolean;
};

export type BracketMatch = {
  id: string;
  a?: string; // team slug
  b?: string;
  aLabel: string; // shown when the slot has no team yet, e.g. "Winner U1"
  bLabel: string;
  scoreA?: number;
  scoreB?: number;
};

export type BracketRound = { name: string; matches: BracketMatch[] };

export type Bracket = {
  upper: BracketRound[];
  lower: BracketRound[];
  final: BracketRound;
};

export type Article = {
  slug: string;
  title: string;
  safeTitle?: string; // shown in lists instead of `title` while "Hide results" is on (when the title names winners)
  category: string;
  date: string; // ISO
  excerpt: string;
  tone: ArtTone;
  glyph?: string;
  art?: { src: string; alt: string }; // Fan Kit image in /public/art
};

export type Vod = {
  id: string;
  title: string;
  meta: string;
  href: string;
  tone: ArtTone;
};

export type ArtTone = "gold" | "elixir" | "stone" | "ember";
