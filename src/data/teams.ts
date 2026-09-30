import type { Team } from "./types";

// Season leaderboard top 11, as published by the unofficial tracker (worlds.competitiveclash.network)
// after the September Monthly Final. Colors are placeholders until real logos are added.
export const teams: Team[] = [
  { slug: "zoos-esports", name: "ZOOS Esports", short: "ZOO", color: "#2f9e6e", rank: 1, points: "350+", qualified: "June Monthly Final winner" },
  { slug: "repotted-gaming", name: "Repotted Gaming", short: "RPG", color: "#c2672e", rank: 2, points: "300+", qualified: "July Monthly Final winner" },
  { slug: "vatic", name: "Vatic", short: "VAT", color: "#3d6fd6", rank: 3, points: "225+", qualified: "August Monthly Final winner" },
  { slug: "tribe-gaming", name: "Tribe Gaming", short: "TRB", color: "#b8912f", rank: 4, points: "150+" },
  { slug: "win-or-die", name: "Win Or Die", short: "WOD", color: "#d2463a", rank: 5, points: "134+" },
  { slug: "mg-esports", name: "MG ESPORTS", short: "MG", color: "#7b52c9", rank: 6, points: "119+" },
  { slug: "carrie-esports", name: "Carrie Esports", short: "CRE", color: "#2d8fa6", rank: 7, points: "104+" },
  { slug: "cb7-esports", name: "CB7 Esports", short: "CB7", color: "#5b7083", rank: 8, points: "90+" },
  { slug: "rng-x-tpm", name: "RNG x TPM", short: "RNG", color: "#a33a5c", rank: 9, points: "86+" },
  { slug: "enosis-esports", name: "Enosis eSports", short: "ENO", color: "#4f8a3a", rank: 10, points: "86+" },
  { slug: "ice-cream-bros", name: "Ice Cream Bros.", short: "ICB", color: "#c77fa8", rank: 11, points: "86+" },
];

export const standingsAsOf = "after the September Monthly Final (Sep 27, 2026)";

export function getTeam(slug: string): Team {
  const team = teams.find((t) => t.slug === slug);
  if (!team) throw new Error(`Unknown team: ${slug}`);
  return team;
}

export function findTeam(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}
