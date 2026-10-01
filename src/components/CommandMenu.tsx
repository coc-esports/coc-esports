"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/config/nav";
import { articles } from "@/data/news";
import { stages } from "@/data/season";
import { teams } from "@/data/teams";

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
  "flex cursor-pointer items-center justify-between gap-4 rounded-hair px-3 py-2.5 text-sm text-bone/85 hover:bg-plate/60 hover:text-bone data-[selected=true]:bg-plate data-[selected=true]:text-bone";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-data [&_[cmdk-group-heading]]:text-label [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-steel";

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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="grid h-11 w-11 place-items-center rounded-hair text-bone/80 transition-[transform,color,background-color] duration-150 ease-expo hover:bg-plate hover:text-bone focus-visible:text-bone active:scale-[0.94]"
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
        overlayClassName="fixed inset-0 z-50 bg-ink/80"
        contentClassName="fixed left-1/2 top-[12vh] z-50 w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-hair border border-rule bg-graphite shadow-[0_24px_80px_-20px_rgb(0_0_0/0.8)] outline-none"
      >
        <Dialog.Title className="sr-only">Search the site</Dialog.Title>
        <Dialog.Description className="sr-only">Find pages, teams, stages or news.</Dialog.Description>
        <div className="flex items-center gap-3 border-b border-rule px-4 text-steel">
          <SearchIcon />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search teams, stages, news…"
            className="h-14 flex-1 bg-transparent text-base text-bone outline-none placeholder:text-steel"
          />
          <kbd className="rounded-hair border border-rule px-1.5 py-0.5 font-data text-label">Esc</kbd>
        </div>
        <Command.List data-lenis-prevent className="max-h-[60vh] overflow-y-auto overscroll-contain p-2 outline-none">
          <Command.Empty className="px-3 py-8 text-center text-sm text-steel">
            No results. Try a team name or LCQ.
          </Command.Empty>

          <Command.Group heading="Teams" className={groupClass}>
            {teams.map((t) => (
              <Command.Item key={t.slug} value={`team ${t.name}`} keywords={[t.short]} onSelect={() => go(`/teams/${t.slug}`)} className={itemClass}>
                <span>{t.name}</span>
                <span className="text-xs text-steel">{t.qualified ? "Qualified" : `#${t.rank}`}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Stages" className={groupClass}>
            {stages.map((s) => (
              <Command.Item key={s.slug} value={`stage ${s.name}`} keywords={[s.dateLabel, s.kind === "lcq" ? "LCQ" : ""]} onSelect={() => go(`/stages/${s.slug}`)} className={itemClass}>
                <span>{s.name}</span>
                <span className="text-xs text-steel">{s.dateLabel}</span>
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
