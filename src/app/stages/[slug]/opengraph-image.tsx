import { getStage } from "@/data/season";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Stage of the 2026 World Championship";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stage = getStage(slug);
  return ogImage({
    eyebrow: "World Championship 2026",
    title: stage?.name ?? "Stage",
    subtitle: stage ? [stage.dateLabel, stage.prize].filter(Boolean).join(" · ") : undefined,
  });
}
