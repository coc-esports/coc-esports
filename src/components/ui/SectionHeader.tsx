import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";

export function SectionHeader({
  title,
  eyebrow,
  href,
  linkLabel = "See all",
  id,
  aside,
}: {
  title: string;
  eyebrow?: string;
  href?: string;
  linkLabel?: string;
  id?: string;
  aside?: ReactNode; // extra element next to the eyebrow, e.g. a "Sample data" badge
}) {
  return (
    <div data-reveal className="mb-8 flex items-end justify-between gap-6 border-b border-line pb-4">
      <div>
        {(eyebrow || aside) && (
          <div className="mb-2 flex flex-wrap items-center gap-3">
            {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>}
            {aside}
          </div>
        )}
        <h2 id={id} className="font-display text-4xl uppercase leading-none sm:text-5xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-muted transition-colors duration-150 hover:text-text"
        >
          {linkLabel}
          <ArrowRight className="transition-transform duration-200 ease-snap group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

export function SampleBadge() {
  return (
    <span className="whitespace-nowrap rounded-sm border border-dashed border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
      Sample data
    </span>
  );
}
