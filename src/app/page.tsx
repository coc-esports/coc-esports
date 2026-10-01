import { HomeHero } from "@/components/v2/home/HomeHero";
import { ChosenEightBand, HowItWorks, NewsBand, NextUp, WatchBand } from "@/components/v2/home/HomeSections";

// Re-render at most hourly so the event-aware hero switches mode on its own after the LCQ.
export const revalidate = 3600;

// Home (docs/plan.md): answer "what's next, when, where to watch" first, then the race to Worlds.
// The full season timeline lives on /worlds only, so the two pages don't repeat each other.
export default function Home() {
  return (
    <>
      <HomeHero />
      <NextUp />
      <ChosenEightBand />
      <HowItWorks />
      <NewsBand />
      <WatchBand />
    </>
  );
}
