import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Data label: mono, uppercase, tracked. Used for eyebrows, dates, times, stage names.
export function Label({ children, tone = "steel", className }: { children: ReactNode; tone?: "steel" | "bolt" | "bone"; className?: string }) {
  const color = { steel: "text-steel", bolt: "text-bolt", bone: "text-bone" }[tone];
  return <span className={cn("font-data text-label uppercase", color, className)}>{children}</span>;
}

// Giant condensed heading built from lines. Each line rises out of its own mask on load (CSS in globals: .v2-line).
// A line can carry a small inline image (The Romans pattern): pass { image: { src, alt } } as a line part.
type Part = string | { image: { src: string; alt: string } } | { em: string };
export function DisplayHeading({
  lines,
  as: Tag = "h2",
  size = "hero",
  className,
}: {
  lines: Part[][];
  as?: "h1" | "h2" | "h3";
  size?: "mega" | "hero" | "h1" | "h2";
  className?: string;
}) {
  const sizes = { mega: "text-mega", hero: "text-hero", h1: "text-h1", h2: "text-h2" };
  return (
    <Tag className={cn("font-cond font-black uppercase text-bone text-balance", sizes[size], className)}>
      {lines.map((parts, i) => (
        <span key={i} className="v2-line" style={{ ["--i" as string]: i }}>
          <span>
            {parts.map((part, j) => {
              if (typeof part === "string") return <span key={j}>{part}</span>;
              if ("em" in part)
                return (
                  <em key={j} className="italic text-steel">
                    {part.em}
                  </em>
                );
              return (
                <span key={j} className="relative mx-[0.06em] inline-block h-[0.74em] w-[1.2em] overflow-hidden align-[-0.02em]">
                  <Image src={part.image.src} alt={part.image.alt} fill sizes="12rem" className="object-cover" />
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </Tag>
  );
}
