import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, PageIntro, Section } from "@/components/v2/Layout";
import { Label } from "@/components/v2/Type";
import { articles } from "@/data/news";
import { formatDate } from "@/lib/format";
import { ArticleTitle } from "@/components/v2/ArticleTitle";

export const metadata: Metadata = {
  title: "News",
  description: "Previews, explainers and team stories from the 2026 Clash of Clans World Championship season.",
};

export default function NewsPage() {
  return (
    <>
      <PageIntro title="News" intro="Previews, explainers and team stories. Facts are checked against the sources on each article." />
      <Container>
        <Section id="all" title="Latest">
          <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/news/${a.slug}`} className="group grid gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-hair bg-graphite">
                    {a.art ? (
                      <Image src={a.art.src} alt={a.art.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover grayscale-[35%] transition-[transform,filter] duration-700 ease-expo group-hover:scale-[1.03] group-hover:grayscale-0" />
                    ) : null}
                  </div>
                  <Label>
                    {a.category} · {formatDate(a.date)}
                  </Label>
                  <h2 className="font-cond text-h2 font-black uppercase text-bone group-hover:text-bolt"><ArticleTitle article={a} /></h2>
                  <p className="text-steel">{a.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </>
  );
}
