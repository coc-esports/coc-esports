import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Security headers (web-security-privacy skill). Pages are static, so the CSP uses 'unsafe-inline' for
// Next's inline bootstrap scripts instead of per-request nonces (which would force dynamic rendering).
// The only third party is the Twitch player, and it loads only when a visitor taps it.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://player.twitch.tv",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Dev mode needs eval for React's error overlay, so the CSP applies to production builds only.
  ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Live-data pages were removed in the v2 rebuild (they needed paid hosting); old links land on Teams.
    return [
      { source: "/leaderboards", destination: "/teams", permanent: true },
      { source: "/players/:tag*", destination: "/teams", permanent: true },
      // The stages list merged into Schedule (2026-10-01, owner decision); stage pages stay at /stages/<slug>.
      { source: "/stages", destination: "/schedule", permanent: true },
    ];
  },
};

// News articles are .mdx files in src/content/news, loaded with dynamic imports.
const withMDX = createMDX({});

export default withMDX(nextConfig);
