"use client";

import { useState } from "react";
import { ArtPanel } from "@/components/ArtPanel";

// Click-to-load Twitch player: nothing heavy loads until the viewer asks for it (PLAN.md §8).
export function TwitchEmbed({ channel }: { channel: string }) {
  const [src, setSrc] = useState<string | null>(null);

  if (src) {
    return (
      <iframe
        src={src}
        title={`${channel} on Twitch`}
        allowFullScreen
        className="aspect-video w-full rounded-sm border border-line bg-bg"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setSrc(`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}&muted=true`)}
      className="group block w-full text-left"
      aria-label={`Load the ${channel} Twitch player`}
    >
      <ArtPanel tone="elixir" glyph="LIVE" className="aspect-video rounded-sm border border-line">
        <div className="absolute inset-0 grid place-items-center">
          <span className="rounded-sm bg-bg/80 px-5 py-3 text-sm font-semibold uppercase tracking-wider backdrop-blur-sm transition-colors duration-150 group-hover:bg-gold group-hover:text-bg">
            Load Twitch player
          </span>
        </div>
      </ArtPanel>
    </button>
  );
}
