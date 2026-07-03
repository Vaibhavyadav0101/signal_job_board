'use client';
import { motion } from 'framer-motion';
import { jobs, companiesWithCounts } from '@/lib/data/jobs';
import { Briefcase, Building2, Users, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Briefcase, label: 'Open roles', value: `${jobs.length}+` },
  { icon: Building2, label: 'Hiring companies', value: `${companiesWithCounts.length}+` },
  { icon: Users, label: 'Candidates matched', value: '12.4K' },
  { icon: TrendingUp, label: 'Avg. match accuracy', value: '91%' },
];

export function StatsSection() {
  return (
    <section className="container-px mx-auto max-w-7xl py-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <s.icon className="h-5 w-5 text-signal" />
            <p className="mt-3 font-display text-3xl font-semibold">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
