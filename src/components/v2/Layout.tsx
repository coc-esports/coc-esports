import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DisplayHeading, Label } from "./Type";

// Page width + side gutters used by every v2 page.
export function Container({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-page px-4 sm:px-8", className)}>
      {children}
    </div>
  );
}

// A titled band of a page: condensed title, optional facts line under it (never a label above the
// title: the heading carries itself), optional intro and "see all" link.
export function Section({
  id,
  label,
  title,
  href,
  linkLabel,
  children,
  className,
  intro,
}: {
  id?: string;
  label?: string;
  title: string;
  href?: string;
  linkLabel?: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={cn("grid scroll-mt-16 gap-8 py-16 sm:py-20", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="grid gap-3">
          <h2 id={id ? `${id}-title` : undefined} className="font-cond text-h1 font-black uppercase text-bone text-balance">
            {title}
          </h2>
          {label ? <Label>{label}</Label> : null}
          {intro ? <div className="max-w-[60ch] text-lead text-steel">{intro}</div> : null}
        </div>
        {href ? (
          <Link
            href={href}
            className="inline-flex h-11 items-center font-text text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-bone underline decoration-bolt decoration-2 underline-offset-[6px] hover:text-bolt"
          >
            {linkLabel ?? "See all"}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

// Top of every inner page: breadcrumb, label, huge title, intro, actions, optional art on the right.
export function PageIntro({
  crumbs,
  label,
  title,
  intro,
  actions,
  aside,
}: {
  crumbs?: { label: string; href: string }[];
  label?: ReactNode;
  title: string;
  intro?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="border-b border-rule">
      <Container className="grid items-end gap-10 pb-12 pt-[calc(var(--nav-h)+3rem)] sm:pb-16 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="grid min-w-0 gap-5">
          {crumbs?.length ? (
            <nav aria-label="Breadcrumb" className="-my-3 flex flex-wrap items-center gap-2 font-data text-label uppercase text-steel">
              {crumbs.map((c, i) => (
                <span key={c.href} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden>/</span> : null}
                  <Link href={c.href} className="inline-flex min-h-11 min-w-11 items-center hover:text-bone">
                    {c.label}
                  </Link>
                </span>
              ))}
            </nav>
          ) : null}
          <DisplayHeading as="h1" size="hero" lines={[[title]]} />
          {label ? <div className="font-data text-label uppercase text-steel">{label}</div> : null}
          {intro ? <div className="max-w-[62ch] text-lead text-steel">{intro}</div> : null}
          {actions ? <div className="flex flex-wrap gap-3 pt-2">{actions}</div> : null}
        </div>
        {aside ? <div className="min-w-0">{aside}</div> : null}
      </Container>
    </header>
  );
}

// Label/value facts in a strict row (stage facts, team facts).
export function Facts({ items }: { items: { label: string; value: ReactNode; accent?: boolean }[] }) {
  return (
    <dl className="grid grid-cols-2 border-y border-rule sm:grid-cols-4">
      {items.map((f) => (
        <div key={f.label} className="grid gap-2 border-rule py-5 pr-4 odd:border-r sm:border-r sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6">
          <dt className="font-data text-label uppercase text-steel">{f.label}</dt>
          <dd className={cn("font-cond text-h3 font-black uppercase tabular-nums", f.accent ? "text-bolt" : "text-bone")}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
