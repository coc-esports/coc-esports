import { LadderTable } from "@/components/LadderTable";
import { LiveUnavailable } from "@/components/LiveUnavailable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getGlobalRankings } from "@/lib/coc";

// Top 10 of the global Legend League, live from the official API (refreshed every 5 minutes).
export async function LegendLadder() {
  const result = await getGlobalRankings(10);

  return (
    <section aria-labelledby="ladder" className="py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Legend League</p>
            {result.ok && <Badge tone="live">Live</Badge>}
          </div>
          <h2 id="ladder" className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">
            Global ladder
          </h2>
          <p className="mt-4 text-muted">
            The best players on the planet right now, straight from the official Clash of Clans API. Updated every few
            minutes.
          </p>
          <Button href="/leaderboards" variant="secondary" className="mt-8">
            Top 200
          </Button>
        </div>

        <div data-reveal className="lg:col-span-8">
          {result.ok ? (
            <LadderTable players={result.data.items} caption="Top 10 players in the global Legend League" />
          ) : (
            <LiveUnavailable reason={result.reason} />
          )}
        </div>
      </Container>
    </section>
  );
}
