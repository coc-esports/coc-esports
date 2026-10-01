import type { Article } from "@/data/types";
import { HideResult } from "./HideResult";

// An article title in a list: titles that name winners switch to their spoiler-free version while
// "Hide results" is on. The article page itself always shows the real title (opening it is the reveal).
export function ArticleTitle({ article }: { article: Pick<Article, "title" | "safeTitle"> }) {
  return article.safeTitle ? <HideResult safe={article.safeTitle}>{article.title}</HideResult> : <>{article.title}</>;
}
