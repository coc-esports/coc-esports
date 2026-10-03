import type { Metadata } from "next";
import { NextBroadcast } from "@/components/v2/NextBroadcast";
import { Container, PageIntro, Section } from "@/components/v2/Layout";
import { TwitchEmbed } from "@/components/v2/TwitchEmbed";
import { vods } from "@/data/samples";
import { season } from "@/data/season";
import { ExternalIcon } from "@/components/v2/Icons";
import { PageArt } from "@/components/v2/PageArt";

export const metadata: Metadata = {
  title: "Watch",
  description: "Where to watch the Clash of Clans World Championship live, plus past broadcasts.",
};

export default function WatchPage() {
  return (
    <>
      <PageIntro
        aside={<PageArt name="th18" />}
        title="Watch"
        intro="Every stage streams on the official Clash of Clans channels. Gildra links straight to them: no re-streams, no ads."
      />
      <Container>
        <div className="pt-12">
          <NextBroadcast name={season.nextEvent.name} startTime={season.nextEvent.startTime} calendarHref={`/calendar/${season.nextEvent.href.split("/").pop()}`} />
        </div>
        <Section id="live" title="Live on Twitch" intro="When nothing is live, the player shows the channel's offline screen. It opens muted.">
          <div className="max-w-5xl">
            <TwitchEmbed channel="clashofclans" />
          </div>
        </Section>
        <Section id="vault" title="From the vault">
          <ul className="grid border-t border-rule">
            {vods.map((v) => (
              <li key={v.id}>
                <a href={v.href} target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-center justify-between gap-4 border-b border-rule py-5">
                  <span className="grid gap-2">
                    <span className="font-cond text-h2 uppercase text-bone group-hover:text-bolt">{v.title}</span>
                    <span className="font-data text-label uppercase text-steel">{v.meta}</span>
                  </span>
                  <span className="inline-flex h-11 items-center gap-2 rounded-hair border border-rule px-4 font-text text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-bone transition-colors group-hover:border-bolt">
                    Watch on YouTube <ExternalIcon />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </>
  );
}
