"use client";

import { useEffect, type RefObject } from "react";

type Lib = typeof import("./gsap");
type Cleanup = (() => void) | void;

// GSAP is not part of the first page load: it downloads after the page is interactive, once, and only
// on pages that use an effect. Effects must therefore leave the page complete without it.
let lib: Promise<Lib> | null = null;
export const loadMotion = () => (lib ??= import("./gsap"));

// Runs `setup` with GSAP once it has loaded. Selector strings inside are scoped to `scope`.
// Everything created inside (tweens, ScrollTriggers, matchMedia) is reverted on unmount.
export function useMotion(scope: RefObject<HTMLElement | null>, setup: (m: Lib) => Cleanup) {
  useEffect(() => {
    let cancelled = false;
    let revert = () => {};
    loadMotion().then((m) => {
      if (cancelled || !scope.current) return;
      let inner: Cleanup;
      const ctx = m.gsap.context(() => {
        inner = setup(m);
      }, scope.current);
      revert = () => {
        inner?.();
        ctx.revert();
      };
    });
    return () => {
      cancelled = true;
      revert();
    };
    // setup is defined inline by callers and only needs to run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
