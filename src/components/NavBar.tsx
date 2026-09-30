"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CommandMenu } from "@/components/CommandMenu";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown, CloseIcon, MenuIcon } from "@/components/icons";
import { mainNav, type NavItem } from "@/config/nav";
import { cn } from "@/lib/cn";

const HOVER_CLOSE_DELAY = 120;

function isActive(pathname: string, item: NavItem) {
  // Anchor links (e.g. /worlds#qualified under Teams) point into other sections, so they don't count.
  const paths = [item.href, ...(item.children?.filter((c) => !c.href.includes("#")).map((c) => c.href) ?? [])];
  return paths.some((p) => p !== "/" && (pathname === p || pathname.startsWith(`${p}/`)));
}

export function NavBar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [instant, setInstant] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  // How the open mega-menu was opened; decides click and Esc behaviour.
  const openedVia = useRef<"hover" | "click" | "keyboard">("hover");

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const open = (label: string, via: "hover" | "click" | "keyboard") => {
    cancelClose();
    openedVia.current = via;
    setInstant(openMenu !== null && openMenu !== label);
    setOpenMenu(label);
  };

  const onTriggerClick = (label: string, isOpen: boolean, keyboard: boolean) => {
    // A mouse click right after hover-open should keep the menu open, not close it.
    if (isOpen && !keyboard && openedVia.current === "hover") {
      openedVia.current = "click";
      return;
    }
    if (isOpen) closeAll();
    else open(label, keyboard ? "keyboard" : "click");
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setInstant(false);
      setOpenMenu(null);
    }, HOVER_CLOSE_DELAY);
  };

  const closeAll = () => {
    cancelClose();
    setInstant(false);
    setOpenMenu(null);
    setMobileOpen(false);
  };

  // Solid background after 80px; hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (Math.abs(y - lastY) > 6) {
        setHiddenByScroll(y > lastY && y > 200);
        lastY = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc closes; clicking outside closes the mega-menu.
  // Focus returns to the trigger only for keyboard users. Doing it for mouse users makes the
  // browser show the gold focus ring after the Esc key press.
  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMenu) {
        const trigger = triggerRefs.current[openMenu];
        const panel = document.getElementById(`mega-${openMenu.toLowerCase()}`);
        const keyboardUser = openedVia.current === "keyboard" || panel?.contains(document.activeElement);
        if (keyboardUser) trigger?.focus();
        else if (headerRef.current?.contains(document.activeElement)) (document.activeElement as HTMLElement).blur();
      }
      if (mobileOpen) mobileButtonRef.current?.focus();
      closeAll();
    };
    const onPointer = (e: PointerEvent) => {
      if (openMenu && !headerRef.current?.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  });

  // Lock page scroll behind the mobile menu; close it if the screen grows to desktop size.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMobileOpen(false);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = prev;
      mq.removeEventListener("change", onChange);
    };
  }, [mobileOpen]);

  const solid = scrolled || openMenu !== null || mobileOpen;
  const hidden = hiddenByScroll && !openMenu && !mobileOpen;

  return (
    <header
      ref={headerRef}
      data-instant={instant}
      data-solid={solid}
      className={cn(
        // The frosted background lives on ::before (.site-header in globals.css). A backdrop-filter on the
        // header itself would trap the fixed-position mobile menu inside the 64px bar.
        "site-header fixed inset-x-0 top-0 z-40 border-b transition-[transform,border-color] duration-300 ease-snap",
        solid ? "border-line" : "border-transparent",
        hidden && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-(--nav-h) max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo onClick={closeAll} />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => {
              const active = isActive(pathname, item);
              if (!item.children) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      data-active={active}
                      aria-current={active ? "page" : undefined}
                      className="nav-link text-sm font-semibold uppercase tracking-wider text-text/80 transition-colors duration-150 hover:text-text data-[active=true]:text-text"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = openMenu === item.label;
              const panelId = `mega-${item.label.toLowerCase()}`;
              return (
                <li
                  key={item.label}
                  onPointerEnter={(e) => e.pointerType === "mouse" && open(item.label, "hover")}
                  onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
                >
                  {/* The label is a real link (one click goes to the page, like Riot's nav);
                      hover opens the menu, and the arrow opens it for touch and keyboard users. */}
                  <div className="flex items-center gap-0.5">
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      data-active={active}
                      data-open={isOpen}
                      aria-current={active ? "page" : undefined}
                      className="nav-link text-sm font-semibold uppercase tracking-wider text-text/80 transition-colors duration-150 hover:text-text data-[active=true]:text-text data-[open=true]:text-text"
                    >
                      {item.label}
                    </Link>
                    <button
                      ref={(el) => {
                        triggerRefs.current[item.label] = el;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-label={`${item.label} menu`}
                      onClick={(e) => onTriggerClick(item.label, isOpen, e.detail === 0)}
                      className="grid h-7 w-6 place-items-center rounded-sm text-text/70 transition-colors duration-150 hover:text-text aria-expanded:text-text"
                    >
                      <ChevronDown
                        className={cn("transition-transform duration-200 ease-snap", isOpen && "rotate-180")}
                      />
                    </button>
                  </div>

                  <div
                    id={panelId}
                    data-open={isOpen}
                    inert={!isOpen}
                    className="mega absolute inset-x-0 top-full border-b border-line bg-bg/95 backdrop-blur-md"
                  >
                    <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-8 px-8 py-10">
                      <ul className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-2">
                        {item.children.map((child, i) => (
                          <li key={child.href + child.label} data-stagger style={{ "--i": i } as CSSProperties}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              className="group block rounded-sm p-3 transition-colors duration-150 hover:bg-surface"
                            >
                              <span className="flex items-center gap-2 font-semibold text-text">
                                {child.label}
                                <ArrowRight className="-translate-x-1 opacity-0 transition-[transform,opacity] duration-200 ease-snap group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                              </span>
                              {child.description && (
                                <span className="mt-1 block text-sm text-muted">{child.description}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {item.feature && (
                        <Link
                          href={item.feature.href}
                          onClick={closeAll}
                          data-stagger
                          style={{ "--i": item.children.length } as CSSProperties}
                          className="group col-span-4 flex flex-col justify-end rounded-sm border border-line bg-[radial-gradient(ellipse_at_top_right,var(--dark-elixir),var(--surface)_70%)] p-6 transition-colors duration-150 hover:border-gold/50"
                        >
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                            {item.feature.eyebrow}
                          </span>
                          <span className="mt-2 font-display text-3xl uppercase leading-none">
                            {item.feature.title}
                          </span>
                          <span className="mt-3 text-sm text-muted">{item.feature.meta}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CommandMenu />
          <Button href="/worlds" size="sm" className="max-sm:hidden" onClick={closeAll}>
            Follow Worlds
          </Button>
          <button
            ref={mobileButtonRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="-mr-2 grid h-11 w-11 place-items-center rounded-sm text-text transition-transform duration-150 ease-snap active:scale-[0.94] lg:hidden"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        data-open={mobileOpen}
        inert={!mobileOpen}
        className="mobile-menu fixed inset-x-0 bottom-0 top-(--nav-h) overflow-y-auto bg-bg lg:hidden"
      >
        <nav aria-label="Mobile" className="px-4 pb-10 pt-6 sm:px-6">
          <ul>
            {mainNav.map((item, i) => (
              <li
                key={item.label}
                data-stagger
                style={{ "--i": i } as CSSProperties}
                className="border-b border-line py-4"
              >
                <Link
                  href={item.href}
                  onClick={closeAll}
                  aria-current={isActive(pathname, item) ? "page" : undefined}
                  className="font-display text-4xl uppercase leading-none aria-[current=page]:text-gold"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link href={child.href} onClick={closeAll} className="text-sm text-muted hover:text-text">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div data-stagger style={{ "--i": mainNav.length } as CSSProperties} className="mt-8">
            <Button href="/worlds" size="lg" className="w-full" onClick={closeAll}>
              Follow Worlds
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
