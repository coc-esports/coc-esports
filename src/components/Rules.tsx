import { rules } from "@/data/season";

export function Rules() {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {rules.map((rule, i) => (
        <div key={rule.title} data-reveal className="rounded-sm border border-line bg-surface p-5">
          <dt className="flex items-baseline gap-3">
            <span className="font-display text-2xl leading-none text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-semibold">{rule.title}</span>
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-muted">{rule.body}</dd>
        </div>
      ))}
    </dl>
  );
}
