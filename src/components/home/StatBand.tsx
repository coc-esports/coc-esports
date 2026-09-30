import { CountUp } from "@/components/motion/CountUp";
import { season } from "@/data/season";

export function StatBand() {
  const stats = [
    { value: season.prizePool, label: "Season prize pool" },
    { value: season.finalsPrize, label: "At the World Finals" },
    { value: String(season.teamsAtWorlds), label: "Teams at Worlds" },
    { value: season.townHall, label: "Every match" },
  ];

  return (
    <section aria-label="Season in numbers" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1280px] bg-line">
        {/* 1px gaps over a line-colored background draw the dividers */}
        <dl className="grid grid-cols-2 gap-px lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col-reverse gap-2 bg-surface px-4 py-10 sm:px-8 sm:py-14">
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(2rem,8vw,3.75rem)] lg:text-[clamp(2.5rem,4.2vw,3.75rem)] leading-none text-gold tabular-nums">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
