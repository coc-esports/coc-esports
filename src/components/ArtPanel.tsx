import { ViewTransition, type ReactNode } from "react";
import type { ArtTone } from "@/data/types";
import { cn } from "@/lib/cn";

const tones: Record<ArtTone, string> = {
  gold: "bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_oklab,var(--gold)_55%,transparent),transparent_60%),linear-gradient(160deg,#3a2c12,#15130f)]",
  elixir: "bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--elixir)_55%,transparent),transparent_60%),linear-gradient(160deg,var(--dark-elixir),#120f19)]",
  stone: "bg-[radial-gradient(ellipse_at_50%_0%,#4a505d,transparent_65%),linear-gradient(160deg,#262a33,#101216)]",
  ember: "bg-[radial-gradient(ellipse_at_20%_80%,color-mix(in_oklab,var(--live)_50%,transparent),transparent_60%),linear-gradient(160deg,#3a1a14,#130f0e)]",
};

// Placeholder artwork until Fan Kit images arrive. The inner layer scales on card hover
// (the card must have the `group` class); swap the inner layer for <Image> later.
// `morphName`: the artwork glides between a news card and the article page (unique per page).
export function ArtPanel({
  tone,
  glyph,
  className,
  children,
  morphName,
}: {
  tone: ArtTone;
  glyph?: string;
  className?: string;
  children?: ReactNode;
  morphName?: string;
}) {
  const panel = (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-transform duration-400 ease-snap group-hover:scale-105",
          tones[tone],
        )}
      >
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden>
          <defs>
            <pattern id={`bricks-${tone}`} width="48" height="24" patternUnits="userSpaceOnUse">
              <path d="M0 0.5H48M0 12.5H48M0.5 0V12M24.5 12V24" stroke="white" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#bricks-${tone})`} />
        </svg>
        {glyph && (
          <span className="absolute -bottom-[0.18em] right-2 select-none font-display text-[clamp(5rem,14vw,11rem)] uppercase leading-none text-white/[0.07]">
            {glyph}
          </span>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" aria-hidden />
      {children}
    </div>
  );
  if (!morphName) return panel;
  return (
    <ViewTransition name={morphName} share="morph" default="none">
      {panel}
    </ViewTransition>
  );
}
