import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/news";
import { vods } from "@/data/samples";
import { season, stages } from "@/data/season";
import { formatDate } from "@/lib/format";
import { nextEvent, roadStops, seats } from "@/lib/season-view";
import { Button } from "../Button";
import { Container, Section } from "../Layout";
import { LocalTime } from "../LocalTime";
import { StatusTag } from "../Status";
import { Label } from "../Type";
import { RoadTimeline } from "../motion/RoadTimeline";
import { TicketFlip } from "../motion/TicketFlip";

// Next up: the event days of the next stage. Individual match times aren't published yet, so the page
// shows the days and the official start time instead of inventing matchups (CLAUDE.md: never invent results).
export function NextUp() {
  const event = nextEvent();
  const stage = event.stage;
  const rounds = stage?.bracket ? [...stage.bracket.upper.map((r) => r.name), ...stage.bracket.lower.map((r) => r.name), stage.bracket.final.name] : [];
  return (
    <Container>
      <Section id="next" label="Next up" title={event.name} href="/schedule" linkLabel="Full schedule">
        <ol className="grid border-t border-rule">
          {(stage?.schedule ?? [{ label: "Starts", dates: stage?.dateLabel ?? "TBA" }]).map((day, i) => (
            <li key={day.label} className="grid items-center gap-x-6 gap-y-2 border-b border-rule py-5 sm:grid-cols-[10rem_minmax(0,1fr)_auto]">
              <span className="font-cond text-h3 font-black uppercase text-bone">{day.label}</span>
              <span className="grid gap-1">
                <span className="font-data text-sm text-bone">{day.dates}</span>
                <span className="text-sm text-steel">
                  {i === 0 ? (
                    <>
                      First match <LocalTime iso={event.startTime} className="text-bone" />
                    </>
                  ) : (
                    "Match times announced by the organiser"
                  )}
                </span>
              </span>
              <StatusTag status="upcoming" className="w-fit" />
            </li>
          ))}
        </ol>
        {rounds.length ? (
          <p className="max-w-[70ch] text-steel">
            Format: {rounds.join(" → ")}. Matchups appear on the{" "}
            <Link href={event.href} className="text-bone underline decoration-bolt underline-offset-4 hover:text-bolt">
              bracket
            </Link>{" "}
            as soon as they&apos;re set.
          </p>
        ) : null}
      </Section>
    </Container>
  );
}

export function ChosenEightBand() {
  return (
    <Container>
      <Section
        id="chosen-eight"
        label="Golden Tickets"
        title="The Chosen Eight"
        href="/worlds"
        linkLabel="How teams qualify"
        intro={`Eight seats at the World Finals. Each one is won, never given: four Monthly Finals, the China Regional, and the top three of the Last Chance Qualifier.`}
      >
        <TicketFlip seats={seats()} />
      </Section>
    </Container>
  );
}

export function RoadBand() {
  return (
    <Container className="py-16 sm:py-24">
      <RoadTimeline stops={roadStops()} label="The season" title="Road to Worlds" />
    </Container>
  );
}

// For curious players: the whole format in three steps (a real sequence, so the numbers carry meaning).
export function HowItWorks() {
  const monthly = stages.filter((s) => s.kind === "monthly").length;
  const steps = [
    { n: "01", title: "Monthly Qualifiers", body: `${monthly} months, each a 128-team double-elimination qualifier. The top 8 meet in a Monthly Final.` },
    { n: "02", title: "Golden Tickets", body: "Each Monthly Final winner, the China Regional champion and the top 3 of the Last Chance Qualifier earn a seat." },
    { n: "03", title: "World Finals", body: `Eight teams, double elimination, ${season.finalsPrize}. Every war is 5v5 on ${season.townHall}.` },
  ];
  return (
    <Container>
      <Section id="how" label="New here?" title="From 128 teams to one champion" href="/news/how-worlds-2026-works" linkLabel="Read the explainer">
        <ol className="grid gap-px overflow-hidden rounded-hair border border-rule bg-rule md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="grid content-start gap-4 bg-ink p-6 sm:p-8">
              <span className="font-data text-label text-bolt">{s.n}</span>
              <h3 className="font-cond text-h2 font-black uppercase text-bone">{s.title}</h3>
              <p className="text-steel">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </Container>
  );
}

export function NewsBand() {
  const [lead, ...rest] = articles;
  return (
    <Container>
      <Section id="news" label="News" title="Latest" href="/news" linkLabel="All news">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Link href={`/news/${lead.slug}`} className="group grid gap-5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-hair bg-graphite">
              {lead.art ? (
                <Image src={lead.art.src} alt={lead.art.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover grayscale-[35%] transition-[transform,filter] duration-700 ease-expo group-hover:scale-[1.03] group-hover:grayscale-0" />
              ) : null}
            </div>
            <div className="grid gap-3">
              <Label>
                {lead.category} · {formatDate(lead.date)}
              </Label>
              <h3 className="font-cond text-h2 font-black uppercase text-bone group-hover:text-bolt">{lead.title}</h3>
              <p className="max-w-[60ch] text-steel">{lead.excerpt}</p>
            </div>
          </Link>
          <ul className="grid content-start border-t border-rule">
            {rest.map((a) => (
              <li key={a.slug}>
                <Link href={`/news/${a.slug}`} className="group grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-5 border-b border-rule py-5">
                  <span className="grid gap-2">
                    <Label>
                      {a.category} · {formatDate(a.date)}
                    </Label>
                    <span className="font-cond text-h3 font-black uppercase text-bone group-hover:text-bolt">{a.title}</span>
                  </span>
                  <span className="relative aspect-square overflow-hidden rounded-hair bg-graphite">
                    {a.art ? <Image src={a.art.src} alt="" fill sizes="6rem" className="object-cover" /> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </Container>
  );
}

export function WatchBand() {
  return (
    <Container>
      <Section id="watch" label="Broadcasts" title="Watch it live" href="/watch" linkLabel="All videos">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="grid content-start gap-5">
            <p className="max-w-[46ch] text-lead text-steel">Every match streams on the official Clash of Clans channels. Gildra links straight to them: no re-streams, no ads.</p>
            <div className="flex flex-wrap gap-3">
              <Button href="https://www.youtube.com/@ClashofClans" target="_blank" rel="noopener noreferrer">
                YouTube ↗
              </Button>
              <Button href="https://www.twitch.tv/clashofclans" variant="outline" target="_blank" rel="noopener noreferrer">
                Twitch ↗
              </Button>
            </div>
          </div>
          <ul className="grid border-t border-rule">
            {vods.slice(0, 4).map((v) => (
              <li key={v.id}>
                <a href={v.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-b border-rule py-4">
                  <span className="font-cond text-h3 font-black uppercase text-bone group-hover:text-bolt">{v.title}</span>
                  <span className="shrink-0 font-data text-label uppercase text-steel">{v.meta} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </Container>
  );
}
