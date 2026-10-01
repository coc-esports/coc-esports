import Link from "next/link";
import { footerNav } from "@/config/nav";
import { site } from "@/config/site";
import { sources } from "@/data/season";
import { ClosingBand } from "./ClosingBand";
import { Wordmark } from "./Mark";
import { Label } from "./Type";
import { ExternalIcon } from "./Icons";

// Closing band (per page, see ClosingBand), then links, sources and the
// Supercell disclaimer at a readable size (required on every page).
export function Footer() {
  return (
    <footer className="mt-auto border-t border-rule bg-ink">
      <div className="mx-auto w-full max-w-page px-4 sm:px-8">
        <ClosingBand />

        <div className="grid gap-10 border-t border-rule py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="grid content-start gap-4">
            <Wordmark />
            <p className="max-w-[34ch] text-steel">{site.tagline}. Unofficial, made by fans.</p>
          </div>
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title} className="grid content-start gap-4">
              <Label>{col.title}</Label>
              <ul className="grid">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-bone/85 hover:text-bone">
                        {l.label} <ExternalIcon />
                      </a>
                    ) : (
                      <Link href={l.href} className="inline-flex min-h-11 min-w-11 items-center text-bone/85 hover:text-bone">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="grid gap-3 border-t border-rule py-8 text-sm text-steel">
          <p>
            {site.disclaimer} For more information see{" "}
            <a href={site.fanPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-bone underline decoration-bolt underline-offset-4">
              Supercell&apos;s Fan Content Policy
            </a>
            . Art from the official Supercell Fan Kit.
          </p>
          <p>
            Results and dates from{" "}
            {sources.map((s, i) => (
              <span key={s.href}>
                {i > 0 ? " and " : ""}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-bone">
                  {s.label}
                </a>
              </span>
            ))}
            . Liquipedia content is CC-BY-SA 3.0. © {new Date().getFullYear()} {site.name}, a fan project. No tracking, no ads.
          </p>
        </div>
      </div>
    </footer>
  );
}
