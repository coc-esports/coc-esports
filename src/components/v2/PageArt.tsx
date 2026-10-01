import Image from "next/image";

// Official Fan Kit art for the right side of a page header, on a soft bolt glow (same light as the home hero).
// From tablet width up, capped in height: on these pages the information comes first, the art is a signature.
// Characters are only ever used as Supercell drew them (Fan Content Policy); never redrawn or generated.
export const art = {
  king: { src: "/art/king.webp", alt: "Barbarian King (Supercell Fan Kit)", w: 800, h: 722 },
  queen: { src: "/art/queen.webp", alt: "Archer Queen (Supercell Fan Kit)", w: 780, h: 800 },
  warden: { src: "/art/warden.webp", alt: "Grand Warden (Supercell Fan Kit)", w: 562, h: 800 },
  champion: { src: "/art/champion.webp", alt: "Royal Champion (Supercell Fan Kit)", w: 800, h: 646 },
  th18: { src: "/art/th18-front.webp", alt: "Town Hall 18 (Supercell Fan Kit)", w: 1400, h: 1400 },
} as const;

export function PageArt({ name, glow = "rgba(91,155,255,0.35)" }: { name: keyof typeof art; glow?: string }) {
  const a = art[name];
  return (
    <div className="relative mx-auto hidden w-full max-w-[14rem] sm:block lg:max-w-[16rem]">
      <div aria-hidden className="absolute inset-[12%] rounded-full blur-2xl" style={{ background: `radial-gradient(closest-side, ${glow}, transparent)` }} />
      <Image src={a.src} alt={a.alt} width={a.w} height={a.h} loading="eager" fetchPriority="high" sizes="16rem" className="relative mx-auto h-auto max-h-[15rem] w-auto" />
    </div>
  );
}
