'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Code2, Palette, LineChart, Megaphone, Headset, Handshake, Server, Wallet } from 'lucide-react';
import { categories, jobs } from '@/lib/data/jobs';

const iconMap: Record<string, any> = {
  Engineering: Code2,
  Design: Palette,
  'Data & AI': LineChart,
  Marketing: Megaphone,
  'Customer Success': Headset,
  Sales: Handshake,
  Operations: Server,
  Finance: Wallet,
  Product: Palette,
  People: Handshake,
};

export function CategoriesSection() {
  const router = useRouter();
  return (
    <section className="bg-surface-2/40 py-16">
      <div className="container-px mx-auto max-w-7xl">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Explore by category</h2>
        <p className="mt-1 text-sm text-muted">Jump straight to the kind of work you want to do next.</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat] ?? Code2;
            const count = jobs.filter((j) => j.category === cat).length;
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => router.push(`/jobs?category=${encodeURIComponent(cat)}`)}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-5 text-left transition-all hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-lg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10 text-signal">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-medium text-ink group-hover:text-signal">{cat}</span>
                  <span className="text-xs text-muted">{count} open roles</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
