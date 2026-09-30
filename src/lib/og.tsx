import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/config/site";

// Shared renderer for link-preview images (Open Graph): the card people see when the site is shared.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const anton = readFile(join(process.cwd(), "src/assets/Anton-Regular.ttf"));

const GOLD = "#f5b82e";

export function Shield({ size }: { size: number }) {
  return (
    <svg width={size} height={(size * 26) / 22} viewBox="0 0 22 26">
      <path d="M11 1l9 3.5v7.2c0 6-3.9 10.6-9 13.3C5.9 22.3 2 17.7 2 11.7V4.5L11 1z" fill={GOLD} />
      <path d="M11 6l4.5 1.8v4c0 3.2-1.9 5.6-4.5 7.1-2.6-1.5-4.5-3.9-4.5-7.1v-4L11 6z" fill="#0e0f13" />
    </svg>
  );
}

export async function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse 70% 80% at 85% 10%, #4a2a6b 0%, #0e0f13 65%)",
          color: "#f4f1ea",
          fontFamily: "Anton",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Shield size={44} />
          <div style={{ fontSize: 36, textTransform: "uppercase", letterSpacing: 1 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: GOLD, textTransform: "uppercase", letterSpacing: 4 }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 28 ? 92 : 120, lineHeight: 0.95, textTransform: "uppercase", marginTop: 16 }}>
            {title}
          </div>
          {subtitle && <div style={{ fontSize: 34, color: "#a3a7b3", marginTop: 24, textTransform: "uppercase" }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", height: 8, width: 160, background: GOLD }} />
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Anton", data: await anton, style: "normal", weight: 400 }] },
  );
}
