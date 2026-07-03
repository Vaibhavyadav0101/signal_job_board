import Link from 'next/link';
import { Radio } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container-px mx-auto flex max-w-7xl flex-col items-center justify-center py-32 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2">
        <Radio className="h-6 w-6 text-muted" />
      </span>
      <h1 className="mt-6 font-display text-2xl font-semibold">Signal lost</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">We couldn&apos;t find the page you&apos;re looking for. It may have moved or the role has closed.</p>
      <Link href="/jobs" className={buttonVariants({ variant: 'signal', className: 'mt-6' })}>
        Browse jobs
      </Link>
    </div>
  );
}
