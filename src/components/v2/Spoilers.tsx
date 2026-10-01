"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// Site-wide spoiler switch (Riot Esports pattern). When on, results and winners stay hidden until tapped.
// Remembered on this device only (localStorage, guarded: private windows just start with spoilers shown).
const KEY = "gildra-hide-results";
const SpoilerContext = createContext<{ hide: boolean; toggle: () => void }>({ hide: false, toggle: () => {} });

export function SpoilerProvider({ children }: { children: ReactNode }) {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    try {
      // Reading a saved preference after hydration: the server can't know it.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHide(localStorage.getItem(KEY) === "1");
    } catch {}
  }, []);
  const toggle = useCallback(() => {
    setHide((h) => {
      try {
        localStorage.setItem(KEY, h ? "0" : "1");
      } catch {}
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
      <span aria-hidden className={cn("relative h-4 w-7 rounded-full border transition-colors", hide ? "border-bolt bg-bolt/25" : "border-rule")}>
        <span className={cn("absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full transition-[left,background-color] duration-200 ease-expo", hide ? "left-[13px] bg-bolt" : "left-[2px] bg-steel")} />
      </span>
      Hide results
    </button>
  );
}

// Wrap any result (score, winner name) so it respects the switch.
export function Spoiler({ children, label = "Show result" }: { children: ReactNode; label?: string }) {
  const { hide } = useSpoilers();
  const [shown, setShown] = useState(false);
  if (!hide || shown) return <>{children}</>;
  return (
    <button
      type="button"
      onClick={() => setShown(true)}
      className="inline-flex h-11 items-center rounded-hair border border-dashed border-rule px-3 font-data text-label uppercase text-steel hover:border-steel hover:text-bone"
    >
      {label}
    </button>
  );
}
