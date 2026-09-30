import { NewsCard } from "@/components/NewsCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { articles } from "@/data/news";

export function NewsGrid() {
  const [lead, ...rest] = articles;

  return (
    <section aria-labelledby="news" className="py-20 sm:py-28">
      <Container>
        <SectionHeader id="news" eyebrow="Latest" title="What's happening?" href="/news" />
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <div className="lg:col-span-2 lg:row-span-2">
            <NewsCard article={lead} size="lg" />
          </div>
          {rest.slice(0, 2).map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      </Container>
    </section>
  );
}
