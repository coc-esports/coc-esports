import type { Metadata } from "next";
import { NewsCard } from "@/components/NewsCard";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { articles } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description: "Previews, explainers and results from the 2026 Clash of Clans World Championship season.",
};

export default function NewsPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHeader eyebrow="Latest" title="News" intro="Previews, explainers and results from the road to Worlds." />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <div className="lg:col-span-2 lg:row-span-2">
            <NewsCard article={lead} size="lg" />
          </div>
          {rest.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      </Container>
    </>
  );
}
