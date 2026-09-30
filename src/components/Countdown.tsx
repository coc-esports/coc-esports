"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";

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

// Renders "--" on the server and first paint (the time differs per visitor), then ticks every second.
export function Countdown({ target, label }: { target: string; label: string }) {
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

  const targetMs = new Date(target).getTime();
  if (now !== null && now >= targetMs) return <Badge tone="live">Live now</Badge>;
  const parts = now === null ? null : split(targetMs - now);

  return (
    <div role="timer" aria-label={label} className="flex gap-2">
      {units.map(([key, name]) => (
        <div key={key} className="w-16 rounded-sm border border-line bg-bg/70 py-2 text-center">
          <div className="overflow-hidden font-display text-3xl leading-none tabular-nums">
            {/* Keyed by value: each new number slides in (the .tick rule in globals.css) */}
            {parts ? (
              <span key={parts[key]} className="tick">
                {String(parts[key]).padStart(2, "0")}
              </span>
            ) : (
              "--"
            )}
          </div>
          <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted">{name}</div>
        </div>
      ))}
    </div>
  );
}
