"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/config/nav";
import { articles } from "@/data/news";
import { stages } from "@/data/season";
import { teams } from "@/data/teams";
import { normalizeTag } from "@/lib/tags";

const pages = [
  { label: "Home", href: "/" },
  { label: "World Championship", href: "/worlds" },
  ...mainNav.filter((n) => n.href !== "/worlds").map((n) => ({ label: n.label, href: n.href })),
  { label: "All stages", href: "/stages" },
  { label: "About", href: "/about" },
];

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M12.2 12.2L16 16" strokeLinecap="round" />
    </svg>
  );
}

// Hover is plain CSS (no re-render while the mouse moves); the keyboard highlight uses data-selected.
const itemClass =
  "flex cursor-pointer items-center justify-between gap-4 rounded-sm px-3 py-2.5 text-sm text-text/85 hover:bg-surface-2/60 hover:text-text data-[selected=true]:bg-surface-2 data-[selected=true]:text-text";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-muted";

// Site search (PLAN.md §6 #20): Ctrl+K / ⌘K or the search button. Opens instantly, no animation,
// because it's a tool people reach for often.
export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setSearch("");
    router.push(href);
  };

  const tag = search.trim().startsWith("#") ? normalizeTag(search) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="grid h-11 w-11 place-items-center rounded-sm text-text/80 outline-none transition-[transform,color,background-color] duration-150 ease-snap hover:bg-surface-2 hover:text-text focus-visible:bg-surface-2 focus-visible:text-text active:scale-[0.94]"
      >
        <SearchIcon />
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setSearch("");
        }}
        label="Search the site"
        // Mouse movement doesn't move the highlight: otherwise scrolling the list keeps re-selecting the
        // item under the pointer and snapping it into view, which makes scrolling feel sticky.
        disablePointerSelection
        loop
        overlayClassName="fixed inset-0 z-50 bg-bg/80"
        contentClassName="fixed left-1/2 top-[12vh] z-50 w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-sm border border-line bg-surface shadow-[0_24px_80px_-20px_rgb(0_0_0/0.8)] outline-none"
      >
        <Dialog.Title className="sr-only">Search the site</Dialog.Title>
        <Dialog.Description className="sr-only">Find pages, teams, stages, news or a player by tag.</Dialog.Description>
        <div className="flex items-center gap-3 border-b border-line px-4 text-muted">
          <SearchIcon />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search teams, stages, news… or #player-tag"
            className="h-14 flex-1 bg-transparent text-base text-text outline-none placeholder:text-muted"
          />
          <kbd className="rounded-sm border border-line px-1.5 py-0.5 text-[11px]">Esc</kbd>
        </div>
        <Command.List data-lenis-prevent className="max-h-[60vh] overflow-y-auto overscroll-contain p-2 outline-none">
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
            No results. Tip: type # and a player tag to look up a player.
          </Command.Empty>

          {tag && (
            <Command.Group heading="Player" className={groupClass}>
              <Command.Item value={`player ${search}`} onSelect={() => go(`/players/${tag}`)} className={itemClass}>
                <span>
                  Look up player <span className="font-mono text-gold">#{tag}</span>
                </span>
              </Command.Item>
            </Command.Group>
          )}

          <Command.Group heading="Teams" className={groupClass}>
            {teams.map((t) => (
              <Command.Item key={t.slug} value={`team ${t.name}`} keywords={[t.short]} onSelect={() => go(`/teams/${t.slug}`)} className={itemClass}>
                <span>{t.name}</span>
                <span className="text-xs text-muted">{t.qualified ? "Qualified" : `#${t.rank}`}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Stages" className={groupClass}>
            {stages.map((s) => (
              <Command.Item key={s.slug} value={`stage ${s.name}`} keywords={[s.dateLabel, s.kind === "lcq" ? "LCQ" : ""]} onSelect={() => go(`/stages/${s.slug}`)} className={itemClass}>
                <span>{s.name}</span>
                <span className="text-xs text-muted">{s.dateLabel}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="News" className={groupClass}>
            {articles.map((a) => (
              <Command.Item key={a.slug} value={`news ${a.title}`} keywords={[a.category]} onSelect={() => go(`/news/${a.slug}`)} className={itemClass}>
                <span className="truncate">{a.title}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Pages" className={groupClass}>
            {pages.map((p) => (
              <Command.Item key={p.href} value={`page ${p.label}`} onSelect={() => go(p.href)} className={itemClass}>
                <span>{p.label}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
