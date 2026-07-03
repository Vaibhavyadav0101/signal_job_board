'use client';
import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { jobsWithCompanies } from '@/lib/data/jobs';
import { JobCard } from '@/components/jobs/job-card';
import { Button } from '@/components/ui/button';

export function FeaturedCarousel() {
  const featured = jobsWithCompanies.filter((j) => j.featured).slice(0, 9);
  const trackRef = React.useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  }

  return (
    <section className="container-px mx-auto max-w-7xl py-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">Featured roles</h2>
          <p className="mt-1 text-sm text-muted">Hand-picked openings with the strongest early signal.</p>
        </div>
        <div className="hidden gap-2 md:flex">
          <Button variant="outline" size="icon" onClick={() => scroll(-1)} aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll(1)} aria-label="Scroll right">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div ref={trackRef} className="mt-8 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {featured.map((job, i) => (
          <div key={job.id} className="w-[320px] shrink-0">
            <JobCard job={job} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
