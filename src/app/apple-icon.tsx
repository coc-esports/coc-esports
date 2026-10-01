import { ImageResponse } from "next/og";
import { GMark } from "@/lib/og";

// Home-screen icon for iPhones/iPads: the Gildra G on ink.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0c0e" }}>
        <GMark size={112} />
      </div>
    ),
    size,
  );
}
