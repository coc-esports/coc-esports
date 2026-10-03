import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import { Header } from "@/components/v2/Header";
import { Footer } from "@/components/v2/Footer";
import { SpoilerProvider } from "@/components/v2/Spoilers";
import { SpoilerHint } from "@/components/v2/SpoilerHint";
import { SPOILER_BOOT } from "@/lib/spoilers";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/config/site";
import "./globals.css";

// v3 type system ("Will Call"). Tanker and Satoshi come from Fontshare (ITF Free Font License): downloaded unmodified
// at build time by scripts/fetch-fonts.mjs and self-hosted, never committed (the licence forbids public repositories).
// Geist Mono is OFL, self-hosted by next/font. Visitors never contact a font server.
const tanker = localFont({
  src: "../fonts/fontshare/Tanker-Regular.woff2",
  variable: "--font-tanker",
  weight: "400",
  display: "swap",
});

const satoshi = localFont({
  // Upright only: the design sets no italic text (and font-synthesis is off), so no italic file is downloaded.
  src: [{ path: "../fonts/fontshare/Satoshi-Variable.woff2", weight: "300 900", style: "normal" }],
  variable: "--font-satoshi",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0d0a3d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${tanker.variable} ${satoshi.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the visitor's "Hide results" choice before the first paint, so results never flash. */}
        <script dangerouslySetInnerHTML={{ __html: SPOILER_BOOT }} />
      </head>
      <body className="flex min-h-full flex-col bg-ink text-bone">
        <SpoilerProvider>
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-hair focus:bg-bone focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex flex-1 flex-col">
          {/* Page-to-page cross-fade (PLAN.md §6 #17); styles in globals.css */}
          <ViewTransition default="page">
            <div className="flex flex-1 flex-col">{children}</div>
          </ViewTransition>
        </main>
        <Footer />
        <SpoilerHint />
        </SpoilerProvider>
      </body>
    </html>
  );
}
