'use client';
import * as React from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { jobsWithCompanies } from '@/lib/data/jobs';

const trendingSearches = ['Product Designer', 'Remote', 'Machine Learning', 'Staff Engineer', 'React'];

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [local, setLocal] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const [recent, setRecent] = useLocalStorage<string[]>('signal:recent-searches', []);
  const debounced = useDebounce(local, 250);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setLocal(value), [value]);
  React.useEffect(() => onChange(debounced), [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const suggestions = React.useMemo(() => {
    if (!local.trim()) return [];
    const q = local.toLowerCase();
    const titles = new Set<string>();
    jobsWithCompanies.forEach((j) => {
      if (j.title.toLowerCase().includes(q)) titles.add(j.title);
      if (j.company.name.toLowerCase().includes(q)) titles.add(j.company.name);
    });
    return Array.from(titles).slice(0, 6);
  }, [local]);

  function commit(term: string) {
    setLocal(term);
    onChange(term);
    if (term.trim()) setRecent((prev) => [term, ...prev.filter((r) => r !== term)].slice(0, 5));
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search by title, skill, or company"
          aria-label="Search jobs"
          className="h-11 pl-10 pr-9"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
        />
        {local && (
          <button
            onClick={() => commit('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-border bg-surface p-2 shadow-xl">
          {suggestions.length > 0 && (
            <div className="mb-1">
              <p className="px-2 py-1 text-xs font-medium text-muted">Suggestions</p>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => commit(s)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-surface-2"
                >
                  <Search className="h-3.5 w-3.5 text-muted" /> {s}
                </button>
              ))}
            </div>
          )}

          {suggestions.length === 0 && recent.length > 0 && (
            <div className="mb-1">
              <p className="px-2 py-1 text-xs font-medium text-muted">Recent searches</p>
              {recent.map((s) => (
                <button
                  key={s}
                  onClick={() => commit(s)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-surface-2"
                >
                  <Clock className="h-3.5 w-3.5 text-muted" /> {s}
                </button>
              ))}
            </div>
          )}

          {suggestions.length === 0 && (
            <div>
              <p className="px-2 py-1 text-xs font-medium text-muted">Trending</p>
              {trendingSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => commit(s)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-surface-2"
                >
                  <TrendingUp className="h-3.5 w-3.5 text-muted" /> {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
