import type { Metadata } from "next";
import { Container, PageIntro, Section } from "@/components/v2/Layout";
import { StageRow } from "@/components/v2/StageRow";
import { stages } from "@/data/season";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Every stage of the 2026 Clash of Clans World Championship, in your time zone, with add-to-calendar links and spoiler-free results.",
};

export default function SchedulePage() {
  const upcoming = stages.filter((s) => s.status !== "completed");
  const completed = stages.filter((s) => s.status === "completed").reverse();
  return (
    <>
      <PageIntro
        label="Season 2026"
        title="Schedule"
        intro="Times show in your own time zone. Add any event to Google Calendar, Outlook or Apple Calendar. Turn on “Hide results” in the menu to keep winners hidden until you tap."
      />
      <Container>
        <Section id="upcoming" label="Next" title="Upcoming">
          <ol className="border-t border-rule">
            {upcoming.map((s) => (
              <StageRow key={s.slug} stage={s} />
            ))}
          </ol>
        </Section>
        <Section id="completed" label="Results" title="Completed">
          <ol className="border-t border-rule">
            {completed.map((s) => (
              <StageRow key={s.slug} stage={s} />
            ))}
          </ol>
        </Section>
      </Container>
    </>
  );
}
