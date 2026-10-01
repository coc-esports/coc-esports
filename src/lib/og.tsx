import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/config/site";

// Link-preview images (Open Graph), v2 Broadcast Editorial: ink, bone, one bolt accent, giant condensed caps.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const display = readFile(join(process.cwd(), "src/assets/SofiaSansExtraCondensed-Black.woff"));

const INK = "#0b0c0e";
const BONE = "#f1f2f0";
const STEEL = "#8b929b";
const BOLT = "#5b9bff";

// The Gildra G: squared condensed G with a lightning notch through the crossbar.
export function GMark({ size }: { size: number }) {
  return (
    <svg width={(size * 32) / 40} height={size} viewBox="0 0 32 40">
      <path d="M27 11V5H5v30h22V20H16" fill="none" stroke={BONE} strokeWidth="6" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M19 14.5h7l-3.2 5.2H27L16.5 31l2.6-8.2h-3.8z" fill={BOLT} />
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
          background: `radial-gradient(ellipse 55% 70% at 88% 18%, rgba(91,155,255,0.28) 0%, ${INK} 62%)`,
          color: BONE,
          fontFamily: "Sofia",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <GMark size={56} />
          <div style={{ fontSize: 44, textTransform: "uppercase", letterSpacing: 1 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: BOLT, textTransform: "uppercase", letterSpacing: 3 }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 26 ? 104 : 136, lineHeight: 0.86, textTransform: "uppercase", marginTop: 14 }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 34, color: STEEL, marginTop: 22, textTransform: "uppercase", letterSpacing: 1 }}>{subtitle}</div> : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: STEEL, textTransform: "uppercase", letterSpacing: 2 }}>
          <span>Unofficial fan site · Not approved by Supercell</span>
          <span style={{ display: "flex", width: 140, height: 6, background: BOLT }} />
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Sofia", data: await display, style: "normal", weight: 900 }] },
  );
}
