import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container, PageIntro } from "@/components/v2/Layout";
import { site } from "@/config/site";
import { sources } from "@/data/season";

export const metadata: Metadata = {
  title: "About",
  description: `What ${site.name} is, where its data comes from, and how it treats your privacy.`,
};

const link = "text-bone underline decoration-bolt decoration-2 underline-offset-4 hover:text-bolt";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-rule py-10 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
      <h2 className="font-cond text-h3 font-black uppercase text-bone">{title}</h2>
      <div className="grid max-w-[64ch] gap-4 text-lead text-steel">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageIntro title={`About ${site.name}`} intro={`${site.tagline}. Built by fans, for fans.`} />
      <Container className="py-12">
        <Block title="Not official">
          <p>
            {site.disclaimer} {site.name} isn&apos;t affiliated with, endorsed by or connected to Supercell. Clash of Clans and its artwork are trademarks
            of Supercell, used under{" "}
            <a href={site.fanPolicyUrl} target="_blank" rel="noopener noreferrer" className={link}>
              Supercell&apos;s Fan Content Policy
            </a>
            . All game art on this site comes from the official Supercell Fan Kit.
          </p>
          <p>The site is free and has no paid features.</p>
        </Block>
        <Block title="Where the data comes from">
          <p>Dates, results, standings and rules are collected by hand from these sources:</p>
          <ul className="grid gap-2">
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex min-h-11 items-center`}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>Liquipedia content is available under CC-BY-SA 3.0. If anything here disagrees with the official broadcasts, the broadcasts win. Unknown results are shown as TBD, never guessed.</p>
        </Block>
        <Block title="Your privacy">
          <p>
            {site.name} has no ads, no analytics trackers and no cookies. The only thing saved is your &ldquo;Hide results&rdquo; choice, kept on your own device. Fonts
            are served from this site, so your browser never contacts Google. Twitch only loads if you tap the player.
          </p>
        </Block>
        <Block title="Team marks">
          <p>Team marks are simple monograms made for this site, not the teams&apos; own logos.</p>
        </Block>
      </Container>
    </>
  );
}
