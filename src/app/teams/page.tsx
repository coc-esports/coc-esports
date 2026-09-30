import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TeamCard } from "@/components/TeamCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { standingsAsOf, teams } from "@/data/teams";

export const metadata: Metadata = {
  title: "Teams",
  description: "The teams chasing the 2026 Clash of Clans World Championship: Golden Ticket holders and Last Chance Qualifier contenders.",
};

export default function TeamsPage() {
  const qualified = teams.filter((t) => t.qualified);
  const contenders = teams.filter((t) => !t.qualified);

  return (
    <>
      <PageHeader
        eyebrow="Season 2026"
        title="Teams"
        intro={`The top of the season leaderboard ${standingsAsOf}. Golden Ticket holders are already in the World Finals; the rest fight for the last three tickets at the LCQ.`}
      />
      <Container className="py-16 sm:py-20">
        <section aria-labelledby="qualified-teams">
          <SectionHeader id="qualified-teams" eyebrow="Golden Ticket" title="Qualified for Worlds" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qualified.map((t) => (
              <li key={t.slug} className="grid">
                <TeamCard team={t} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="contenders" className="mt-20">
          <SectionHeader id="contenders" eyebrow="Last Chance Qualifier" title="In the running" href="/worlds#standings" linkLabel="Standings" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contenders.map((t) => (
              <li key={t.slug} className="grid">
                <TeamCard team={t} />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
