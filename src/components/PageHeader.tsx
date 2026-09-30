import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

// Top band for inner pages: eyebrow, big title, intro and optional extras (badges, stats, buttons).
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: ReactNode;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_90%_at_85%_0%,color-mix(in_oklab,var(--elixir)_24%,transparent),transparent_70%)]"
      />
      <Container className="relative pb-12 pt-[calc(var(--nav-h)+3.5rem)] sm:pb-16">
        {eyebrow && <div className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{eyebrow}</div>}
        <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,6rem)] uppercase leading-[0.9] tracking-tight">
          {title}
        </h1>
        {intro && <div className="mt-5 max-w-2xl text-lg text-text/80">{intro}</div>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
