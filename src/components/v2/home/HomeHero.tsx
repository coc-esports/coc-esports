import { season } from "@/data/season";
import { claimedCount, inEventMode, nextEvent } from "@/lib/season-view";
import { Button } from "../Button";
import { Countdown } from "../Countdown";
import { DisplayHeading, Label } from "../Type";
import { HeroStage } from "../motion/HeroStage";

// Event-aware hero (docs/plan.md): during the LCQ window it leads with the countdown and the ticket race;
// otherwise it shows the World Championship. Re-rendered hourly (ISR) so the mode switches by itself.
export function HomeHero() {
  const event = nextEvent();
  const eventMode = inEventMode();
  const open = 8 - claimedCount();
  const slug = event.href.split("/").pop();

  return (
    <section className="border-b border-rule">
      <div className="mx-auto w-full max-w-page px-4 pb-14 pt-[calc(var(--nav-h)+2rem)] sm:px-8 sm:pb-20 lg:pt-[calc(var(--nav-h)+3.5rem)]">
        <HeroStage>
          <Label tone="bolt">
            {eventMode ? `${event.name} · ${event.stage?.dateLabel ?? ""}` : `${season.name} · ${season.prizePool}`}
          </Label>
          {eventMode ? (
            <DisplayHeading
              as="h1"
              size="mega"
              className="mt-4"
              lines={[["Three", { image: { src: "/art/th18-warm.webp", alt: "" } }], ["tickets"], [{ em: "left." }]]}
            />
          ) : (
            <DisplayHeading as="h1" size="mega" className="mt-4" lines={[["World", { image: { src: "/art/th18-warm.webp", alt: "" } }], ["Championship"], [{ em: "2026" }]]} />
          )}
          <p className="mt-6 max-w-[44ch] text-lead text-steel">
            {eventMode
              ? "Eight teams. Double elimination. The top three take the last Golden Tickets to the World Finals."
              : `${season.finalsPrize} at the World Finals. Eight teams. Every match on ${season.townHall}. ${open} seats still open.`}
          </p>
          <div className="mt-8">
            <Countdown target={event.startTime} end={event.stage?.endTime} label={`Time until the ${event.name}`} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/watch">Where to watch</Button>
            <Button href={event.href} variant="outline">
              {eventMode ? "See the bracket" : "Follow the road"}
            </Button>
            <Button href={`/calendar/${slug}`} variant="text" prefetch={false} download className="h-12">
              Add to calendar
            </Button>
          </div>
        </HeroStage>
      </div>
    </section>
  );
}
