import Link from "next/link";
import type { Stage } from "@/data/types";
import { findTeam } from "@/data/teams";
import { Button } from "./Button";
import { LocalTime } from "./LocalTime";
import { Spoiler } from "./Spoilers";
import { StatusTag } from "./Status";
import { TeamMark } from "./TeamMark";

// One stage in a list (schedule, stages index): date block, name + status, steps or winner, actions.
// `asTitle`: on a team's own page the row is that team's title, so it says what was won instead of naming the team.
// `chip`: off inside lists already grouped by status (Schedule's Upcoming/Completed); live and pending still show.
export function StageRow({ stage, asTitle = false, chip = true }: { stage: Stage; asTitle?: boolean; chip?: boolean }) {
  const winner = stage.winner ? findTeam(stage.winner) : undefined;
  const status = stage.status === "completed" ? "completed" : stage.status === "live" ? "live" : "upcoming";
  return (
    <li className="row-ticket grid gap-4 bg-graphite/60 px-5 py-6 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:px-0 md:py-0">
      <div className="grid gap-1 border-b border-dashed border-rule pb-4 md:h-full md:content-center md:border-b-0 md:border-r md:px-6 md:py-6">
        {/* An undated event reads as a quiet label, so it never looks as loud as the next real date. */}
        <span className={stage.startTime || stage.status === "completed" ? "font-cond text-h3 uppercase text-bone" : "font-data text-label uppercase text-steel"}>{stage.dateLabel}</span>
        {stage.startTime ? <LocalTime iso={stage.startTime} mode="time" className="font-data text-label uppercase text-steel" /> : null}
      </div>
      <div className="grid min-w-0 gap-2 md:py-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/stages/${stage.slug}`} className="inline-flex min-h-11 items-center font-cond text-h2 uppercase text-bone hover:text-bolt">
            {stage.name}
          </Link>
          {stage.status === "completed" && !winner ? (
            <StatusTag status="tbd">Result pending</StatusTag>
          ) : chip || status === "live" ? (
            <StatusTag status={status} />
          ) : null}
        </div>
        {winner && asTitle ? (
          <p className="text-sm text-foil">Champion · Golden Ticket to the World Finals</p>
        ) : winner ? (
          <div className="flex flex-wrap items-center gap-2 text-sm text-steel">
            Won by{" "}
            <Spoiler label="Show winner">
              <span className="inline-flex items-center gap-2 font-semibold text-bone">
                <TeamMark team={winner} size="xs" /> {winner.name}
              </span>
            </Spoiler>
          </div>
        ) : stage.schedule ? (
          <p className="font-data text-sm text-steel">{stage.schedule.map((s) => `${s.label} ${s.dates}`).join(" · ")}</p>
        ) : (
          <p className="text-sm text-steel">{stage.winnerNote ?? "Dates to be announced."}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 md:pr-6">
        {stage.startTime && stage.status !== "completed" ? (
          <Button href={`/calendar/${stage.slug}`} variant="outline" prefetch={false} download>
            Add to calendar
          </Button>
        ) : null}
        <Button href={`/stages/${stage.slug}`} variant="text" className="h-12">
          Details
        </Button>
      </div>
    </li>
  );
}
