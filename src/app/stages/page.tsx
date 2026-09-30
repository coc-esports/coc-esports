import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StageCard } from "@/components/StageCard";
import { Container } from "@/components/ui/Container";
import { stages } from "@/data/season";

export const metadata: Metadata = {
  title: "Stages",
  description: "Every stage of the 2026 Clash of Clans World Championship season: Monthly Finals, China Regional, the Last Chance Qualifier and the World Finals.",
};

export default function StagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Season 2026"
        title="Every stage"
        intro="Four Monthly Finals from June to September, the China Regional Qualifier, the Last Chance Qualifier and the World Finals."
      />
      <Container className="py-16 sm:py-20">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage) => (
            <li key={stage.slug} className="grid">
              <StageCard stage={stage} />
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
