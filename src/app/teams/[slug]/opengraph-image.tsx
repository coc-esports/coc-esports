import { findTeam } from "@/data/teams";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Team profile";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = findTeam(slug);
  return ogImage({
    eyebrow: team?.qualified ? "Qualified for Worlds 2026" : "Road to Worlds 2026",
    title: team?.name ?? "Team",
    subtitle: team ? `Season rank #${team.rank} · ${team.points} points` : undefined,
  });
}
