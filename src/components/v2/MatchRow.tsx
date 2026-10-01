"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { StatusTag, type V2Status } from "./Status";
import { useSpoilers } from "./Spoilers";

// One match line in a day-grouped schedule (Riot pattern). Time shows in the visitor's own time zone.
// Results stay hidden behind "Reveal" when spoilers are on (site-wide switch arrives in Step 5; prop for now).
export function MatchRow({
  startTime,
  stage,
  a,
  b,
  scoreA,
  scoreB,
  status,
  spoilers,
}: {
  startTime: string;
  stage: string;
  a: string;
  b: string;
  scoreA?: number;
  scoreB?: number;
  status: V2Status;
  spoilers?: boolean;
}) {
  const { hide } = useSpoilers();
  spoilers = spoilers ?? hide; // follows the site-wide switch unless set explicitly
  const [revealed, setRevealed] = useState(false);
  const hasScore = scoreA !== undefined && scoreB !== undefined;
  const showScore = hasScore && (!spoilers || revealed);
  const time = new Date(startTime);
  return (
    <div className="grid min-h-16 grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-rule px-1 py-3 sm:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,14rem)_auto]">
      <time dateTime={startTime} className="font-data text-sm tabular-nums text-bone" suppressHydrationWarning>
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </time>
      <div className="flex min-w-0 items-center gap-3 font-cond text-[1.375rem] font-black uppercase leading-none text-bone">
        <span className="truncate">{a}</span>
        <span className={cn("font-data text-sm tabular-nums", showScore ? "text-bone" : "text-steel")}>{showScore ? `${scoreA}–${scoreB}` : "vs"}</span>
        <span className="truncate">{b}</span>
      </div>
      <span className="hidden truncate font-data text-label uppercase text-steel sm:block">{stage}</span>
      {hasScore && spoilers && !revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="h-11 rounded-hair border border-rule px-3 font-data text-label uppercase text-steel transition-colors hover:border-steel hover:text-bone"
        >
          Reveal
        </button>
      ) : (
        <StatusTag status={status} />
      )}
    </div>
  );
}
