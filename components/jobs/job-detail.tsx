'use client';
import * as React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  Share2,
  CheckCircle2,
  Users,
  Eye,
  Star,
  Globe,
  Building2,
} from 'lucide-react';
import { JobWithCompany } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SignalBars } from '@/components/jobs/signal-bars';
import { formatSalary, timeAgo, initials } from '@/lib/utils';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useApplications } from '@/hooks/useApplications';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { toast } from '@/hooks/use-toast';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { jobsWithCompanies } from '@/lib/data/jobs';
import { JobCard } from '@/components/jobs/job-card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export function JobDetail({ job }: { job: JobWithCompany }) {
  const { isSaved, toggleSave } = useSavedJobs();
  const { isApplied, apply } = useApplications();
  const { recordView } = useRecentlyViewed();
  const [applyOpen, setApplyOpen] = React.useState(false);
  const [shareCopied, setShareCopied] = React.useState(false);

  React.useEffect(() => {
    recordView(job.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job.id]);

  const saved = isSaved(job.id);
  const applied = isApplied(job.id);

  function handleApply() {
    apply(job.id);
    setApplyOpen(false);
    toast({ title: 'Application submitted', description: `You applied to ${job.title} at ${job.company.name}.`, variant: 'success' });
  }

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: job.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }
    } catch {
      // user cancelled share sheet — no-op
    }
  }

  const similar = jobsWithCompanies
    .filter((j) => j.id !== job.id && (j.category === job.category || j.companyId === job.companyId))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  return (
    <div className="container-px mx-auto max-w-7xl py-8">
      <Breadcrumbs items={[{ label: 'Jobs', href: '/jobs' }, { label: job.title }]} />

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface-2 text-3xl">
                  {job.company.logo}
                </div>
                <div>
                  <h1 className="font-display text-2xl font-semibold md:text-3xl">{job.title}</h1>
                  <Link href="#company" className="mt-1 inline-block text-sm text-muted hover:text-signal">
                    {job.company.name}
                  </Link>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {job.location} · {job.workMode}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" /> {job.jobType} · {job.experienceLevel}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> Posted {timeAgo(job.postedAt)}
                    </span>
                  </div>
                </div>
              </div>
              <SignalBars score={job.matchScore} size="lg" />
            </div>

            <Separator />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xl font-semibold text-ink">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</p>
                <p className="text-xs text-muted">per year, estimated</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => toggleSave(job.id)} aria-pressed={saved} aria-label={saved ? 'Unsave job' : 'Save job'}>
                  <Bookmark className={saved ? 'h-4 w-4 fill-signal text-signal' : 'h-4 w-4'} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare} aria-label="Share job">
                  <Share2 className="h-4 w-4" />
                </Button>
                {applied ? (
                  <Button variant="outline" disabled>
                    <CheckCircle2 className="h-4 w-4 text-signal" /> Applied
                  </Button>
                ) : (
                  <Button variant="signal" onClick={() => setApplyOpen(true)}>
                    Apply now
                  </Button>
                )}
              </div>
            </div>
            {shareCopied && <p className="text-xs text-signal">Link copied to clipboard</p>}

            <div className="flex flex-wrap gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> {job.applicantCount} applicants
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" /> {job.viewCount.toLocaleString()} views
              </span>
            </div>
          </div>

          <section className="mt-6 space-y-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
            <div>
              <h2 className="font-display text-lg font-semibold">About this role</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{job.description}</p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold">Responsibilities</h2>
              <ul className="mt-3 space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold">Requirements</h2>
              <ul className="mt-3 space-y-2">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pulse" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold">Benefits</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {job.benefits.map((b, i) => (
                  <div key={i} className="flex gap-2.5 rounded-xl border border-border p-3 text-sm text-muted">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <Badge key={s} variant="pulse">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {similar.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold">Similar roles</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((s, i) => (
                  <JobCard key={s.id} job={s} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <Card id="company">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-2xl">{job.company.logo}</div>
                <div>
                  <p className="font-display font-semibold">{job.company.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <Star className="h-3 w-3 fill-amber text-amber" /> {job.company.rating} rating
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{job.company.description}</p>
              <Separator className="my-4" />
              <dl className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1.5 text-muted"><Building2 className="h-3.5 w-3.5" /> Industry</dt>
                  <dd className="font-medium">{job.company.industry}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1.5 text-muted"><Users className="h-3.5 w-3.5" /> Company size</dt>
                  <dd className="font-medium">{job.company.size}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1.5 text-muted"><MapPin className="h-3.5 w-3.5" /> HQ</dt>
                  <dd className="font-medium">{job.company.hq}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1.5 text-muted"><Globe className="h-3.5 w-3.5" /> Website</dt>
                  <dd className="font-medium text-signal">{job.company.website}</dd>
                </div>
              </dl>
              <Separator className="my-4" />
              <p className="text-sm text-muted">{job.company.openRoles} open roles at {job.company.name}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-ink">Application insights</p>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <div className="flex justify-between"><span>Applicants</span><span className="font-mono text-ink">{job.applicantCount}</span></div>
                <div className="flex justify-between"><span>Views</span><span className="font-mono text-ink">{job.viewCount.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Your match</span><span className="font-mono text-signal">{job.matchScore}%</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply to {job.title}</DialogTitle>
            <DialogDescription>
              This is a demo application flow — no real application is sent. Applying adds this role to your dashboard tracker.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 rounded-xl border border-border p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-sm font-medium">
              {initials('Jordan Casey')}
            </div>
            <div className="text-sm">
              <p className="font-medium">Jordan Casey</p>
              <p className="text-muted">resume_jordan_casey.pdf</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setApplyOpen(false)}>Cancel</Button>
            <Button variant="signal" onClick={handleApply}>Submit application</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
