"use client";

import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/config/nav";
import { getStage, season } from "@/data/season";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Wordmark } from "./Mark";
import { SpoilerSwitch } from "./Spoilers";

// The one main action changes with time: "Watch live" from 24 h before an event until it ends,
// "Add to calendar" the rest of the time (docs/plan.md). Decided in the browser so it's always current.
// Search (cmdk + dialog) loads only after the page is interactive, so it stays out of the first-load JS.
const CommandMenu = dynamic(() => import("@/components/CommandMenu").then((m) => m.CommandMenu), {
  ssr: false,
  loading: () => <span aria-hidden className="block size-11" />,
});

function useLiveWindow() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const stage = getStage(season.nextEvent.href.split("/").pop() ?? "");
    const start = new Date(season.nextEvent.startTime).getTime();
    const end = stage?.endTime ? new Date(stage.endTime).getTime() : start + 36e5 * 30;
    const check = () => setLive(Date.now() >= start - 864e5 && Date.now() < end);
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return live;
}

function MainCta({ live, className }: { live: boolean; className?: string }) {
  const slug = season.nextEvent.href.split("/").pop();
  return live ? (
    <Button href="/watch" className={className}>
      Watch live
    </Button>
  ) : (
    <Button href={`/calendar/${slug}`} prefetch={false} download className={className}>
      Add to calendar
    </Button>
  );
}

export function Header() {
  const pathname = usePathname();
  const live = useLiveWindow();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Solid after 40px; slides away on scroll down, returns on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 200);
        last = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // Close the phone menu on navigation (render-time sync: no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`) || (href === "/schedule" && pathname.startsWith("/stages"));

  return (
    <header
      data-solid={solid || open}
      className={cn(
        "site-header fixed inset-x-0 top-0 z-40 h-[var(--nav-h)] transition-transform duration-300 ease-expo",
        hidden && !open && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-page items-center gap-8 px-4 sm:px-8">
        <Wordmark />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  data-active={active(n.href)}
                  aria-current={active(n.href) ? "page" : undefined}
                  className="nav-link inline-flex h-11 min-w-11 items-center justify-center font-text text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-steel transition-colors hover:text-bone data-[active=true]:text-bone"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <SpoilerSwitch className="hidden md:flex" />
          <CommandMenu />
          {/* Wide screens only: on phones and tablets the bar keeps logo, search and menu; the action lives in the menu.
              Wrapped because Button sets its own display, which would override a "hidden" class. */}
          <span className="ml-2 hidden lg:inline-flex">
            <MainCta live={live} className="h-11 px-5" />
          </span>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button type="button" className="grid size-11 place-items-center rounded-hair text-bone hover:bg-graphite lg:hidden" aria-label="Open menu">
                <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7h16M3 15h16" strokeLinecap="square" />
                </svg>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content data-lenis-prevent className="mobile-sheet fixed inset-0 z-50 flex flex-col bg-ink px-4 pb-8 pt-4 outline-none sm:px-8">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">Site sections</Dialog.Description>
                <div className="flex h-[calc(var(--nav-h)-1rem)] items-center justify-between">
                  <Wordmark onClick={() => setOpen(false)} />
                  <Dialog.Close className="grid size-11 place-items-center rounded-hair text-bone hover:bg-graphite" aria-label="Close menu">
                    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 5l12 12M17 5L5 17" strokeLinecap="square" />
                    </svg>
                  </Dialog.Close>
                </div>
                <nav aria-label="Main" className="mt-6 flex-1">
                  <ul className="grid gap-1">
                    {[{ label: "Home", href: "/" }, ...mainNav].map((n, i) => (
                      <li key={n.href} style={{ ["--i" as string]: i }} className="mobile-link">
                        <Link
                          href={n.href}
                          aria-current={pathname === n.href ? "page" : undefined}
                          className={cn("block py-1 font-cond text-[3.25rem] uppercase leading-none", pathname === n.href ? "text-bolt" : "text-bone")}
                        >
                          {n.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="grid gap-4 border-t border-rule pt-6">
                  <SpoilerSwitch className="-ml-2 w-fit" />
                  <MainCta live={live} className="w-full" />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
