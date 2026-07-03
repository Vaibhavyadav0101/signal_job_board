'use client';
import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, LayoutGrid, List, SearchX } from 'lucide-react';
import { FilterState, SortOption } from '@/types';
import { jobsWithCompanies } from '@/lib/data/jobs';
import { FilterSidebar } from '@/components/jobs/filter-sidebar';
import { SearchBar } from '@/components/jobs/search-bar';
import { JobCard } from '@/components/jobs/job-card';
import { JobCardSkeleton } from '@/components/jobs/job-card-skeleton';
import { Pagination } from '@/components/jobs/pagination';
import { EmptyState } from '@/components/layout/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 9;

const defaultFilters: FilterState = {
  query: '',
  location: '',
  jobTypes: [],
  workModes: [],
  experienceLevels: [],
  skills: [],
  salaryRange: [40000, 300000],
  category: null,
};

export function JobsExplorer() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = React.useState<FilterState>({
    ...defaultFilters,
    query: searchParams.get('q') ?? '',
    location: searchParams.get('loc') ?? '',
    category: searchParams.get('category'),
  });
  const [sort, setSort] = React.useState<SortOption>('relevance');
  const [view, setView] = React.useState<'grid' | 'list'>('grid');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  function updateFilters(next: Partial<FilterState>) {
    setFilters((prev) => ({ ...prev, ...next }));
  }

  const filtered = React.useMemo(() => {
    let result = jobsWithCompanies.filter((job) => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const haystack = `${job.title} ${job.company.name} ${job.skills.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.location) {
        const loc = filters.location.toLowerCase();
        if (!job.location.toLowerCase().includes(loc)) return false;
      }
      if (filters.category && job.category !== filters.category) return false;
      if (filters.jobTypes.length && !filters.jobTypes.includes(job.jobType)) return false;
      if (filters.workModes.length && !filters.workModes.includes(job.workMode)) return false;
      if (filters.experienceLevels.length && !filters.experienceLevels.includes(job.experienceLevel)) return false;
      if (filters.skills.length && !filters.skills.every((s) => job.skills.includes(s))) return false;
      if (job.salaryMax < filters.salaryRange[0] || job.salaryMin > filters.salaryRange[1]) return false;
      return true;
    });

    switch (sort) {
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
      case 'salary-high':
        result = [...result].sort((a, b) => b.salaryMax - a.salaryMax);
        break;
      case 'salary-low':
        result = [...result].sort((a, b) => a.salaryMin - b.salaryMin);
        break;
      default:
        result = [...result].sort((a, b) => b.matchScore - a.matchScore);
    }
    return result;
  }, [filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeCount =
    filters.jobTypes.length +
    filters.workModes.length +
    filters.experienceLevels.length +
    filters.skills.length +
    (filters.location ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.salaryRange[0] !== defaultFilters.salaryRange[0] || filters.salaryRange[1] !== defaultFilters.salaryRange[1] ? 1 : 0);

  function resetFilters() {
    setFilters({ ...defaultFilters, query: filters.query });
  }

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold">Browse jobs</h1>
        <p className="mt-1 text-sm text-muted">
          {loading ? 'Searching…' : `${filtered.length} role${filtered.length === 1 ? '' : 's'} matched to your filters`}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <SearchBar value={filters.query} onChange={(q) => updateFilters({ query: q })} />
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4" /> Filters
                {activeCount > 0 && <Badge variant="signal" className="ml-1">{activeCount}</Badge>}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Filters</DialogTitle>
              </DialogHeader>
              <FilterSidebar filters={filters} onChange={updateFilters} onReset={resetFilters} activeCount={activeCount} />
            </DialogContent>
          </Dialog>

          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Best match</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="salary-high">Salary: high to low</SelectItem>
              <SelectItem value="salary-low">Salary: low to high</SelectItem>
            </SelectContent>
          </Select>

          <div className="hidden items-center gap-1 rounded-xl border border-border p-1 md:flex">
            <button
              onClick={() => setView('grid')}
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
              className={cn('flex h-8 w-8 items-center justify-center rounded-lg', view === 'grid' ? 'bg-surface-2 text-ink' : 'text-muted')}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('list')}
              aria-label="List view"
              aria-pressed={view === 'list'}
              className={cn('flex h-8 w-8 items-center justify-center rounded-lg', view === 'list' ? 'bg-surface-2 text-ink' : 'text-muted')}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <div className="hidden md:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-surface p-5">
            <FilterSidebar filters={filters} onChange={updateFilters} onReset={resetFilters} activeCount={activeCount} />
          </div>
        </div>

        <div>
          {loading ? (
            <div className={cn('grid gap-4', view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No roles match those filters"
              description="Try widening your salary range or clearing a few filters — there may be more roles than you'd expect."
              actionLabel="Clear all filters"
              onAction={resetFilters}
            />
          ) : (
            <>
              <div className={cn('grid gap-4', view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
                {paginated.map((job, i) => (
                  <JobCard key={job.id} job={job} layout={view} index={i} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
