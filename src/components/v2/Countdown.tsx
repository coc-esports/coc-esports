"use client";

import { useEffect, useState } from "react";
import { StatusTag } from "./Status";

const units = [
  ["d", "Days"],
  ["h", "Hrs"],
  ["m", "Min"],
  ["s", "Sec"],
] as const;

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

// Countdown in condensed broadcast numerals. "--" on the server (time differs per visitor), then ticks.
// Turns into a LIVE tag between start and end.
export function Countdown({ target, end, label }: { target: string; end?: string; label: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const t = new Date(target).getTime();
  const e = end ? new Date(end).getTime() : t + 36e5 * 10;
  if (now !== null && now >= t && now < e) return <StatusTag status="live">Live now</StatusTag>;
  if (now !== null && now >= e) return <StatusTag status="completed">Finished</StatusTag>;
  const parts = now === null ? null : split(t - now);

  return (
    <div role="timer" aria-label={label} className="flex gap-5">
      {units.map(([key, name]) => (
        <div key={key} className="grid">
          <span className="overflow-hidden font-cond text-[2.75rem] font-black leading-none tabular-nums text-bone">
            {parts ? (
              <span key={parts[key]} className="tick">
                {String(parts[key]).padStart(2, "0")}
              </span>
            ) : (
              "--"
            )}
          </span>
          <span className="mt-1 font-data text-label uppercase text-steel">{name}</span>
        </div>
      ))}
    </div>
  );
}
