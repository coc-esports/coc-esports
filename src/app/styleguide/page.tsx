import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false },
};

const colors = [
  { name: "bg", hex: "#0E0F13", use: "Page background" },
  { name: "surface", hex: "#17191F", use: "Cards" },
  { name: "surface-2", hex: "#20232B", use: "Hovered cards, menus" },
  { name: "line", hex: "#2C303A", use: "Borders" },
  { name: "text", hex: "#F4F1EA", use: "Main text" },
  { name: "muted", hex: "#A3A7B3", use: "Meta text" },
  { name: "gold", hex: "#F5B82E", use: "Primary accent, one per screen" },
  { name: "elixir", hex: "#B04CE8", use: "Secondary accent, tags" },
  { name: "dark-elixir", hex: "#3B2A5A", use: "Gradients" },
  { name: "live", hex: "#E8453C", use: "LIVE badge, losses" },
  { name: "win", hex: "#5FD08B", use: "Wins, rank up" },
];

const typeScale = [
  { label: "Display XL", className: "font-display text-8xl uppercase leading-[0.9]", sample: "Worlds 2026" },
  { label: "Display L", className: "font-display text-6xl uppercase leading-none", sample: "The Chosen Eight" },
  { label: "Display M", className: "font-display text-4xl uppercase leading-none", sample: "Road to Worlds" },
  { label: "Heading", className: "text-2xl font-semibold", sample: "Last Chance Qualifier recap" },
  { label: "Body L", className: "text-lg", sample: "Eight teams fight for $700,000 on Town Hall 18." },
  { label: "Body", className: "text-base", sample: "Double-elimination bracket, 5v5 wars, live on YouTube and Twitch." },
  { label: "Meta", className: "text-sm text-muted", sample: "News · Sep 30, 2026" },
  { label: "Eyebrow", className: "text-xs font-bold uppercase tracking-[0.2em] text-gold", sample: "Next up" },
  { label: "Score", className: "font-display text-5xl tabular-nums", sample: "3 – 2" },
];

const motion = [
  { token: "ease-snap", curve: "cubic-bezier(0.23, 1, 0.32, 1)", use: "Enter/exit, hovers, menus" },
  { token: "ease-move", curve: "cubic-bezier(0.77, 0, 0.175, 1)", use: "Things moving across the screen" },
  { token: "ease-drawer", curve: "cubic-bezier(0.32, 0.72, 0, 1)", use: "Mobile menu, sheets" },
];

const badgeTones: BadgeTone[] = ["live", "upcoming", "completed", "qualified", "elixir", "neutral"];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-muted">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <Container className="pb-24 pt-[calc(var(--nav-h)+4rem)]">
      <header className="mb-12">
        <Badge tone="elixir">Phase 1</Badge>
        <h1 className="mt-4 font-display text-6xl uppercase leading-none sm:text-7xl">Styleguide</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Every building block of the site in one place. If something looks off here, it looks off everywhere, so fix
          it here first.
        </p>
      </header>

      <Block title="Colors">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {colors.map((c) => (
            <li key={c.name} className="overflow-hidden rounded-sm border border-line">
              <div className="h-20" style={{ background: `var(--${c.name})` }} />
              <div className="bg-surface p-3">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="font-mono text-xs text-muted">{c.hex}</p>
                <p className="mt-1 text-xs text-muted">{c.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Typography · Anton (display) + Inter (text)">
        <ul className="space-y-6">
          {typeScale.map((t) => (
            <li key={t.label} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:items-baseline">
              <span className="text-xs uppercase tracking-widest text-muted">{t.label}</span>
              <span className={`${t.className} min-w-0 break-words`}>{t.sample}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Buttons">
        <div className="space-y-6">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-4">
              <span className="w-24 text-xs uppercase tracking-widest text-muted">{variant}</span>
              {variant === "ghost" ? (
                <Button variant="ghost">
                  See bracket <ArrowRight />
                </Button>
              ) : (
                <>
                  <Button variant={variant} size="sm">Small</Button>
                  <Button variant={variant}>Medium</Button>
                  <Button variant={variant} size="lg">Large</Button>
                  <Button variant={variant} disabled>Disabled</Button>
                </>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">Press and hold a button: it shrinks slightly so you know the site heard you.</p>
      </Block>

      <Block title="Badges">
        <div className="flex flex-wrap gap-3">
          {badgeTones.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone === "elixir" ? "TH18" : tone === "neutral" ? "Monthly Final" : undefined}
            </Badge>
          ))}
        </div>
      </Block>

      <Block title="Section header">
        <SectionHeader eyebrow="Latest" title="What's happening?" href="/news" />
        <SectionHeader title="From the Vault" href="/watch" linkLabel="All videos" />
      </Block>

      <Block title="Motion">
        <ul className="divide-y divide-line rounded-sm border border-line">
          {motion.map((m) => (
            <li key={m.token} className="grid gap-1 p-4 sm:grid-cols-[160px_1fr_1fr]">
              <code className="text-sm text-gold">{m.token}</code>
              <code className="text-xs text-muted">{m.curve}</code>
              <span className="text-sm">{m.use}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Rules: menus and hovers stay under 300ms, exits are faster than entrances, only transform and opacity animate,
          and everything calms down when your device asks for reduced motion.
        </p>
      </Block>

      <Block title="Navigation">
        <p className="max-w-2xl text-muted">
          Scroll down: the top bar hides. Scroll up: it comes back. Hover or click <strong className="text-text">Worlds</strong> or{" "}
          <strong className="text-text">Teams</strong> for the mega-menu (Esc closes it). On a phone, the menu button
          opens a full-screen menu.
        </p>
        <div className="h-[60vh]" aria-hidden />
      </Block>
    </Container>
  );
}
