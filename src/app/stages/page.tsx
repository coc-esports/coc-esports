import type { Metadata } from "next";
import { Container, PageIntro, Section } from "@/components/v2/Layout";
import { StageRow } from "@/components/v2/StageRow";
import { stages } from "@/data/season";

export const metadata: Metadata = {
  title: "Stages",
  description: "Every stage of the 2026 Clash of Clans World Championship: Monthly Finals, China Regional, Last Chance Qualifier and World Finals.",
};

export default function StagesPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Worlds", href: "/worlds" }]}
        label="Season 2026"
        title="Stages"
        intro="Four Monthly Finals, the China Regional Qualifier and the Last Chance Qualifier decide the eight teams at the World Finals."
      />
      <Container>
        <Section id="all" label="In order" title="Every stage">
          <ol className="border-t border-rule">
            {stages.map((s) => (
              <StageRow key={s.slug} stage={s} />
            ))}
          </ol>
        </Section>
      </Container>
    </>
  );
}
