import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};
type LinkRest = { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonRest = { href?: never } & Omit<ComponentProps<"button">, "className" | "children">;
export type ButtonProps = Common & (LinkRest | ButtonRest);

// Press feedback: scale(0.97) on :active. Hover styles only apply on mouse devices (Tailwind v4 default).
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-semibold uppercase tracking-wider select-none " +
  "transition-[transform,background-color,border-color,color] duration-150 ease-snap active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-bg hover:bg-gold-bright",
  secondary: "border border-line bg-surface text-text hover:border-muted hover:bg-surface-2",
  ghost: "text-text hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-sm",
};

export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], variant !== "ghost" && sizes[size], variant === "ghost" && "h-auto text-sm", className);

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
