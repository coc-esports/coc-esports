import type { Metadata } from "next";
import { Button } from "@/components/v2/Button";
import { Container, PageIntro, Section } from "@/components/v2/Layout";
import { TwitchEmbed } from "@/components/v2/TwitchEmbed";
import { vods } from "@/data/samples";
import { season } from "@/data/season";

export const metadata: Metadata = {
  title: "Watch",
  description: "Where to watch the Clash of Clans World Championship live, plus past broadcasts.",
};

export default function WatchPage() {
  return (
    <>
      <PageIntro
        label="Official broadcasts"
        title="Watch"
        intro={`Every stage streams on the official Clash of Clans channels. Next up: the ${season.nextEvent.name}.`}
        actions={
          <>
            <Button href="https://www.youtube.com/@ClashofClans" target="_blank" rel="noopener noreferrer">
              YouTube ↗
            </Button>
            <Button href="https://www.twitch.tv/clashofclans" variant="outline" target="_blank" rel="noopener noreferrer">
              Twitch ↗
            </Button>
          </>
        }
      />
      <Container>
        <Section id="live" label="Official channel" title="Live on Twitch" intro="When nothing is live, the player shows the channel's offline screen. It opens muted.">
          <div className="max-w-5xl">
            <TwitchEmbed channel="clashofclans" />
          </div>
        </Section>
        <Section id="vault" label="Past broadcasts" title="From the vault">
          <ul className="grid border-t border-rule">
            {vods.map((v) => (
              <li key={v.id}>
                <a href={v.href} target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-center justify-between gap-4 border-b border-rule py-5">
                  <span className="font-cond text-h2 font-black uppercase text-bone group-hover:text-bolt">{v.title}</span>
                  <span className="font-data text-label uppercase text-steel">{v.meta} · YouTube ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </>
  );
}
