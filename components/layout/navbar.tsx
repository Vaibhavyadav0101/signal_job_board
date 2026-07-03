'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Menu, X, Radio, Bookmark, LayoutDashboard, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { cn } from '@/lib/utils';
import { useSavedJobs } from '@/hooks/useSavedJobs';

const navLinks = [
  { href: '/jobs', label: 'Browse Jobs' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { savedIds } = useSavedJobs();

  return (
    <header className="sticky top-0 z-40 glass">
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold" aria-label="Signal home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-signal-foreground">
            <Radio className="h-4 w-4" />
          </span>
          Signal
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative rounded-lg px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink',
                pathname === link.href && 'text-ink'
              )}
            >
              {link.label}
              {link.href === '/dashboard' && savedIds.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-signal text-[10px] font-semibold text-signal-foreground">
                  {savedIds.length}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={() => (window.location.href = '/jobs')}>
            Sign in
          </Button>
          <Button size="sm" variant="signal" onClick={() => (window.location.href = '/jobs')}>
            Post a job
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="container-px mx-auto flex flex-col gap-1 py-3">
            {navLinks.map((link) => {
              const Icon = link.href === '/dashboard' ? LayoutDashboard : link.href === '/profile' ? User : Bookmark;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface-2"
                >
                  <Icon className="h-4 w-4 text-muted" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
