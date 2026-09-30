import { ArtPanel } from "@/components/ArtPanel";
import { ScrollRowControls } from "@/components/motion/ScrollRowControls";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { vods } from "@/data/samples";

function PlayIcon() {
  return (
    <span className="grid h-14 w-14 place-items-center rounded-full bg-bg/70 text-text backdrop-blur-sm transition-[transform,background-color,color] duration-200 ease-snap group-hover:scale-110 group-hover:bg-gold group-hover:text-bg">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <path d="M5 3.5v11l9-5.5-9-5.5z" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Vault() {
  return (
    <section aria-labelledby="vault" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeader id="vault" eyebrow="Videos" title="From the Vault" href="/watch" linkLabel="All videos" />
        <div className="-mt-2 mb-4 flex justify-end">
          <ScrollRowControls targetId="vault-row" label="videos" />
        </div>
      </Container>
      <div className="mx-auto max-w-[1280px]">
        <ul id="vault-row" className="scroll-row gap-4 px-4 pb-4 sm:px-6 lg:px-8">
          {vods.map((v) => (
            <li key={v.id} data-reveal className="w-[80vw] max-w-[380px] sm:w-[360px]">
              <a href={v.href} target="_blank" rel="noopener noreferrer" className="group block">
                <ArtPanel tone={v.tone} className="aspect-video rounded-sm border border-line">
                  <div className="absolute inset-0 grid place-items-center">
                    <PlayIcon />
                  </div>
                </ArtPanel>
                <p className="mt-3 font-semibold">
                  <span className="title-underline">{v.title}</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  {v.meta} · YouTube<span className="sr-only"> (opens in a new tab)</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
