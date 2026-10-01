import type { Article } from "./types";

// Article list. Each slug needs a matching file: src/content/news/<slug>.mdx
// Newest first.
export const articles: Article[] = [
  {
    slug: "lcq-2026-preview",
    title: "Last Chance Qualifier: three tickets, one weekend",
    category: "Preview",
    date: "2026-09-30",
    excerpt: "Eight teams, a double-elimination bracket and the last three Golden Tickets to Worlds. Here's who's in the running.",
    tone: "gold",
    glyph: "LCQ",
    art: { src: "/art/keyart-th17.webp", alt: "Clash of Clans key art: heroes at a golden Town Hall (Supercell Fan Kit)" },
  },
  {
    slug: "how-worlds-2026-works",
    title: "How the 2026 World Championship works",
    category: "Explainer",
    date: "2026-09-29",
    excerpt: "From a 128-team monthly qualifier to an 8-team world final: the whole format in five minutes.",
    tone: "elixir",
    art: { src: "/art/th18-front.webp", alt: "Town Hall 18, the level every World Championship match is played on (Supercell Fan Kit)" },
  },
  {
    slug: "golden-tickets-so-far",
    title: "Golden Tickets so far: ZOOS, Repotted and Vatic",
    category: "Teams",
    date: "2026-09-28",
    excerpt: "Three monthly champions have booked their seats at the World Finals. A look at how they got there.",
    tone: "stone",
    art: { src: "/art/legend-badge.webp", alt: "Legend League badge (Supercell Fan Kit)" },
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
