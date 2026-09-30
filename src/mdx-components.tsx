import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Article typography. Required by @next/mdx in the App Router.
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-12 font-display text-3xl uppercase leading-none sm:text-4xl" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
  p: (props) => <p className="mt-5 text-lg leading-relaxed text-text/85" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-lg text-text/85 marker:text-gold" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg text-text/85 marker:text-gold" {...props} />,
  strong: (props) => <strong className="font-semibold text-text" {...props} />,
  blockquote: (props) => <blockquote className="mt-6 border-l-2 border-gold pl-5 text-lg italic text-muted" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-gold underline underline-offset-4 hover:text-gold-bright" {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4 hover:text-gold-bright" {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
