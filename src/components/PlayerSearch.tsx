"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { normalizeTag } from "@/lib/tags";
import { cn } from "@/lib/cn";

// Look up any player by tag, e.g. #2PP.
export function PlayerSearch({ className }: { className?: string }) {
  const router = useRouter();
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  return (
    <form
      role="search"
      className={cn("flex max-w-md flex-col gap-2", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const tag = normalizeTag(value);
        if (!tag) return setError(true);
        router.push(`/players/${tag}`);
      }}
    >
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-muted">
        Find a player by tag
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="#2PP"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-11 min-w-0 flex-1 rounded-sm border border-line bg-bg px-4 text-base uppercase text-text placeholder:text-muted/60 focus:border-gold focus:outline-none aria-invalid:border-live"
        />
        <button
          type="submit"
          className="h-11 rounded-sm bg-gold px-5 text-sm font-semibold uppercase tracking-wider text-bg transition-[transform,background-color] duration-150 ease-snap hover:bg-gold-bright active:scale-[0.97]"
        >
          Search
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-live">
          That doesn&apos;t look like a player tag. Find yours in-game on your profile, under your name.
        </p>
      )}
    </form>
  );
}
