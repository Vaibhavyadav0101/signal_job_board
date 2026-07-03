'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "The match score sold me before I even opened a listing. I stopped wasting time on postings I was never a fit for.",
    name: 'Priya N.',
    role: 'Senior Frontend Engineer, hired at Northwind Labs',
  },
  {
    quote: 'Applied on Monday, had a first-round call by Thursday. The application tracker made following up genuinely easy.',
    name: 'Marcus T.',
    role: 'Product Designer, hired at Glasswing Studio',
  },
  {
    quote: "As a hiring manager I finally get candidates who've read the listing. The signal quality goes both ways.",
    name: 'Elena R.',
    role: 'Engineering Manager, Harbor Analytics',
  },
];

export function Testimonials() {
  return (
    <section className="container-px mx-auto max-w-7xl py-16">
      <h2 className="text-center font-display text-2xl font-semibold md:text-3xl">Loved by candidates and hiring teams</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="flex gap-0.5 text-amber" aria-hidden>
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="block font-medium text-ink">{t.name}</span>
              <span className="text-muted">{t.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
