import { MetadataRoute } from 'next';
import { jobs } from '@/lib/data/jobs';

const baseUrl = 'https://signal-jobs.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/jobs', '/dashboard', '/profile'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const jobRoutes = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: new Date(job.postedAt),
  }));

  return [...staticRoutes, ...jobRoutes];
}
