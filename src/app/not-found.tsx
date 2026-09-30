import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Most sections are planned but not built yet, so the 404 doubles as "coming soon".
export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 pb-20 pt-[calc(var(--nav-h)+5rem)] text-center">
      <Badge tone="elixir">Coming soon</Badge>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-none">Still building this one</h1>
      <p className="mt-4 max-w-md text-muted">
        This part of the site is under construction, or the page doesn&apos;t exist.
      </p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
    </section>
  );
}
