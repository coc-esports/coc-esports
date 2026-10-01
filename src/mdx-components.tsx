import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Article typography (v2): condensed headings, calm 18px text, bolt for links and list markers.
const linkClass = "text-bone underline decoration-bolt decoration-2 underline-offset-4 hover:text-bolt";
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 font-cond text-h2 font-black uppercase text-bone" {...props} />,
  h3: (props) => <h3 className="mt-10 font-cond text-h3 font-black uppercase text-bone" {...props} />,
  p: (props) => <p className="mt-5 text-lead text-bone/85" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-lead text-bone/85 marker:text-bolt" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-lead text-bone/85 marker:font-data marker:text-bolt" {...props} />,
  strong: (props) => <strong className="font-semibold text-bone" {...props} />,
  blockquote: (props) => <blockquote className="mt-8 border-l-2 border-bolt pl-5 font-cond text-h3 font-black uppercase text-bone" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className={linkClass} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
