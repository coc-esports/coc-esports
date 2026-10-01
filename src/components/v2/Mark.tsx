import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

// Gildra mark: a squared condensed "G" whose crossbar is struck by a lightning notch (TH18 bolt).
// Bone on ink; the bolt is the one accent. Works at 16px (favicon) up to hero size.
export function GMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <path d="M27 11V5H5v30h22V20H16" fill="none" stroke="var(--bone)" strokeWidth="6" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M19 14.5h7l-3.2 5.2H27L16.5 31l2.6-8.2h-3.8z" fill="var(--bolt)" />
    </svg>
  );
}

export function Wordmark({ onClick, className }: { onClick?: () => void; className?: string }) {
  return (
    <Link href="/" onClick={onClick} className={cn("group flex h-11 items-center gap-2.5", className)} aria-label={`${site.name} home`}>
      <GMark className="h-7 w-auto transition-transform duration-300 ease-expo group-hover:-rotate-3" />
      <span className="font-cond text-[1.625rem] font-black uppercase leading-none tracking-[0.02em] text-bone">{site.name}</span>
    </Link>
  );
}
