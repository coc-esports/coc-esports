import { Container } from "@/components/ui/Container";

// Shown instantly while a live player profile loads from the game API (PLAN.md §6 #18).
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading player profile">
      <section className="border-b border-line">
        <Container className="pb-12 pt-[calc(var(--nav-h)+3.5rem)] sm:pb-16">
          <div className="skeleton h-3 w-40" />
          <div className="skeleton mt-5 h-16 w-3/4 max-w-xl sm:h-24" />
          <div className="mt-8 flex gap-3">
            <div className="skeleton h-6 w-28" />
            <div className="skeleton h-6 w-20" />
            <div className="skeleton h-6 w-32" />
          </div>
        </Container>
      </section>
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="skeleton h-24" />
          ))}
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="skeleton h-24" />
          ))}
        </div>
      </Container>
    </div>
  );
}
