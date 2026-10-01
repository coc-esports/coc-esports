import type { ReactNode } from "react";
import { SpoilerSwitch } from "./Spoilers";

// Server-safe spoiler guard: renders both versions and lets CSS pick one from the "Hide results" switch
// (globals.css: .sp-real / .sp-safe). Use where a result is part of a sentence, card or link and a
// per-item reveal button would not fit; the switch itself is the reveal. `block` wraps whole sections.
export function HideResult({ children, safe, block }: { children: ReactNode; safe: ReactNode; block?: boolean }) {
  const Tag = block ? "div" : "span";
  // min-w-0: a block wrapper inside a grid must be allowed to shrink, or a wide table inside it (with its
  // own sideways scroll) stretches the whole page and phones zoom out.
  const cls = block ? "min-w-0" : undefined;
  return (
    <>
      <Tag className={block ? `sp-real ${cls}` : "sp-real"}>{children}</Tag>
      <Tag className={block ? `sp-safe ${cls}` : "sp-safe"}>{safe}</Tag>
    </>
  );
}

// The calm message shown in place of a hidden block, with the switch right there to reveal it.
export function HiddenNote({ children = "Hidden while “Hide results” is on." }: { children?: ReactNode }) {
  return (
    <div className="flex max-w-[60ch] flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-hair border border-dashed border-rule py-3 pl-5 pr-3">
      <p className="text-steel">{children}</p>
      <SpoilerSwitch />
    </div>
  );
}
