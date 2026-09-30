import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LiveUnavailable } from "@/components/LiveUnavailable";
import { PageHeader } from "@/components/PageHeader";
import { PlayerSearch } from "@/components/PlayerSearch";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPlayer } from "@/lib/coc";
import { formatNumber } from "@/lib/format";
import { normalizeTag } from "@/lib/tags";

export async function generateMetadata({ params }: PageProps<"/players/[tag]">): Promise<Metadata> {
  const { tag: raw } = await params;
  const tag = normalizeTag(raw);
  if (!tag) return {};
  const result = await getPlayer(tag);
  return { title: result.ok ? `${result.data.name} (#${tag})` : `Player #${tag}` };
}

export default async function PlayerPage({ params }: PageProps<"/players/[tag]">) {
  const { tag: raw } = await params;
  const tag = normalizeTag(raw);
  if (!tag) notFound();

  const result = await getPlayer(tag);
  if (!result.ok && result.reason === "not-found") notFound();

  if (!result.ok) {
    return (
      <>
        <PageHeader eyebrow="Player profile" title={`#${tag}`} />
        <Container className="py-16">
          <LiveUnavailable reason={result.reason} />
        </Container>
      </>
    );
  }

  const p = result.data;
  const heroes = (p.heroes ?? []).filter((h) => h.village === "home");
  const stats = [
    ["Trophies", formatNumber(p.trophies)],
    ["Best trophies", formatNumber(p.bestTrophies)],
    ["War stars", formatNumber(p.warStars)],
    ["Attack wins", formatNumber(p.attackWins)],
    ["Defense wins", formatNumber(p.defenseWins)],
    ["Donations", formatNumber(p.donations)],
  ];

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex flex-wrap items-center gap-3">
            <Link href="/leaderboards" className="hover:text-gold-bright">
              Players
            </Link>
            <span aria-hidden className="text-muted">/</span>
            <span className="font-mono normal-case tracking-normal text-muted">#{tag}</span>
          </span>
        }
        title={p.name}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="qualified">Town Hall {p.townHallLevel}</Badge>
          <Badge tone="neutral">Level {p.expLevel}</Badge>
          {p.leagueTier && (
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              {p.leagueTier.iconUrls.small && (
                <Image src={p.leagueTier.iconUrls.small} alt="" width={32} height={32} className="h-8 w-8" />
              )}
              {p.leagueTier.name}
            </span>
          )}
          {p.clan && (
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              {p.clan.badgeUrls.small && <Image src={p.clan.badgeUrls.small} alt="" width={28} height={28} className="h-7 w-7" />}
              <span>
                <span className="font-semibold text-text">{p.clan.name}</span>
                {p.role && <span className="capitalize"> · {p.role === "admin" ? "elder" : p.role === "coLeader" ? "co-leader" : p.role}</span>}
              </span>
            </span>
          )}
        </div>
      </PageHeader>

      <Container className="py-16 sm:py-20">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {stats.map(([label, value]) => (
            <div key={label} data-reveal className="rounded-sm border border-line bg-surface p-5">
              <dt className="text-xs uppercase tracking-widest text-muted">{label}</dt>
              <dd className="mt-2 font-display text-3xl leading-none text-gold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>

        {heroes.length > 0 && (
          <section aria-labelledby="heroes" className="mt-16">
            <SectionHeader id="heroes" eyebrow="Home village" title="Heroes" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {heroes.map((h) => {
                const pct = Math.round((h.level / h.maxLevel) * 100);
                return (
                  <li key={h.name} data-reveal className="rounded-sm border border-line bg-surface p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold">{h.name}</span>
                      <span className="font-display text-2xl tabular-nums">
                        {h.level}
                        <span className="text-base text-muted"> / {h.maxLevel}</span>
                      </span>
                    </div>
                    <div
                      className="mt-3 h-1.5 overflow-hidden rounded-full bg-line"
                      role="progressbar"
                      aria-label={`${h.name} level`}
                      aria-valuenow={h.level}
                      aria-valuemin={0}
                      aria-valuemax={h.maxLevel}
                    >
                      <div className={pct === 100 ? "h-full bg-gold" : "h-full bg-elixir"} style={{ width: `${pct}%` }} />
                    </div>
                    {pct === 100 && <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-gold">Maxed</p>}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section aria-labelledby="lookup" className="mt-16 border-t border-line pt-10">
          <h2 id="lookup" className="sr-only">Look up another player</h2>
          <PlayerSearch />
          <p className="mt-6 text-xs text-muted">Live from the official Clash of Clans API · refreshed every 10 minutes.</p>
        </section>
      </Container>
    </>
  );
}
