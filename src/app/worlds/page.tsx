import type { Metadata } from "next";
import { Bracket } from "@/components/Bracket";
import { PageHeader } from "@/components/PageHeader";
import { Rules } from "@/components/Rules";
import { Standings } from "@/components/Standings";
import { ChosenEight } from "@/components/home/ChosenEight";
import { RoadToWorlds } from "@/components/home/RoadToWorlds";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getStage, season } from "@/data/season";

export const metadata: Metadata = {
  title: "World Championship 2026",
  description: "The Chosen Eight, the World Finals bracket, season standings and the full road to the 2026 Clash of Clans World Championship.",
};

export default function WorldsPage() {
  const finals = getStage("worlds-2026")!;
  const stats = [
    [season.prizePool, "Season prize pool"],
    [season.finalsPrize, "At the World Finals"],
    [String(season.teamsAtWorlds), "Teams"],
    [season.townHall, "Every match"],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Clash of Clans esports"
        title="World Championship 2026"
        intro="Four monthly champions, the China Regional champion and three Last Chance qualifiers. Eight teams, one double-elimination bracket, one world title."
      >
        <dl className="grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dd className="font-display text-3xl leading-none text-gold tabular-nums sm:text-4xl">{value}</dd>
              <dt className="mt-1.5 text-xs uppercase tracking-widest text-muted">{label}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#bracket">See the bracket</Button>
          <Button href="/schedule" variant="secondary">
            Schedule
          </Button>
        </div>
      </PageHeader>

      <div id="qualified" className="scroll-mt-16">
        <ChosenEight />
      </div>

      <section id="bracket" aria-labelledby="bracket-title" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeader id="bracket-title" eyebrow={`${finals.dateLabel} · ${finals.prize}`} title="World Finals bracket" />
          <p data-reveal className="-mt-2 mb-10 max-w-2xl text-muted">
            8 teams, double elimination. Seeding and matchups are set once all eight Golden Tickets are decided. Hover a
            team to follow its path.
          </p>
          <Bracket bracket={finals.bracket!} label="World Finals bracket" />
        </Container>
      </section>

      <section id="standings" aria-labelledby="standings-title" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeader id="standings-title" eyebrow="Leaderboard" title="Season standings" href="/teams" linkLabel="All teams" />
          <Standings />
        </Container>
      </section>

      <RoadToWorlds />

      <section id="format" aria-labelledby="format-title" className="scroll-mt-16 py-20 sm:py-28">
        <Container>
          <SectionHeader id="format-title" eyebrow="Rules" title="How a war is won" href="/news/how-worlds-2026-works" linkLabel="Full format" />
          <Rules />
        </Container>
      </section>
    </>
  );
}
