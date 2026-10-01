import type { Metadata } from "next";
import { Container, PageIntro, Section } from "@/components/v2/Layout";
import { TeamPoster } from "@/components/v2/TeamPoster";
import { standingsAsOf, teams } from "@/data/teams";

export const metadata: Metadata = {
  title: "Teams",
  description: "The top teams of the 2026 Clash of Clans World Championship season, their Golden Tickets and season points.",
};

export default function TeamsPage() {
  const qualified = teams.filter((t) => t.qualified);
  const contenders = teams.filter((t) => !t.qualified);
  return (
    <>
      <PageIntro label={`Season leaderboard · ${standingsAsOf}`} title="Teams" intro="Ordered by season points. Teams with a Golden Ticket are already booked for the World Finals; the rest fight for the last seats." />
      <Container>
        <Section id="qualified" label={`${qualified.length} booked`} title="Golden Ticket teams">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {qualified.map((t) => (
              <li key={t.slug} className="grid">
                <TeamPoster team={t} />
              </li>
            ))}
          </ul>
        </Section>
        <Section id="contenders" label="Still chasing" title="Contenders">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {contenders.map((t) => (
              <li key={t.slug} className="grid">
                <TeamPoster team={t} />
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </>
  );
}
