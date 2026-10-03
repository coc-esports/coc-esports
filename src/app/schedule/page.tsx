import type { Metadata } from "next";
import { Container, PageIntro, Section } from "@/components/v2/Layout";
import { StageRow } from "@/components/v2/StageRow";
import { stages } from "@/data/season";
import { chronological } from "@/lib/season-view";
import { PageArt } from "@/components/v2/PageArt";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Every stage of the 2026 Clash of Clans World Championship, in your time zone, with add-to-calendar links and spoiler-free results.",
};

export default function SchedulePage() {
  const upcoming = chronological(stages.filter((s) => s.status !== "completed"));
  const completed = stages.filter((s) => s.status === "completed").reverse();
  return (
    <>
      <PageIntro
        title="Schedule"
        aside={<PageArt name="warden" />}
        intro="Every stage of the 2026 season, in your own time zone."
      />
      <Container>
        <Section id="upcoming" title="Upcoming">
          <ol className="grid">
            {upcoming.map((s) => (
              <StageRow key={s.slug} stage={s} chip={false} />
            ))}
          </ol>
        </Section>
        <Section id="completed" title="Completed">
          <ol className="grid">
            {completed.map((s) => (
              <StageRow key={s.slug} stage={s} chip={false} />
            ))}
          </ol>
        </Section>
      </Container>
    </>
  );
}
