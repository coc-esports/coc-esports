import Link from "next/link";
import { TeamMark } from "@/components/TeamMark";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { worldsSlots } from "@/data/season";
import { getTeam } from "@/data/teams";
import { cn } from "@/lib/cn";

export function ChosenEight() {
  const announced = worldsSlots.filter((s) => s.kind === "qualified").length;

  return (
    <section aria-labelledby="chosen-eight" className="py-20 sm:py-28">
      <Container>
        <SectionHeader id="chosen-eight" eyebrow="World Finals" title="The Chosen Eight" href="/teams" linkLabel="All teams" />

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <p className="font-display text-3xl leading-none tabular-nums">
            <span className="text-gold">{announced}</span>
            <span className="text-muted"> / {worldsSlots.length}</span>
          </p>
          <p className="text-sm uppercase tracking-widest text-muted">Teams announced</p>
          <div className="flex gap-1" aria-hidden>
            {worldsSlots.map((s, i) => (
              <span key={i} className={cn("h-1.5 w-6 rounded-full", s.kind === "qualified" ? "bg-gold" : "bg-line")} />
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {worldsSlots.map((slot, i) => {
            if (slot.kind === "tbd") {
              return (
                <li
                  key={i}
                  className="flex aspect-[4/5] flex-col justify-between rounded-sm border border-dashed border-line p-4 sm:aspect-[5/4] sm:p-5"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-sm border border-dashed border-line font-display text-2xl text-muted">
                    ?
                  </span>
                  <div>
                    <p className="font-display text-xl uppercase leading-none text-muted sm:text-2xl">To be decided</p>
                    <p className="mt-2 text-xs text-muted sm:text-sm">{slot.via}</p>
                  </div>
                </li>
              );
            }
            const team = getTeam(slot.team);
            return (
              <li key={i}>
                <Link
                  href={`/teams/${team.slug}`}
                  className="group relative flex aspect-[4/5] h-full flex-col justify-between overflow-hidden rounded-sm border border-line bg-surface p-4 transition-colors duration-150 hover:border-gold/60 sm:aspect-[5/4] sm:p-5"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                    style={{ background: `radial-gradient(ellipse at 100% 0%, ${team.color}, transparent 65%)` }}
                  />
                  <div className="relative flex items-start justify-between gap-2">
                    <TeamMark team={team} />
                    <Badge tone="qualified" />
                  </div>
                  <div className="relative">
                    <p className="font-display text-xl uppercase leading-none sm:text-2xl">
                      <span className="title-underline">{team.name}</span>
                    </p>
                    <p className="mt-2 text-xs text-muted sm:text-sm">{slot.via}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
