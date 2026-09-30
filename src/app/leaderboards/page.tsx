import type { Metadata } from "next";
import { LadderTable } from "@/components/LadderTable";
import { LiveUnavailable } from "@/components/LiveUnavailable";
import { PageHeader } from "@/components/PageHeader";
import { PlayerSearch } from "@/components/PlayerSearch";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { getGlobalRankings } from "@/lib/coc";

export const metadata: Metadata = {
  title: "Leaderboards",
  description: "The global Legend League top 200, live from the official Clash of Clans API.",
};

export default async function LeaderboardsPage() {
  const result = await getGlobalRankings(200);

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex items-center gap-3">
            Legend League {result.ok && <Badge tone="live">Live</Badge>}
          </span>
        }
        title="Global top 200"
        intro="The highest-ranked players in the world right now. Updated every 5 minutes from the official Clash of Clans API. Tap a player for their full profile."
      >
        <PlayerSearch />
      </PageHeader>
      <Container className="py-16 sm:py-20">
        {result.ok ? (
          <LadderTable players={result.data.items} caption="Top 200 players in the global Legend League" showWins />
        ) : (
          <LiveUnavailable reason={result.reason} />
        )}
      </Container>
    </>
  );
}
