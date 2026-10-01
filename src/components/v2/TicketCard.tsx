import Link from "next/link";
import { cn } from "@/lib/cn";
import { Label } from "./Type";

// One of the eight World Finals seats. Claimed: team + how it was won. Open: how it will be won (never an empty box).
// Tall poster proportion (Riot pattern). The flip from open to claimed is signature moment #2 (built in Step 5).
export type TicketCardProps =
  | { state: "claimed"; seat: number; team: string; href?: string; via: string; rank?: number; points?: string }
  | { state: "open"; seat: number; via: string; when?: string };

export function TicketCard(props: TicketCardProps) {
  const claimed = props.state === "claimed";
  const body = (
    <div
      className={cn(
        "group relative flex aspect-[3/4.2] min-w-0 lg:aspect-[5/4] lg:p-5 flex-col justify-between overflow-hidden rounded-hair border p-4 transition-colors duration-300 ease-expo",
        claimed ? "border-bolt/50 bg-[linear-gradient(180deg,#101a2b,var(--graphite))]" : "border-dashed border-rule bg-graphite",
        claimed && props.href && "hover:border-bolt",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Label tone={claimed ? "bolt" : "steel"}>{claimed ? "Ticket" : "Open"}</Label>
        <span className="font-data text-label text-steel tabular-nums">{String(props.seat).padStart(2, "0")}/08</span>
      </div>
      <div className="grid gap-2">
        <p className={cn("font-cond font-black uppercase leading-[0.9] text-balance", claimed ? "text-[2rem] text-bone lg:text-[2.5rem]" : "text-[1.5rem] text-steel lg:text-[1.75rem]")}>
          {claimed ? props.team : props.via}
        </p>
        <p className="text-sm leading-snug text-steel">
          {claimed ? props.via : (props.when ?? "Decided later in the season")}
          {claimed && props.rank ? ` · Season #${props.rank}${props.points ? ` · ${props.points} pts` : ""}` : ""}
        </p>
      </div>
    </div>
  );
  if (claimed && props.href) {
    return (
      <Link href={props.href} className="block rounded-hair">
        {body}
      </Link>
    );
  }
  return body;
}
