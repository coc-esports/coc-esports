import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "live" | "upcoming" | "completed" | "qualified" | "elixir" | "neutral";

const tones: Record<BadgeTone, string> = {
  live: "border-live/40 bg-live/15 text-live",
  upcoming: "border-gold/30 bg-gold/10 text-gold",
  completed: "border-line bg-surface-2 text-muted",
  qualified: "border-gold bg-gold text-bg",
  elixir: "border-elixir/40 bg-elixir/15 text-elixir-text",
  neutral: "border-line bg-surface text-text",
};

const defaultLabels: Partial<Record<BadgeTone, string>> = {
  live: "Live",
  upcoming: "Upcoming",
  completed: "Completed",
  qualified: "Qualified",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: BadgeTone;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] font-bold uppercase leading-5 tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {tone === "live" && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
        </span>
      )}
      {children ?? defaultLabels[tone]}
    </span>
  );
}
