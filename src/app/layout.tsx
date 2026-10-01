import type { Metadata, Viewport } from "next";
import { Sofia_Sans_Extra_Condensed, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { ViewTransition } from "react";
import { Header } from "@/components/v2/Header";
import { Footer } from "@/components/v2/Footer";
import { SpoilerProvider } from "@/components/v2/Spoilers";
import { SPOILER_BOOT } from "@/lib/spoilers";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/config/site";
import "./globals.css";

// v2 type system (Direction A). Self-hosted at build time: visitors never contact Google.
// Only the weights the design uses, so the first view downloads as little as possible.
// Display and text faces are preloaded (largest text on screen, and the body text whose late swap re-wrapped
// lines and shifted the layout); the mono data face swaps in after.
const sofiaCond = Sofia_Sans_Extra_Condensed({
  variable: "--font-sofia-cond",
  subsets: ["latin"],
  weight: "900",
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: "400",
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
  themeColor: "#0b0c0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sofiaCond.variable} ${hanken.variable} ${jetbrains.variable} h-full antialiased`}
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
        </SpoilerProvider>
      </body>
    </html>
  );
}
