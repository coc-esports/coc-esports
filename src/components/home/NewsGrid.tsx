import Link from "next/link";
import { ArtPanel } from "@/components/ArtPanel";
import { Container } from "@/components/ui/Container";
import { SampleBadge, SectionHeader } from "@/components/ui/SectionHeader";
import { articles } from "@/data/samples";
import type { Article } from "@/data/types";
import { formatDate } from "@/lib/format";

function Meta({ article }: { article: Article }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-muted">
      <span className="text-gold">{article.category}</span>
      <span aria-hidden> · </span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
    </p>
  );
}

export function NewsGrid() {
  const [lead, ...rest] = articles;

  return (
    <section aria-labelledby="news" className="py-20 sm:py-28">
      <Container>
        <SectionHeader id="news" eyebrow="Latest" title="What's happening?" href="/news" aside={<SampleBadge />} />
        <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <Link
            href={`/news/${lead.slug}`}
            data-reveal
            className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface lg:col-span-2 lg:row-span-2"
          >
            <ArtPanel tone={lead.tone} glyph="LCQ" className="aspect-[16/9] lg:aspect-auto lg:flex-1" />
            <div className="p-6">
              <Meta article={lead} />
              <h3 className="mt-3 font-display text-3xl uppercase leading-[1.05] sm:text-4xl">
                <span className="title-underline">{lead.title}</span>
              </h3>
              <p className="mt-3 max-w-xl text-muted">{lead.excerpt}</p>
            </div>
          </Link>

          {rest.map((a) => (
            <Link
              key={a.slug}
              href={`/news/${a.slug}`}
              data-reveal
              className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface"
            >
              <ArtPanel tone={a.tone} className="aspect-[16/9]" />
              <div className="flex flex-1 flex-col p-4">
                <Meta article={a} />
                <h3 className="mt-2 text-lg font-semibold leading-snug">
                  <span className="title-underline">{a.title}</span>
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
