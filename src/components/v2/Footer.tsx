import Link from "next/link";
import { footerNav } from "@/config/nav";
import { site } from "@/config/site";
import { season, sources } from "@/data/season";
import { Button } from "./Button";
import { Wordmark } from "./Mark";
import { Label } from "./Type";

// Closing band: one giant line + the next action (The Romans / Akufen pattern), then links, sources and the
// Supercell disclaimer at a readable size (required on every page).
export function Footer() {
  const slug = season.nextEvent.href.split("/").pop();
  return (
    <footer className="mt-auto border-t border-rule bg-ink">
      <div className="mx-auto w-full max-w-page px-4 sm:px-8">
        <div className="grid gap-8 py-16 sm:py-24">
          <p className="font-cond text-mega font-black uppercase text-bone text-balance">
            Follow the road <span className="italic text-steel">to Worlds.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`/calendar/${slug}`} prefetch={false} download>
              Add {season.nextEvent.name} to calendar
            </Button>
            <Button href="/watch" variant="outline">
              Where to watch
            </Button>
          </div>
        </div>

        <div className="grid gap-10 border-t border-rule py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="grid content-start gap-4">
            <Wordmark />
            <p className="max-w-[34ch] text-steel">{site.tagline}. Unofficial, made by fans.</p>
          </div>
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title} className="grid content-start gap-4">
              <Label>{col.title}</Label>
              <ul className="grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-bone/85 hover:text-bone">
                        {l.label} <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <Link href={l.href} className="text-bone/85 hover:text-bone">
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
