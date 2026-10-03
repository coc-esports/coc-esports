"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SPOILER_ATTR, SPOILER_KEY as KEY } from "@/lib/spoilers";

// Site-wide spoiler switch (Riot Esports pattern). When on, results and winners stay hidden until tapped.
// Remembered on this device only (localStorage, guarded: private windows just start with spoilers shown).
// The <html> attribute (set before paint by SPOILER_BOOT) drives the CSS; the context drives client logic.
const SpoilerContext = createContext<{ hide: boolean; toggle: () => void }>({ hide: false, toggle: () => {} });

export function SpoilerProvider({ children }: { children: ReactNode }) {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    try {
      // Reading a saved preference after hydration: the server can't know it.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHide(document.documentElement.hasAttribute(SPOILER_ATTR));
    } catch {}
  }, []);
  const toggle = useCallback(() => {
    setHide((h) => {
      try {
        localStorage.setItem(KEY, h ? "0" : "1");
      } catch {}
      document.documentElement.toggleAttribute(SPOILER_ATTR, !h);
      return !h;
    });
  }, []);
  return <SpoilerContext.Provider value={{ hide, toggle }}>{children}</SpoilerContext.Provider>;
}

export const useSpoilers = () => useContext(SpoilerContext);

export function SpoilerSwitch({ className }: { className?: string }) {
  const { hide, toggle } = useSpoilers();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={hide}
      onClick={toggle}
      className={cn("flex h-11 items-center gap-2.5 rounded-hair px-2 font-data text-label uppercase text-steel transition-colors hover:text-bone", className)}
    >
      <span aria-hidden className={cn("relative h-4 w-7 rounded-full border transition-colors", hide ? "border-bolt bg-bolt" : "border-steel/60")}>
        <span className={cn("absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full transition-[left,background-color] duration-200 ease-expo", hide ? "left-[13px] bg-ink" : "left-[2px] bg-steel")} />
      </span>
      Hide results
    </button>
  );
}

// Wrap any result (score, winner name) so it respects the switch, with its own reveal button.
// Both versions are in the HTML and CSS picks one, so nothing flashes before React loads.
export function Spoiler({ children, label = "Show result" }: { children: ReactNode; label?: string }) {
  const [shown, setShown] = useState(false);
  if (shown) return <>{children}</>;
  return (
    <>
      <span className="sp-real">{children}</span>
      <button
        type="button"
        onClick={() => setShown(true)}
        className="sp-safe inline-flex h-11 items-center rounded-hair border border-dashed border-rule px-3 font-data text-label uppercase text-steel hover:border-steel hover:text-bone"
      >
        {label}
      </button>
    </>
  );
}
