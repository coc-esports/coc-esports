import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { sources } from "@/data/season";

export const metadata: Metadata = {
  title: "About",
  description: `What ${site.name} is, where its data comes from and how it relates to Supercell.`,
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-reveal className="border-t border-line py-10">
      <h2 className="font-display text-3xl uppercase leading-none">{title}</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-text/85">{children}</div>
    </section>
  );
}

const link = "text-gold underline underline-offset-4 hover:text-gold-bright";

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={`About ${site.name}`} intro={`${site.tagline}. Built by a fan, for fans.`} />
      <Container className="max-w-3xl py-12 sm:py-16">
        <Block title="Not official">
          <p>
            {site.disclaimer} {site.name} isn&apos;t affiliated with, endorsed by or connected to Supercell. Clash of Clans
            and its artwork are trademarks of Supercell, used under{" "}
            <a href={site.fanPolicyUrl} target="_blank" rel="noopener noreferrer" className={link}>
              Supercell&apos;s Fan Content Policy
            </a>
            .
          </p>
          <p>The site is free and has no paid features.</p>
        </Block>

        <Block title="Where the data comes from">
          <p>Dates, results, standings and rules are collected by hand from these sources:</p>
          <ul className="list-disc space-y-2 pl-6 marker:text-gold">
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            Liquipedia content is available under CC-BY-SA 3.0. If you spot a mistake, the official broadcasts and
            announcements always win.
          </p>
        </Block>

        <Block title="What's still sample data">
          <p>
            The Legend League ladder on the home page is placeholder data until it connects to the official Clash of
            Clans API. Team logos are simple placeholders until real artwork is added.
          </p>
        </Block>
      </Container>
    </>
  );
}
