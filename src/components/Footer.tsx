import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "@/components/icons";
import { footerNav } from "@/config/nav";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-text/80 transition-colors duration-150 hover:text-gold"
                        >
                          {link.label}
                          <ArrowUpRight width={12} height={12} />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-text/80 transition-colors duration-150 hover:text-gold"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.disclaimer} For more information see{" "}
            <a
              href={site.fanPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-text"
            >
              Supercell&apos;s Fan Content Policy
            </a>
            .
          </p>
          <p className="shrink-0">© 2026 {site.name} · Fan project</p>
        </div>
      </Container>
    </footer>
  );
}
