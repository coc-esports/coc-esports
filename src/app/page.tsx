import { Hero } from "@/components/home/Hero";
import { NextMatches } from "@/components/home/NextMatches";
import { ChosenEight } from "@/components/home/ChosenEight";
import { NewsGrid } from "@/components/home/NewsGrid";
import { RoadToWorlds } from "@/components/home/RoadToWorlds";
import { LegendLadder } from "@/components/home/LegendLadder";
import { Vault } from "@/components/home/Vault";
import { StatBand } from "@/components/home/StatBand";

// Home page bands, in the Riot rhythm from PLAN.md §5.
export default function Home() {
  return (
    <>
      <Hero />
      <NextMatches />
      <ChosenEight />
      <StatBand />
      <NewsGrid />
      <RoadToWorlds />
      <LegendLadder />
      <Vault />
    </>
  );
}
