'use client';
import { companiesWithCounts } from '@/lib/data/jobs';

export function CompanyLogos() {
  const featured = companiesWithCounts.slice(0, 12);
  const loop = [...featured, ...featured];

  return (
    <section className="border-y border-border bg-surface py-10">
      <p className="container-px mx-auto max-w-7xl text-center text-xs font-medium uppercase tracking-wider text-muted">
        Trusted by teams shipping real products
      </p>
      <div className="relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
        <div className="flex w-max animate-marquee gap-12 px-6">
          {loop.map((c, i) => (
            <div key={`${c.id}-${i}`} className="flex items-center gap-2 whitespace-nowrap text-muted opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <span className="text-2xl" aria-hidden>{c.logo}</span>
              <span className="font-display text-sm font-semibold">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
