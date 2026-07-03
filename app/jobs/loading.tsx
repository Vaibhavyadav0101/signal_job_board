import { JobCardSkeleton } from '@/components/jobs/job-card-skeleton';

export default function Loading() {
  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <div className="mb-6 h-8 w-48 skeleton rounded-lg" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <div className="hidden h-96 skeleton rounded-2xl md:block" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
