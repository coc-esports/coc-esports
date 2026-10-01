"use client";

import Image from "next/image";
import { useState } from "react";

// Click-to-load Twitch player: nothing from Twitch loads until the viewer asks (speed + privacy).
export function TwitchEmbed({ channel }: { channel: string }) {
  const [src, setSrc] = useState<string | null>(null);
  if (src) {
    return <iframe src={src} title={`${channel} on Twitch`} allowFullScreen className="aspect-video w-full rounded-hair border border-rule bg-graphite" />;
  }
  return (
    <button
      type="button"
      onClick={() => setSrc(`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}&muted=true`)}
      className="group relative block aspect-video w-full overflow-hidden rounded-hair border border-rule bg-graphite text-left"
      aria-label={`Load the ${channel} Twitch player`}
    >
      <Image src="/art/keyart-th17.webp" alt="" fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover opacity-50 grayscale transition-[opacity,filter] duration-500 ease-expo group-hover:opacity-70 group-hover:grayscale-0" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="rounded-hair bg-bone px-6 py-3 font-text text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink">Load Twitch player</span>
      </span>
      <span className="absolute bottom-3 left-3 font-data text-label uppercase text-bone/80">Loads twitch.tv only when you tap</span>
    </button>
  );
}
