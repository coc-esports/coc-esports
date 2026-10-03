import type { Team } from "@/data/types";
import { codeBars } from "./TeamPoster";
import { TeamMark } from "./TeamMark";

// The team page header object: a team accreditation hanging from its lanyard ("Will Call" world).
// It never states ticket status (that lives in the facts below, behind "Hide results"). The badge settles
// once on arrival (CSS, reduced-motion safe); the mark morphs in from the team card.
export function TeamCredential({ team }: { team: Team }) {
  return (
    <div className="credential relative mx-auto grid w-64 justify-items-center sm:w-72">
      <span aria-hidden className="h-24 w-6 bg-[repeating-linear-gradient(90deg,var(--plate)_0_3px,var(--graphite)_3px_6px)] shadow-[inset_0_0_0_1px_var(--rule)]" />
      <span aria-hidden className="-mt-1 h-5 w-10 rounded-b-md border border-steel/60 bg-ink" />
      <div className="credential-badge -mt-1 grid w-full overflow-hidden bg-graphite shadow-[0_40px_80px_-30px_rgba(5,3,30,0.95)] ring-1 ring-rule">
        <span className="flex h-11 items-center justify-between bg-plate px-4 font-data text-label uppercase text-steel">
          <span>Team accreditation</span>
          <span>2026</span>
        </span>
        <div className="relative grid place-items-center overflow-hidden py-8">
          <div aria-hidden className="absolute inset-0 opacity-60 blur-2xl" style={{ background: `radial-gradient(closest-side, ${team.color}, transparent)` }} />
          <TeamMark team={team} size="xl" morph className="relative" />
        </div>
        <div className="grid gap-3 border-t border-dashed border-rule px-4 py-4">
          <span className="font-cond text-3xl uppercase leading-none text-bone">{team.name}</span>
          <span className="flex items-center justify-between font-data text-label uppercase text-steel">
            <span>Access: all areas</span>
            <span>GLD-{team.short}-26</span>
          </span>
          <span aria-hidden className="flex h-7 items-stretch gap-[2px] opacity-75">
            {codeBars(team.slug + team.short).map((w, i) => (
              <span key={i} className="bg-steel" style={{ width: `${w}px` }} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
