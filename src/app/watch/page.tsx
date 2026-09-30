import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TwitchEmbed } from "@/components/TwitchEmbed";
import { Vault } from "@/components/home/Vault";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRight } from "@/components/icons";
import { season } from "@/data/season";

export const metadata: Metadata = {
  title: "Watch",
  description: "Where to watch the Clash of Clans World Championship live, plus past broadcasts.",
};

export default function WatchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Broadcasts"
        title="Watch"
        intro={`Every stage is broadcast on the official Clash of Clans channels. Next up: the ${season.nextEvent.name}.`}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="https://www.youtube.com/@ClashofClans" target="_blank" rel="noopener noreferrer">
            YouTube <ArrowUpRight />
          </Button>
          <Button href="https://www.twitch.tv/clashofclans" target="_blank" rel="noopener noreferrer" variant="secondary">
            Twitch <ArrowUpRight />
          </Button>
        </div>
      </PageHeader>

      <section aria-labelledby="live" className="py-16 sm:py-20">
        <Container>
          <SectionHeader id="live" eyebrow="Official channel" title="Live on Twitch" />
          <div data-reveal className="max-w-4xl">
            <TwitchEmbed channel="clashofclans" />
            <p className="mt-3 text-sm text-muted">
              When nothing is live, the player shows the channel&apos;s offline screen. Opens muted.
            </p>
          </div>
        </Container>
      </section>

      <Vault />
    </>
  );
}
