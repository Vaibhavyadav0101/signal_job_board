'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const trending = ['Product Designer', 'Machine Learning Engineer', 'Remote', 'Staff Engineer'];

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [location, setLocation] = React.useState('');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('loc', location);
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(600px circle at 15% 20%, hsl(var(--signal)/0.14), transparent 60%), radial-gradient(500px circle at 85% 15%, hsl(var(--pulse)/0.14), transparent 60%)',
        }}
      />
      <div className="container-px mx-auto max-w-7xl pb-20 pt-16 md:pb-28 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="pulse" className="mx-auto">
            <Sparkles className="mr-1 h-3 w-3" /> AI-matched roles, explained not guessed
          </Badge>
          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            Job search, <span className="text-signal">without the noise.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            Signal ranks every listing by an explainable match score instead of a wall of undifferentiated postings — so you spend your time applying, not scanning.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          onSubmit={handleSearch}
          className="glass mx-auto mt-10 flex max-w-2xl flex-col gap-2 rounded-2xl p-2 shadow-xl md:flex-row"
          role="search"
        >
          <div className="flex flex-1 items-center gap-2 rounded-xl px-3">
            <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, skill, or company"
              aria-label="Search jobs"
              className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="hidden h-6 w-px self-center bg-border md:block" aria-hidden />
          <div className="flex flex-1 items-center gap-2 rounded-xl px-3">
            <MapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location or Remote"
              aria-label="Location"
              className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button type="submit" variant="signal" size="lg" className="shrink-0">
            Search jobs <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-sm text-muted"
        >
          <span>Trending:</span>
          {trending.map((t) => (
            <button
              key={t}
              onClick={() => router.push(`/jobs?q=${encodeURIComponent(t)}`)}
              className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-signal hover:text-signal"
            >
              {t}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
