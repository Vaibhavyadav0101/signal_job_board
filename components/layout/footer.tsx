import Link from 'next/link';
import { Radio, Github, Twitter, Linkedin } from 'lucide-react';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Browse Jobs', href: '/jobs' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Profile', href: '/profile' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Careers', href: '/jobs' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'For Employers', href: '/#employers' },
      { label: 'Salary Guide', href: '/jobs' },
      { label: 'Help Center', href: '/#help' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-signal-foreground">
                <Radio className="h-4 w-4" />
              </span>
              Signal
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Job search, without the noise. Signal surfaces roles matched to your skills instead of burying them in an endless feed.
            </p>
            <div className="mt-5 flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-ink hover:bg-surface-2"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Signal Labs, Inc. All rights reserved.</p>
          <p>Built as a portfolio demonstration — all listings are mock data.</p>
        </div>
      </div>
    </footer>
  );
}
