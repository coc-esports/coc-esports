import { cn } from "@/lib/cn";

// "Opens another site" arrow, drawn in the same square-cap 2px stroke as the menu and search icons.
export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" className={cn("inline-block size-[0.7em] shrink-0", className)}>
      <path d="M3.5 2.5h6v6M9.5 2.5l-7 7" />
    </svg>
  );
}
