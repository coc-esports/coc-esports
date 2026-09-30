import Link from "next/link";
import { site } from "@/config/site";

// Placeholder wordmark: a gold shield + brand name. Replace once the brand is final.
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden>
        <path d="M11 1l9 3.5v7.2c0 6-3.9 10.6-9 13.3C5.9 22.3 2 17.7 2 11.7V4.5L11 1z" fill="var(--gold)" />
        <path d="M11 6l4.5 1.8v4c0 3.2-1.9 5.6-4.5 7.1-2.6-1.5-4.5-3.9-4.5-7.1v-4L11 6z" fill="var(--bg)" />
      </svg>
      <span className="font-display text-xl uppercase leading-none tracking-wide">{site.name}</span>
    </Link>
  );
}
