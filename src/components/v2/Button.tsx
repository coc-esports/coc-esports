import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "text";
type Common = { variant?: Variant; className?: string; children: ReactNode };
type LinkRest = { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonRest = { href?: never } & Omit<ComponentProps<"button">, "className" | "children">;
export type ButtonProps = Common & (LinkRest | ButtonRest);

// "Will Call" buttons are ticket parts (globals.css): solid = the foil tear-off stub (the one main action per view),
// outline = an engraved hairline field, text = inline link with a halo underline. All >= 44px tall.
const base =
  "inline-flex items-center justify-center gap-2 select-none whitespace-nowrap font-text text-[0.8125rem] font-semibold uppercase tracking-[0.08em] " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-expo active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "stub-button",
  outline: "h-12 border border-rule bg-ink/40 px-6 text-bone hover:border-bolt hover:text-bolt",
  text: "min-h-11 text-bone underline decoration-bolt decoration-2 underline-offset-[6px] hover:text-bolt",
};

export function Button({ variant = "solid", className, children, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (rest.href !== undefined) {
    return (
      <Link {...(rest as LinkRest)} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" {...(rest as ButtonRest)} className={classes}>
      {children}
    </button>
  );
}
