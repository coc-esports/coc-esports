import { getArticle } from "@/data/news";
import { formatDate } from "@/lib/format";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "News article";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return ogImage({
    eyebrow: article ? `${article.category} · ${formatDate(article.date)}` : "News",
    title: article?.title ?? "News",
  });
}
