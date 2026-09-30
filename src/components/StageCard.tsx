import Link from "next/link";
import { TeamMark } from "@/components/TeamMark";
import { Badge } from "@/components/ui/Badge";
import { findTeam } from "@/data/teams";
import type { Stage } from "@/data/types";
import { cn } from "@/lib/cn";

export function StageCard({ stage }: { stage: Stage }) {
  const winner = stage.winner ? findTeam(stage.winner) : undefined;
  return (
    <Link
      href={`/stages/${stage.slug}`}
      data-reveal
      className={cn(
        "group flex flex-col justify-between gap-8 rounded-sm border p-5 transition-colors duration-150",
        stage.isFinal
          ? "border-gold/60 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklab,var(--gold)_25%,transparent),var(--surface)_70%)] hover:border-gold"
          : "border-line bg-surface hover:border-muted",
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
        <div className="mt-3 flex min-h-6 items-center gap-2 text-sm text-muted">
          {winner ? (
            <>
              <TeamMark team={winner} size="xs" />
              <span>
                Won by <span className="font-semibold text-text">{winner.name}</span>
              </span>
            </>
          ) : stage.prize ? (
            <span className="tabular-nums">{stage.prize} prize pool</span>
          ) : stage.status === "completed" ? (
            <span>Winner to be confirmed</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
