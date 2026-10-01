import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/v2/Layout";
import { DisplayHeading, Label } from "@/components/v2/Type";
import { site } from "@/config/site";
import { articles, getArticle } from "@/data/news";
import { formatDate } from "@/lib/format";
import { ArticleTitle } from "@/components/v2/ArticleTitle";

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
      <header className="border-b border-rule">
        <Container className="grid max-w-5xl gap-6 pb-12 pt-[calc(var(--nav-h)+3rem)]">
          <nav aria-label="Breadcrumb" className="-my-3 font-data text-label uppercase text-steel">
            <Link href="/news" className="inline-flex min-h-11 min-w-11 items-center hover:text-bone">
              News
            </Link>
          </nav>
          <Label tone="bolt">
            {article.category} · {formatDate(article.date)}
          </Label>
          <DisplayHeading as="h1" size="h1" lines={[[article.title]]} />
          <p className="max-w-[60ch] text-lead text-steel">{article.excerpt}</p>
          <p className="font-data text-label uppercase text-steel">By the {site.name} team</p>
        </Container>
      </header>
      <Container className="max-w-5xl py-10">
        {article.art ? (
          <figure className="grid gap-2">
            <div className="relative aspect-[21/9] overflow-hidden rounded-hair bg-graphite">
              <Image src={article.art.src} alt={article.art.alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
            </div>
            <figcaption className="font-data text-label uppercase text-steel">Art: Supercell Fan Kit</figcaption>
          </figure>
        ) : null}
        <div className="mx-auto max-w-[68ch] pb-8 pt-4">
          <Body />
        </div>
      </Container>
      <Container>
        <Section id="more" title="More news" href="/news" linkLabel="All news" className="border-t border-rule">
          <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2">
            {more.map((a) => (
              <li key={a.slug}>
                <Link href={`/news/${a.slug}`} className="group grid gap-3">
                  <Label>
                    {a.category} · {formatDate(a.date)}
                  </Label>
                  <span className="font-cond text-h2 font-black uppercase text-bone group-hover:text-bolt"><ArticleTitle article={a} /></span>
                  <span className="text-steel">{a.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </article>
  );
}
