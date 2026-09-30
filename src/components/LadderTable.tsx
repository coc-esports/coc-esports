import Image from "next/image";
import Link from "next/link";
import type { RankedPlayer } from "@/lib/coc";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

function Change({ player }: { player: RankedPlayer }) {
  const value = player.previousRank > 0 ? player.previousRank - player.rank : 0;
  if (player.previousRank <= 0) return <span className="text-xs text-elixir-text">New</span>;
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

// Legend League ranking rows from the official API. Player names link to live profiles.
export function LadderTable({ players, caption, showWins = false }: { players: RankedPlayer[]; caption: string; showWins?: boolean }) {
  return (
    <div className="overflow-hidden rounded-sm border border-line">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface text-xs uppercase tracking-widest text-muted">
          <tr>
            <th scope="col" className="w-16 px-4 py-3 font-semibold">#</th>
            <th scope="col" className="px-4 py-3 font-semibold">Player</th>
            {showWins && <th scope="col" className="hidden px-4 py-3 text-right font-semibold md:table-cell">Attack wins</th>}
            <th scope="col" className="px-4 py-3 text-right font-semibold">Trophies</th>
            <th scope="col" className="hidden w-20 px-4 py-3 text-right font-semibold sm:table-cell">Change</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {players.map((p) => (
            <tr key={p.tag} className="transition-colors duration-150 hover:bg-surface/60">
              <td className={cn("px-4 py-3 font-display text-lg tabular-nums", p.rank <= 3 ? "text-gold" : "text-muted")}>{p.rank}</td>
              <td className="px-4 py-3">
                <Link href={`/players/${p.tag.replace("#", "")}`} className="group flex min-w-0 items-center gap-3">
                  {p.clan?.badgeUrls.small ? (
                    <Image src={p.clan.badgeUrls.small} alt="" width={28} height={28} className="h-7 w-7 shrink-0" />
                  ) : (
                    <span className="h-7 w-7 shrink-0" aria-hidden />
                  )}
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">
                      <span className="title-underline">{p.name}</span>
                    </span>
                    <span className="block truncate text-xs text-muted">{p.clan?.name ?? "No clan"}</span>
                  </span>
                </Link>
              </td>
              {showWins && <td className="hidden px-4 py-3 text-right tabular-nums text-muted md:table-cell">{formatNumber(p.attackWins)}</td>}
              <td className="px-4 py-3 text-right font-semibold tabular-nums">{formatNumber(p.trophies)}</td>
              <td className="hidden px-4 py-3 text-right sm:table-cell">
                <Change player={p} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
