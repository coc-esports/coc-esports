import type { Metadata, Viewport } from "next";
import { Anton, Inter, Sofia_Sans_Extra_Condensed, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { ViewTransition } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

// v2 type system (Direction A). Self-hosted at build time: visitors never contact Google.
const sofiaCond = Sofia_Sans_Extra_Condensed({
  variable: "--font-sofia-cond",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
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
  themeColor: "#0e0f13",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${sofiaCond.variable} ${hanken.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <ScrollReveal />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to main content
        </a>
        <NavBar />
        <main id="main" className="flex flex-1 flex-col">
          {/* Page-to-page cross-fade (PLAN.md §6 #17); styles in globals.css */}
          <ViewTransition default="page">
            <div className="flex flex-1 flex-col">{children}</div>
          </ViewTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
