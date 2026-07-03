import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { jobsWithCompanies } from '@/lib/data/jobs';
import { JobDetail } from '@/components/jobs/job-detail';
import { formatSalary } from '@/lib/utils';

export function generateStaticParams() {
  return jobsWithCompanies.map((job) => ({ id: job.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const job = jobsWithCompanies.find((j) => j.id === params.id);
  if (!job) return { title: 'Job not found' };
  return {
    title: `${job.title} at ${job.company.name}`,
    description: `${job.title} — ${job.location} · ${job.jobType} · ${formatSalary(job.salaryMin, job.salaryMax)}. ${job.description.slice(0, 120)}...`,
  };
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = jobsWithCompanies.find((j) => j.id === params.id);
  if (!job) notFound();
  return <JobDetail job={job} />;
}
