import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stages } from "@/data/season";
import { cn } from "@/lib/cn";

// Phase 2: a horizontal scroll row. Phase 3 pins it and drives it with the page scroll (desktop only).
export function RoadToWorlds() {
  return (
    <section aria-labelledby="road" className="overflow-hidden border-y border-line bg-surface/40 py-20 sm:py-28">
      <Container>
        <SectionHeader id="road" eyebrow="Season 2026" title="Road to Worlds" href="/worlds" linkLabel="Full season" />
      </Container>

      <div className="mx-auto max-w-[1280px]">
        <ol className="scroll-row gap-4 px-4 pb-4 sm:px-6 lg:px-8">
          {stages.map((stage, i) => (
            <li key={stage.slug} className="relative w-[78vw] max-w-[300px] pt-8 sm:w-[280px]">
              {/* Track line + stage dot */}
              <span aria-hidden className={cn("absolute left-0 right-[-1rem] top-[11px] h-px", i === stages.length - 1 ? "bg-transparent" : "bg-line")} />
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1 h-4 w-4 rounded-full border-2",
                  stage.status === "completed" && "border-muted bg-muted",
                  stage.status === "upcoming" && !stage.isFinal && "border-gold bg-bg",
                  stage.isFinal && "border-gold bg-gold shadow-[0_0_0_6px_color-mix(in_oklab,var(--gold)_20%,transparent)]",
                )}
              />
              <Link
                href={`/stages/${stage.slug}`}
                className={cn(
                  "group flex h-full flex-col justify-between gap-6 rounded-sm border p-5 transition-colors duration-150",
                  stage.isFinal
                    ? "border-gold/60 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklab,var(--gold)_25%,transparent),var(--surface)_70%)] hover:border-gold"
                    : "border-line bg-bg hover:border-muted",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">{stage.dateLabel}</span>
                  <Badge tone={stage.status === "completed" ? "completed" : stage.status === "live" ? "live" : "upcoming"} />
                </div>
                <div>
                  <p className={cn("font-display uppercase leading-none", stage.isFinal ? "text-3xl text-gold" : "text-2xl")}>
                    <span className="title-underline">{stage.name}</span>
                  </p>
                  {stage.prize && <p className="mt-2 text-sm tabular-nums text-muted">{stage.prize} prize pool</p>}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
