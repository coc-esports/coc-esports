import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { articles } from "@/data/news";
import { stages } from "@/data/season";
import { teams } from "@/data/teams";

// Tells search engines about every page. Regenerates on each deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority = 0.6) => ({ url: `${site.url}${path}`, lastModified: new Date(), priority });
  return [
    page("/", 1),
    page("/worlds", 0.9),
    page("/schedule", 0.8),
    page("/teams", 0.8),
    page("/stages", 0.7),
    page("/news", 0.7),
    page("/leaderboards", 0.6),
    page("/watch", 0.5),
    page("/about", 0.3),
    ...stages.map((s) => page(`/stages/${s.slug}`)),
    ...teams.map((t) => page(`/teams/${t.slug}`)),
    ...articles.map((a) => ({ url: `${site.url}/news/${a.slug}`, lastModified: new Date(a.date), priority: 0.6 })),
  ];
}
