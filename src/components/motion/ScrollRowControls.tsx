"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@/components/icons";

// Prev/next arrows for a horizontal .scroll-row (PLAN.md §6 #12). Desktop only; touch users swipe.
export function ScrollRowControls({ targetId, label }: { targetId: string; label: string }) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const row = document.getElementById(targetId);
    if (!row) return;
    const update = () => {
      setAtStart(row.scrollLeft < 8);
      setAtEnd(row.scrollLeft + row.clientWidth > row.scrollWidth - 8);
    };
    const first = requestAnimationFrame(update);
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(first);
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  const scroll = (dir: 1 | -1) => {
    const row = document.getElementById(targetId);
    row?.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: "smooth" });
  };

  const btn =
    "grid h-10 w-10 place-items-center rounded-full border border-line text-text transition-[transform,border-color,opacity] duration-150 ease-snap hover:border-gold active:scale-[0.94] disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="hidden gap-2 lg:flex">
      <button type="button" className={btn} onClick={() => scroll(-1)} disabled={atStart} aria-label={`Previous ${label}`} aria-controls={targetId}>
        <ArrowRight className="rotate-180" />
      </button>
      <button type="button" className={btn} onClick={() => scroll(1)} disabled={atEnd} aria-label={`Next ${label}`} aria-controls={targetId}>
        <ArrowRight />
      </button>
    </div>
  );
}
