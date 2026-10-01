import type { Metadata } from "next";
import { HideResult } from "@/components/v2/HideResult";
import { Container, PageIntro, Section } from "@/components/v2/Layout";
import { TeamPoster } from "@/components/v2/TeamPoster";
import { standingsAsOf, teams } from "@/data/teams";
import { PageArt } from "@/components/v2/PageArt";

export const metadata: Metadata = {
  title: "Teams",
  description: "The top teams of the 2026 Clash of Clans World Championship season, their Golden Tickets and season points.",
};

export default function TeamsPage() {
  const qualified = teams.filter((t) => t.qualified);
  const contenders = teams.filter((t) => !t.qualified);
  const byName = [...teams].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <PageIntro
        label={<HideResult safe="Season 2026">{`Season leaderboard · ${standingsAsOf}`}</HideResult>}
        title="Teams"
        aside={<PageArt name="queen" />}
        intro={
          <HideResult safe="Every team in the 2026 season. Ticket status and standings are hidden while “Hide results” is on.">
            Ordered by season points. Teams with a Golden Ticket are already booked for the World Finals; the rest fight for the last seats.
          </HideResult>
        }
      />
      <Container>
        <HideResult
          block
          safe={
            <Section id="all" title="All teams">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {byName.map((t) => (
                  <li key={t.slug} className="grid">
                    <TeamPoster team={t} neutral />
                  </li>
                ))}
              </ul>
            </Section>
          }
        >
          <Section id="qualified" label={`${qualified.length} booked`} title="Golden Ticket teams">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {qualified.map((t) => (
                <li key={t.slug} className="grid">
                  <TeamPoster team={t} />
                </li>
              ))}
            </ul>
          </Section>
          <Section id="contenders" title="Contenders">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {contenders.map((t) => (
                <li key={t.slug} className="grid">
                  <TeamPoster team={t} />
                </li>
              ))}
            </ul>
          </Section>
        </HideResult>
      </Container>
    </>
  );
}
