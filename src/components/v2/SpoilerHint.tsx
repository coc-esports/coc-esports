"use client";

import { useEffect, useState } from "react";
import { SpoilerSwitch, useSpoilers } from "./Spoilers";

// One-time hint for first visitors (top right under the header, next to the switch it explains; a slim bar on
// phones over the decorative ticket band): fans who watch later should learn about "Hide results" before they scroll
// into a winner. Appears after a few seconds, once per device; dismissed by "Got it" or by using the switch.
const KEY = "gildra-hint-seen";

export function SpoilerHint() {
  const { hide } = useSpoilers();
  const [show, setShow] = useState(false);
  useEffect(() => {
    let seen = true;
    try {
      seen = localStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) return;
    const id = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(id);
  }, []);
  // It is a hint, not a nag: once the visitor has scrolled a good way down, it goes away for good.
  useEffect(() => {
    if (!show) return;
    const start = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - start) > window.innerHeight * 1.5) close();
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [show]);
  function close() {
    setShow(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  }
  if (!show || hide) return null;
  return (
    // Outer box is the fixed layer; .ticket-field sets position: relative, so it can't carry `fixed` itself.
    <div role="status" className="hint-in fixed inset-x-0 bottom-0 z-40 drop-shadow-[0_-12px_30px_rgba(5,3,30,0.7)] sm:inset-x-auto sm:bottom-auto sm:right-8 sm:top-[calc(var(--nav-h)+0.5rem)] sm:drop-shadow-[0_24px_40px_rgba(5,3,30,0.85)]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-rule px-4 py-1 sm:grid sm:ring-1 sm:ring-rule sm:max-w-[18rem] sm:gap-3 sm:border-t-0 sm:p-4 sm:pr-5" style={{ background: "var(--graphite)" }}>
      <p className="text-sm text-bone">
        <span className="font-semibold">Watching later?</span>
        <span className="hidden sm:inline"> Hide every result, score and qualified team until you choose to see it.</span>
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <span onClickCapture={close}>
          <SpoilerSwitch />
        </span>
        <button type="button" onClick={close} className="inline-flex h-11 items-center px-3 font-text text-sm font-semibold uppercase tracking-[0.12em] text-steel hover:text-bone">
          Got it
        </button>
      </div>
      </div>
    </div>
  );
}
