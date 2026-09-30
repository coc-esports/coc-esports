import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtPanel } from "@/components/ArtPanel";
import { NewsCard, NewsMeta } from "@/components/NewsCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/config/site";
import { articles, getArticle } from "@/data/news";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { default: Body } = await import(`@/content/news/${slug}.mdx`);
  const more = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article>
      <header className="border-b border-line">
        <Container className="max-w-4xl pb-10 pt-[calc(var(--nav-h)+3.5rem)]">
          <Link href="/news" className="text-xs font-bold uppercase tracking-[0.25em] text-gold hover:text-gold-bright">
            ← News
          </Link>
          <div className="mt-6">
            <NewsMeta article={article} />
          </div>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-[0.95]">{article.title}</h1>
          <p className="mt-5 text-xl text-text/80">{article.excerpt}</p>
          <p className="mt-6 text-sm text-muted">By the {site.name} team</p>
        </Container>
      </header>

      <Container className="max-w-4xl py-10">
        <ArtPanel tone={article.tone} glyph={article.glyph} className="aspect-[21/9] rounded-sm border border-line" />
        <div className="mx-auto max-w-2xl pb-8 pt-4">
          <Body />
        </div>
      </Container>

      <section aria-labelledby="more-news" className="border-t border-line py-16 sm:py-20">
        <Container>
          <SectionHeader id="more-news" title="More news" href="/news" linkLabel="All news" />
          <div className="grid gap-4 md:grid-cols-2">
            {more.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
