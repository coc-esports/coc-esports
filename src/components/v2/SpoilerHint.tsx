"use client";

import { useEffect, useState } from "react";
import { SpoilerSwitch, useSpoilers } from "./Spoilers";

// One-time hint for first visitors: fans who watch later should learn about "Hide results" before they scroll
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
  const close = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  };
  if (!show || hide) return null;
  return (
    // Outer box is the fixed layer; .ticket-field sets position: relative, so it can't carry `fixed` itself.
    <div role="status" className="hint-in fixed bottom-14 left-4 z-40 max-w-[calc(100vw-2rem)] drop-shadow-[0_24px_40px_rgba(5,3,30,0.85)] sm:left-8">
      <div className="ticket-field grid max-w-[22rem] gap-3 p-4 pr-5" style={{ background: "var(--graphite)" }}>
      <p className="text-sm text-bone">
        <span className="font-semibold">Watching later?</span> Hide every result, score and qualified team until you choose to see it.
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
