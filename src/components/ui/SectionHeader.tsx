import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export function SectionHeader({
  title,
  eyebrow,
  href,
  linkLabel = "See all",
  id,
}: {
  title: string;
  eyebrow?: string;
  href?: string;
  linkLabel?: string;
  id?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 border-b border-line pb-4">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>}
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
