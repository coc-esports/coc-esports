import Image from "next/image";
import Link from "next/link";
import { ArticleTitle } from "@/components/v2/ArticleTitle";
import { HideResult } from "@/components/v2/HideResult";
import { ExternalIcon } from "@/components/v2/Icons";
import { codeBars } from "@/components/v2/TeamPoster";
import { articles } from "@/data/news";
import { vods } from "@/data/samples";
import { season } from "@/data/season";
import { formatDate } from "@/lib/format";
import { roadStops } from "@/lib/season-view";
import { ChapterMotion } from "./ChapterMotion";

// The chapters after the hero. Ideas and sources: the TH18 war map as a cinematic scene (War Map direction +
// POTATO reel: the object melted into the page), two giant lines crossing (Dennis Snellenberg),
// the season as pinned ticket stubs drifting sideways (The Romans), news on bone paper with strict editorial
// grids (SN2), broadcast passes for the official channels (event accreditation, the Will Call world).

const pad = "px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]";

function WarChapter() {
  const facts = [
    ["5 v 5", "Five players a side, every war."],
    ["45 min", "Five minutes to scout, forty-five to attack."],
    ["1 base", `Everyone plays the same max-level ${season.townHall}.`],
  ];
  return (
    <section data-war className="relative overflow-hidden bg-ink py-[16vh]" aria-labelledby="war-title">
      <div aria-hidden className="absolute inset-0">
        <Image data-war-map src="/art/th18-warmap.webp" alt="" fill sizes="100vw" className="scale-110 object-cover opacity-35 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--ink),transparent_30%,transparent_70%,var(--ink))]" />
      </div>
      <h2 id="war-title" className="relative z-10 px-4 font-cond text-[clamp(2.75rem,12vw,14rem)] uppercase leading-[0.84] text-bone sm:whitespace-nowrap sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <span data-line-a className="block">Every war</span>
        <span data-line-b className="block text-right text-bolt">Town Hall 18</span>
      </h2>
      <div data-th className="relative z-0 mx-auto -mt-[20vw] w-[min(76vw,44rem)] will-change-transform">
        <Image src="/art/th18-cold.webp" alt="Town Hall 18, the base every World Championship war is played on (Supercell Fan Kit)" width={1400} height={1400} sizes="(min-width: 768px) 44rem, 76vw" className="h-auto w-full drop-shadow-[0_50px_90px_rgba(5,3,30,0.7)]" />
      </div>
      <div className={`relative z-10 mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-3 ${pad} lg:px-8`}>
        {facts.map(([big, small]) => (
          <div key={big} className="grid gap-2 border-t border-rule pt-4">
            <span className="font-cond text-6xl uppercase text-bone">{big}</span>
            <span className="text-steel">{small}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RoadChapter() {
  const stops = roadStops();
  return (
    <section data-road className="relative h-[100svh] overflow-hidden bg-ink" aria-labelledby="road-title">
      <div aria-hidden className="guilloche absolute inset-0 opacity-25" />
      <div data-road-head className={`absolute inset-x-0 top-[calc(var(--nav-h)+1rem)] z-10 flex items-end justify-between gap-6 ${pad}`}>
        <h2 id="road-title" data-reveal className="font-cond text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-none text-bone">
          <span className="reveal-line"><span>The road to Worlds</span></span>
        </h2>
        <Link href="/schedule" className="inline-flex min-h-11 items-center font-text text-sm font-semibold uppercase tracking-[0.12em] text-bone underline decoration-bolt decoration-2 underline-offset-[6px] hover:text-bolt">
          Full schedule
        </Link>
      </div>
      <ol data-road-track data-scroll-track className={`flex h-full w-max items-center gap-6 pt-16 ${pad}`}>
        {stops.map((s, i) => (
          <li key={s.slug} className={`stub-card relative grid h-[min(26rem,58svh)] w-[min(78vw,22rem)] shrink-0 grid-rows-[1fr_auto] ${s.state === "next" ? "bg-[linear-gradient(160deg,var(--stub-next),var(--graphite))]" : s.state === "done" ? "bg-[var(--stub-done)]" : "bg-[var(--stub-later)]"}`}>
            <Link href={`/stages/${s.slug}`} className="grid content-end gap-4 p-6 outline-none">
              <span className={`font-cond text-[clamp(3.5rem,6vw,5.5rem)] uppercase leading-[0.85] ${s.state === "next" ? "text-bolt" : s.state === "done" ? "text-steel" : "text-bone"}`}>{s.date}</span>
              <span className="font-cond text-3xl uppercase leading-none text-bone">{s.name}</span>
            </Link>
            {/* below the tear line: the stub */}
            <div className="grid h-20 content-center gap-1.5 overflow-hidden border-t border-dashed border-rule px-6">
              <span className="flex items-center justify-between font-data text-label uppercase text-steel">
                <span>No. {String(i + 1).padStart(2, "0")} · GLD-2026</span>
                <span className={s.state === "next" ? "text-bolt" : ""}>{s.state === "done" ? "Played" : s.state === "next" ? "Next" : "Later"}</span>
              </span>
              {s.state === "done" && s.spoiler ? (
                <span className="font-data text-label uppercase text-bone">
                  <HideResult safe="Winner hidden">{s.note.replace("Won by ", "Admitted: ")}</HideResult>
                </span>
              ) : (
                <span className="truncate text-sm text-steel">{s.note}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PaperNews() {
  const [lead, ...rest] = articles;
  return (
    <section className="perf-top relative bg-paper text-paper-ink" aria-labelledby="news-title">
      <div className={`grid gap-12 py-24 ${pad}`}>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-paper-ink pb-4">
          <h2 id="news-title" data-reveal className="font-cond text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.85]">
            <span className="reveal-line"><span>From the</span></span>
            <span className="reveal-line"><span>press box</span></span>
          </h2>
          <Link href="/news" className="inline-flex min-h-11 items-center font-text text-sm font-semibold uppercase tracking-[0.12em] underline decoration-[var(--graphite)] decoration-2 underline-offset-[6px] hover:text-[var(--graphite)]">
            All news
          </Link>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Link href={`/news/${lead.slug}`} className="group grid content-start gap-5">
            <span className="relative aspect-[16/9] overflow-hidden bg-[var(--paper-shade)]">
              {lead.art ? <Image src={lead.art.src} alt={lead.art.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.03]" /> : null}
            </span>
            <span className="font-cond text-[clamp(2.25rem,4vw,3.5rem)] uppercase leading-[0.9] group-hover:text-[var(--graphite)]">
              <ArticleTitle article={lead} />
            </span>
            <span className="font-data text-label uppercase text-paper-ink-2">
              {lead.category} · {formatDate(lead.date)}
            </span>
            <span className="max-w-[60ch] text-lead text-paper-ink-2">{lead.excerpt}</span>
          </Link>
          <ul className="grid content-start gap-10">
            {rest.map((a) => (
              <li key={a.slug}>
                <Link href={`/news/${a.slug}`} className="group grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <span className="relative aspect-[16/9] overflow-hidden bg-[var(--paper-shade)]">
                    {a.art ? <Image src={a.art.src} alt="" fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.03]" /> : null}
                  </span>
                  <span className="grid content-start gap-2">
                    <span className="font-cond text-[1.9rem] uppercase leading-[0.92] group-hover:text-[var(--graphite)]">
                      <ArticleTitle article={a} />
                    </span>
                    <span className="font-data text-label uppercase text-paper-ink-2">
                      {a.category} · {formatDate(a.date)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WatchPasses() {
  const passes = [
    { name: "YouTube", href: "https://www.youtube.com/@ClashofClans", note: "Every stage, live and on demand" },
    { name: "Twitch", href: "https://www.twitch.tv/clashofclans", note: "Live with chat" },
  ];
  return (
    <section className="perf-top relative bg-ink" aria-labelledby="watch-title">
      <div className={`grid gap-12 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] ${pad}`}>
        <div className="grid content-start gap-5">
          <h2 id="watch-title" data-reveal className="font-cond text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.85] text-bone">
            <span className="reveal-line"><span>Broadcast</span></span>
            <span className="reveal-line"><span>passes</span></span>
          </h2>
          <p className="max-w-[44ch] text-lead text-steel">Every match streams on the official Clash of Clans channels. Gildra links straight to them: no re-streams, no ads.</p>
          <div className="flex flex-wrap gap-4 pt-2">
            {passes.map((p, i) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pass group relative grid w-60 grid-rows-[auto_1fr_auto] overflow-hidden bg-bone text-ink shadow-[0_30px_60px_-28px_rgba(5,3,30,0.95)] transition-transform duration-500 ease-expo hover:-translate-y-1.5 hover:-rotate-2"
              >
                <span aria-hidden className="mx-auto mt-3 h-2.5 w-12 rounded-full bg-ink" />
                <span className="grid content-end gap-3 px-5 pb-5 pt-8">
                  <span className="flex items-center gap-2 font-cond text-5xl uppercase leading-none">
                    {p.name} <ExternalIcon className="text-[0.5em]" />
                  </span>
                  <span className="text-sm text-ink/75">{p.note}</span>
                </span>
                <span className="grid gap-2 bg-ink px-5 py-3 text-bone">
                  <span className="flex justify-between font-data text-label uppercase text-steel">
                    <span>Broadcast pass · 2026</span>
                    <span>BP-0{i + 1}</span>
                  </span>
                  <span aria-hidden className="flex h-5 items-stretch gap-[2px] opacity-80">
                    {codeBars(p.name.toLowerCase() + "gildra").map((w, k) => (
                      <span key={k} className="bg-steel" style={{ width: `${w}px` }} />
                    ))}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <ul className="grid content-start border-t border-rule">
          {vods.slice(0, 4).map((v) => (
            <li key={v.id}>
              <a href={v.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-b border-rule py-5">
                <span className="grid gap-1">
                  <span className="font-cond text-[1.9rem] uppercase leading-none text-bone group-hover:text-bolt">{v.title}</span>
                  <span className="font-data text-label uppercase text-steel">{v.meta}</span>
                </span>
                <span className="inline-flex h-11 shrink-0 items-center gap-2 border border-rule px-4 font-text text-xs font-semibold uppercase tracking-[0.12em] text-bone transition-colors group-hover:border-bolt group-hover:text-bolt">
                  Watch <ExternalIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeChapters() {
  return (
    <ChapterMotion>
      <WarChapter />
      <RoadChapter />
      <PaperNews />
      <WatchPasses />
    </ChapterMotion>
  );
}

// The season road on its own (used on /worlds), with its pinned sideways scroll.
export function SeasonRoad() {
  return (
    <ChapterMotion>
      <RoadChapter />
    </ChapterMotion>
  );
}
