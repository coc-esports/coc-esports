import type { ReactNode } from "react";

// Server-safe spoiler guard: renders both versions and lets CSS pick one from the "Hide results" switch
// (globals.css: .sp-real / .sp-safe). Use where a result is part of a sentence, card or link and a
// per-item reveal button would not fit; the switch itself is the reveal. `block` wraps whole sections.
export function HideResult({ children, safe, block }: { children: ReactNode; safe: ReactNode; block?: boolean }) {
  const Tag = block ? "div" : "span";
  return (
    <>
      <Tag className="sp-real">{children}</Tag>
      <Tag className="sp-safe">{safe}</Tag>
    </>
  );
}

// The calm message shown in place of a hidden block.
export function HiddenNote({ children = "Hidden while “Hide results” is on. Switch it off at the top of the page (in the menu on phones) to see it." }: { children?: ReactNode }) {
  return <p className="max-w-[60ch] rounded-hair border border-dashed border-rule p-5 text-steel">{children}</p>;
}
