import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { season } from "@/data/season";

export const alt = "World Championship 2026: the fan-made home of Clash of Clans esports";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    eyebrow: "Clash of Clans esports · Fan hub",
    title: "World Championship 2026",
    subtitle: `${season.prizePool} · ${season.teamsAtWorlds} teams · ${season.townHall}`,
  });
}
