import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Clan badges and league icons served by the official Clash of Clans API.
    remotePatterns: [{ protocol: "https", hostname: "api-assets.clashofclans.com" }],
  },
};

// News articles are .mdx files in src/content/news, loaded with dynamic imports.
const withMDX = createMDX({});

export default withMDX(nextConfig);
