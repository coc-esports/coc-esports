"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { ExternalIcon } from "./Icons";

// "When and where" in one place: the next event in the visitor's own time, a live countdown, the calendar,
// and the two official channels. A printed ticket field ("Will Call" world).
export function NextBroadcast({ name, startTime, calendarHref }: { name: string; startTime: string; calendarHref: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  const t = new Date(startTime).getTime();
  const left = now === null ? null : Math.max(0, Math.floor((t - now) / 1000));
  const parts = left === null ? null : [Math.floor(left / 86400), Math.floor((left % 86400) / 3600), Math.floor((left % 3600) / 60)];
  const local = now === null ? null : new Date(t).toLocaleString(undefined, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
  return (
    <div className="ticket-field grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div className="grid gap-3">
        <h2 className="font-cond text-h1 uppercase text-bone">Next broadcast: {name}</h2>
        <p className="text-lead text-steel">{local ? `${local}, your time` : "Loading your local time…"}</p>
        <div className="flex gap-5 font-data text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tabular-nums text-bone" role="timer" aria-label={`Time until the ${name}`}>
          {(["days", "hrs", "min"] as const).map((u, i) => (
            <span key={u} className="grid gap-1">
              {parts ? String(parts[i]).padStart(2, "0") : "--"}
              <span className="font-data text-label uppercase text-steel">{u}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button href={calendarHref} prefetch={false} download>
          Add to calendar
        </Button>
        <Button href="https://www.youtube.com/@ClashofClans" variant="outline" target="_blank" rel="noopener noreferrer">
          YouTube <ExternalIcon />
        </Button>
        <Button href="https://www.twitch.tv/clashofclans" variant="outline" target="_blank" rel="noopener noreferrer">
          Twitch <ExternalIcon />
        </Button>
      </div>
    </div>
  );
}
