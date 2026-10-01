import type { Metadata } from "next";
import { Container, PageIntro, Section } from "@/components/v2/Layout";
import { StageRow } from "@/components/v2/StageRow";
import { stages } from "@/data/season";
import { chronological } from "@/lib/season-view";
import { PageArt } from "@/components/v2/PageArt";

export const metadata: Metadata = {
  title: "Stages",
  description: "Every stage of the 2026 Clash of Clans World Championship: Monthly Finals, China Regional, Last Chance Qualifier and World Finals.",
};

export default function StagesPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Worlds", href: "/worlds" }]}
        title="Stages"
        aside={<PageArt name="champion" />}
        intro="Four Monthly Finals, the China Regional Qualifier and the Last Chance Qualifier decide the eight teams at the World Finals."
      />
      <Container>
        <Section id="all" title="Every stage">
          <ol className="border-t border-rule">
            {chronological(stages).map((s) => (
              <StageRow key={s.slug} stage={s} />
            ))}
          </ol>
        </Section>
      </Container>
    </>
  );
}
