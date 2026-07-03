'use client';
import * as React from 'react';
import { Bookmark, Send, History, LayoutDashboard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/layout/empty-state';
import { JobCard } from '@/components/jobs/job-card';
import { AnalyticsWidgets } from '@/components/dashboard/analytics-widgets';
import { StatusTimeline } from '@/components/dashboard/status-timeline';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useApplications } from '@/hooks/useApplications';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { jobsWithCompanies } from '@/lib/data/jobs';
import { formatSalary, timeAgo } from '@/lib/utils';
import Link from 'next/link';

export function DashboardView() {
  const { savedIds, hydrated: savedHydrated } = useSavedJobs();
  const { applications, hydrated: appsHydrated } = useApplications();
  const { recentIds, hydrated: recentHydrated } = useRecentlyViewed();

  const savedJobs = jobsWithCompanies.filter((j) => savedIds.includes(j.id));
  const recentJobs = recentIds.map((id) => jobsWithCompanies.find((j) => j.id === id)).filter(Boolean) as typeof jobsWithCompanies;
  const hydrated = savedHydrated && appsHydrated && recentHydrated;

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">Your dashboard</h1>
        <p className="mt-1 text-sm text-muted">Track saved roles, applications in flight, and what you&apos;ve recently looked at.</p>
      </div>

      <div className="mb-8">
        <AnalyticsWidgets saved={savedJobs.length} applied={applications.length} viewed={recentJobs.length} />
      </div>

      <Tabs defaultValue="applied">
        <TabsList>
          <TabsTrigger value="applied"><Send className="mr-1.5 h-3.5 w-3.5" /> Applied</TabsTrigger>
          <TabsTrigger value="saved"><Bookmark className="mr-1.5 h-3.5 w-3.5" /> Saved</TabsTrigger>
          <TabsTrigger value="recent"><History className="mr-1.5 h-3.5 w-3.5" /> Recently viewed</TabsTrigger>
        </TabsList>

        <TabsContent value="applied">
          {!hydrated ? null : applications.length === 0 ? (
            <EmptyState
              icon={LayoutDashboard}
              title="No applications yet"
              description="When you apply to a role, it&apos;ll show up here with a live status timeline you can track."
              actionLabel="Browse jobs"
              onAction={() => (window.location.href = '/jobs')}
            />
          ) : (
            <div className="space-y-4">
              {applications.map((app) => {
                const job = jobsWithCompanies.find((j) => j.id === app.jobId);
                if (!job) return null;
                return (
                  <Card key={app.jobId}>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-xl">{job.company.logo}</div>
                          <div>
                            <Link href={`/jobs/${job.id}`} className="font-display font-semibold hover:text-signal">{job.title}</Link>
                            <p className="text-sm text-muted">{job.company.name} · {job.location}</p>
                            <p className="mt-1 font-mono text-xs text-muted">{formatSalary(job.salaryMin, job.salaryMax)}</p>
                          </div>
                        </div>
                        <Badge variant={app.status === 'Offer' ? 'signal' : app.status === 'Rejected' ? 'outline' : 'pulse'}>
                          {app.status}
                        </Badge>
                      </div>
                      <div className="mt-6">
                        <StatusTimeline current={app.status} history={app.history} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved">
          {!hydrated ? null : savedJobs.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="No saved jobs yet"
              description="Bookmark roles while you browse and they'll be waiting for you here."
              actionLabel="Browse jobs"
              onAction={() => (window.location.href = '/jobs')}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedJobs.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent">
          {!hydrated ? null : recentJobs.length === 0 ? (
            <EmptyState
              icon={History}
              title="Nothing viewed yet"
              description="Roles you open from search will show up here so you can pick up where you left off."
              actionLabel="Browse jobs"
              onAction={() => (window.location.href = '/jobs')}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentJobs.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
