import { site } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Placeholder hero. Phase 2 replaces this with the full Riot-style home page (PLAN.md §5).
export default function Home() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-[calc(var(--nav-h)+5rem)] text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--dark-elixir)_0%,transparent_60%)] opacity-70"
      />
      <Badge tone="upcoming" className="relative mb-6">
        Under construction
      </Badge>
      <h1 className="relative font-display text-[clamp(3rem,12vw,8rem)] uppercase leading-[0.9] tracking-tight">
        {site.name}
      </h1>
      <p className="relative mt-6 max-w-xl text-lg text-muted">
        {site.tagline}. World Championship 2026 schedules, brackets, teams and live pro player stats are coming soon.
      </p>
      <div className="relative mt-10 grid grid-cols-3 gap-6 sm:gap-12">
        {[
          ["$1,000,000", "Prize pool"],
          ["8", "Teams at Worlds"],
          ["TH18", "Battlefield"],
        ].map(([value, label]) => (
          <div key={label}>
            <div className="font-display text-2xl text-gold tabular-nums sm:text-4xl">{value}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted">{label}</div>
          </div>
        ))}
      </div>
      <div className="relative mt-12 flex flex-wrap justify-center gap-3">
        <Button href="/worlds" size="lg">
          Road to Worlds
        </Button>
        <Button href="/styleguide" variant="secondary" size="lg">
          See the styleguide
        </Button>
      </div>
    </section>
  );
}
