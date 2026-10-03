import Image from "next/image";
import { Button } from "@/components/v2/Button";
import { DisplayHeading, Label } from "@/components/v2/Type";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto grid w-full max-w-page flex-1 items-center gap-10 px-4 pb-20 pt-[calc(var(--nav-h)+3rem)] sm:px-8 md:grid-cols-[minmax(0,1fr)_auto]">
      <div className="grid gap-5">
        <Label tone="bolt">Error 404</Label>
        <DisplayHeading as="h1" size="hero" lines={[["Off the"], [{ em: "war map." }]]} />
        <p className="max-w-[44ch] text-lead text-steel">This page doesn&apos;t exist, or it moved. Even the Goblins couldn&apos;t find it.</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/schedule" variant="outline">
            Schedule
          </Button>
        </div>
      </div>
      {/* The Fan Kit Goblin is used as drawn; "404" is page text laid over the blank sign, not a change to the art. */}
      <div className="relative mx-auto w-48 md:w-64">
        <Image src="/art/goblin-sign.webp" alt="A Goblin holding up a sign that reads 404 (Supercell Fan Kit)" width={800} height={1146} className="h-auto w-full" />
        <span aria-hidden className="absolute left-[21%] top-[3%] grid h-[25%] w-[57%] -rotate-2 place-items-center font-cond text-[clamp(2.5rem,6vw,4rem)] leading-none text-[#12102e]">
          404
        </span>
      </div>
    </section>
  );
}
