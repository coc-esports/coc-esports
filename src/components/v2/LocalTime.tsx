"use client";

import { useEffect, useState } from "react";

// Shows a moment in the visitor's own time zone. Server and first paint show UTC (same for everyone),
// then it switches to local time after hydration.
export function LocalTime({ iso, mode = "datetime", className }: { iso: string; mode?: "datetime" | "time" | "date"; className?: string }) {
  const d = new Date(iso);
  const utc =
    mode === "time"
      ? `${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC`
      : d.toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " UTC";
  const [text, setText] = useState(utc);
  useEffect(() => {
    const opts: Intl.DateTimeFormatOptions =
      mode === "time" ? { hour: "2-digit", minute: "2-digit" } : mode === "date" ? { weekday: "short", day: "numeric", month: "short" } : { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" };
    // Local time is only known in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText(`${d.toLocaleString(undefined, opts)}${mode === "date" ? "" : " your time"}`);
  }, [iso, mode]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <time dateTime={iso} className={className} suppressHydrationWarning>
      {text}
    </time>
  );
}
