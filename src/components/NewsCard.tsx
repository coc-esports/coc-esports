import Link from "next/link";
import { ArtPanel } from "@/components/ArtPanel";
import type { Article } from "@/data/types";
import { formatDate } from "@/lib/format";

export function NewsMeta({ article }: { article: Article }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-muted">
      <span className="text-gold">{article.category}</span>
      <span aria-hidden> · </span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
    </p>
  );
}

export function NewsCard({ article, size = "sm" }: { article: Article; size?: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <Link
      href={`/news/${article.slug}`}
      data-reveal
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface"
    >
      <ArtPanel tone={article.tone} glyph={lg ? article.glyph : undefined} className={lg ? "aspect-[16/9] lg:aspect-auto lg:flex-1" : "aspect-[16/9]"} />
      <div className={lg ? "p-6" : "flex flex-1 flex-col p-4"}>
        <NewsMeta article={article} />
        <h3 className={lg ? "mt-3 font-display text-3xl uppercase leading-[1.05] sm:text-4xl" : "mt-2 text-lg font-semibold leading-snug"}>
          <span className="title-underline">{article.title}</span>
        </h3>
        {(lg || article.excerpt) && <p className={lg ? "mt-3 max-w-xl text-muted" : "mt-2 text-sm text-muted"}>{article.excerpt}</p>}
      </div>
    </Link>
  );
}
