import { cn } from "@/lib/cn";

export type V2Status = "live" | "upcoming" | "completed" | "ticket" | "open" | "tbd";

const styles: Record<V2Status, { label: string; className: string; dot?: string }> = {
  live: { label: "Live", className: "border-signal-live/50 text-bone", dot: "bg-signal-live" },
  upcoming: { label: "Upcoming", className: "border-rule text-steel" },
  completed: { label: "Final", className: "border-rule text-steel" },
  ticket: { label: "Golden Ticket", className: "border-foil/60 text-foil" },
  open: { label: "Open seat", className: "border-rule border-dashed text-steel" },
  tbd: { label: "TBD", className: "border-rule border-dashed text-steel" },
};

// State is shown in form (border style, dot) as well as text, so it reads at a glance.
export function StatusTag({ status, children, className }: { status: V2Status; children?: string; className?: string }) {
  const s = styles[status];
  return (
    <span className={cn("inline-flex h-7 items-center gap-2 rounded-hair border px-2.5 font-data text-label uppercase", s.className, className)}>
      {s.dot ? <span aria-hidden className={cn("v2-live-dot size-2 rounded-full", s.dot)} /> : null}
      {children ?? s.label}
    </span>
  );
}
