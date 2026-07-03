import { Suspense } from 'react';
import type { Metadata } from 'next';
import { JobsExplorer } from '@/components/jobs/jobs-explorer';

export const metadata: Metadata = {
  title: 'Browse Jobs',
  description: 'Search and filter open roles by salary, location, work mode, experience level, and skills — ranked by match score.',
};

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="container-px mx-auto max-w-7xl py-10 text-sm text-muted">Loading jobs…</div>}>
      <JobsExplorer />
    </Suspense>
  );
}
