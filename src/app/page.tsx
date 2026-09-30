import { site } from "@/config/site";

// Phase 0 placeholder: proves tokens, fonts and deploy work.
// Phase 2 replaces this with the full Riot-style home page (PLAN.md §5).
export default function Home() {
  return (
    <>
      <main
        id="main"
        className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-24 text-center"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--dark-elixir)_0%,transparent_60%)] opacity-70"
        />
        <p className="relative mb-6 inline-flex items-center gap-2 rounded-sm border border-line bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Under construction
        </p>
        <h1 className="relative font-display text-[clamp(3rem,12vw,8rem)] uppercase leading-[0.9] tracking-tight">
          {site.name}
        </h1>
        <p className="relative mt-6 max-w-xl text-lg text-muted">
          {site.tagline}. World Championship 2026 schedules, brackets, teams
          and live pro player stats are coming soon.
        </p>
        <div className="relative mt-10 grid grid-cols-3 gap-6 sm:gap-12">
          {[
            ["$1,000,000", "Prize pool"],
            ["8", "Teams at Worlds"],
            ["TH18", "Battlefield"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="font-display text-2xl text-gold tabular-nums sm:text-4xl">
                {value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted">
                {label}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="border-t border-line px-4 py-6 text-center text-sm text-muted">
        <p>
          {site.disclaimer.replace("Supercell's Fan Content Policy.", "")}
          <a
            href={site.fanPolicyUrl}
            className="underline underline-offset-2 hover:text-text"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supercell&apos;s Fan Content Policy
          </a>
          .
        </p>
      </footer>
    </>
  );
}
