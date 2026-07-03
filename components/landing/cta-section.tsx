'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  const router = useRouter();
  return (
    <section className="container-px mx-auto max-w-7xl pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center dark:bg-surface-2"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(500px circle at 50% 0%, hsl(var(--signal)/0.25), transparent 70%)' }}
        />
        <h2 className="relative font-display text-3xl font-semibold text-canvas dark:text-ink md:text-4xl">
          Your next role is closer than you think.
        </h2>
        <p className="relative mx-auto mt-3 max-w-lg leading-relaxed text-canvas/70 dark:text-muted">
          Create a profile once, and let match scores do the filtering for every search after.
        </p>
        <Button
          size="lg"
          variant="signal"
          className="relative mt-7"
          onClick={() => router.push('/jobs')}
        >
          Browse open roles <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
}
