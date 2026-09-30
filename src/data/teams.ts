import type { Team } from "./types";

export const teams: Team[] = [
  // Qualified for Worlds 2026 (per the unofficial tracker). Colors are placeholders until real logos are added.
  { slug: "zoos-esports", name: "ZOOS Esports", short: "ZOO", color: "#2f9e6e" },
  { slug: "repotted-gaming", name: "Repotted Gaming", short: "RPG", color: "#c2672e" },
  { slug: "vatic", name: "Vatic", short: "VAT", color: "#3d6fd6" },
  // Sample teams for the preview matches. Replace in Phase 4.
  { slug: "northgate", name: "Northgate", short: "NG", color: "#5b7083", sample: true },
  { slug: "ember-wolves", name: "Ember Wolves", short: "EW", color: "#d2463a", sample: true },
  { slug: "stonewake", name: "Stonewake", short: "SW", color: "#8a7a5c", sample: true },
  { slug: "arcfall", name: "Arcfall", short: "AF", color: "#7b52c9", sample: true },
  { slug: "hollow-crown", name: "Hollow Crown", short: "HC", color: "#b8912f", sample: true },
  { slug: "rift-owls", name: "Rift Owls", short: "RO", color: "#2d8fa6", sample: true },
];

export function getTeam(slug: string): Team {
  const team = teams.find((t) => t.slug === slug);
  if (!team) throw new Error(`Unknown team: ${slug}`);
  return team;
}
