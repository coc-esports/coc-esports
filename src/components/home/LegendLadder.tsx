import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SampleBadge } from "@/components/ui/SectionHeader";
import { ladder } from "@/data/samples";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

function Change({ value }: { value: number }) {
  if (value === 0) return <span className="text-muted">–<span className="sr-only">No change</span></span>;
  const up = value > 0;
  return (
    <span className={cn("tabular-nums", up ? "text-win" : "text-live")}>
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      {Math.abs(value)}
      <span className="sr-only">{up ? " places up" : " places down"}</span>
    </span>
  );
}

export function LegendLadder() {
  return (
    <section aria-labelledby="ladder" className="py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Legend League</p>
            <SampleBadge />
          </div>
          <h2 id="ladder" className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">
            Global ladder
          </h2>
          <p className="mt-4 text-muted">
            The top of the Legend League, straight from the game. In Phase 5 this table updates live from the official
            Clash of Clans API every few minutes.
          </p>
          <Button href="/leaderboards" variant="secondary" className="mt-8">
            Full ladder
          </Button>
        </div>

        <div data-reveal className="overflow-hidden rounded-sm border border-line lg:col-span-8">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Top 10 players in the Legend League (sample data)</caption>
            <thead className="bg-surface text-xs uppercase tracking-widest text-muted">
              <tr>
                <th scope="col" className="w-14 px-4 py-3 font-semibold">#</th>
                <th scope="col" className="px-4 py-3 font-semibold">Player</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Trophies</th>
                <th scope="col" className="hidden w-20 px-4 py-3 text-right font-semibold sm:table-cell">24h</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ladder.map((p) => (
                <tr key={p.rank} className="transition-colors duration-150 hover:bg-surface/60">
                  <td className={cn("px-4 py-3 font-display text-lg tabular-nums", p.rank <= 3 ? "text-gold" : "text-muted")}>
                    {p.rank}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-muted">{p.clan}</p>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{formatNumber(p.trophies)}</td>
                  <td className="hidden px-4 py-3 text-right sm:table-cell">
                    <Change value={p.change} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
