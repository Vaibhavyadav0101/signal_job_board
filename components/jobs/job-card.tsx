'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Bookmark, Clock } from 'lucide-react';
import { JobWithCompany } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SignalBars } from '@/components/jobs/signal-bars';
import { formatSalary, timeAgo, cn } from '@/lib/utils';
import { useSavedJobs } from '@/hooks/useSavedJobs';

export function JobCard({ job, layout = 'grid', index = 0 }: { job: JobWithCompany; layout?: 'grid' | 'list'; index?: number }) {
  const { isSaved, toggleSave } = useSavedJobs();
  const saved = isSaved(job.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className={cn(
        'group relative rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-lg',
        layout === 'list' && 'flex flex-col gap-4 sm:flex-row sm:items-center'
      )}
    >
      {job.featured && (
        <Badge variant="amber" className="absolute -top-2 left-4">
          Featured
        </Badge>
      )}

      <div className={cn('flex items-start gap-3', layout === 'list' && 'flex-1')}>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-xl">
          {job.company.logo}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/jobs/${job.id}`} className="min-w-0">
              <h3 className="truncate font-display text-base font-semibold text-ink group-hover:text-signal">{job.title}</h3>
            </Link>
            <button
              onClick={() => toggleSave(job.id)}
              aria-label={saved ? 'Unsave job' : 'Save job'}
              aria-pressed={saved}
              className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-signal"
            >
              <Bookmark className={cn('h-4 w-4', saved && 'fill-signal text-signal')} />
            </button>
          </div>
          <p className="truncate text-sm text-muted">{job.company.name}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" /> {job.jobType}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {timeAgo(job.postedAt)}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.skills.slice(0, 3).map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className={cn('mt-4 flex items-center justify-between gap-3', layout === 'list' && 'mt-0 shrink-0 flex-col items-end gap-2')}>
        <div>
          <p className="font-mono text-sm font-semibold text-ink">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</p>
          <div className="mt-1">
            <SignalBars score={job.matchScore} size="sm" />
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={() => (window.location.href = `/jobs/${job.id}`)}>
          View role
        </Button>
      </div>
    </motion.div>
  );
}
