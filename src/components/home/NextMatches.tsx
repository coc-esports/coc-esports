import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/icons";
import { stages } from "@/data/season";

// Strip under the hero: the next three stages on the calendar.
export function NextMatches() {
  const upcoming = stages.filter((s) => s.status !== "completed").slice(0, 3);

  return (
    <section aria-labelledby="up-next" className="border-y border-line bg-surface/50">
      <Container className="py-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="up-next" className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Coming up
          </h2>
          <Link
            href="/schedule"
            className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted transition-colors duration-150 hover:text-text"
          >
            <span className="max-sm:hidden">Full schedule</span>
            <span className="sm:hidden">Schedule</span>
            <ArrowRight className="transition-transform duration-200 ease-snap group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {upcoming.map((s) => (
            <li key={s.slug} data-reveal>
              <Link
                href={`/stages/${s.slug}`}
                className="group flex h-full flex-col gap-3 rounded-sm border border-line bg-bg p-4 transition-colors duration-150 hover:border-muted"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">{s.dateLabel}</span>
                  <Badge tone={s.status === "live" ? "live" : "upcoming"} />
                </div>
                <p className={s.isFinal ? "font-display text-2xl uppercase leading-none text-gold" : "font-display text-2xl uppercase leading-none"}>
                  <span className="title-underline">{s.name}</span>
                </p>
                <p className="line-clamp-2 text-sm text-muted">{s.prize ? `${s.prize} · ` : ""}{s.format}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
