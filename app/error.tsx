'use client';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production this would report to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <div className="container-px mx-auto flex max-w-7xl flex-col items-center justify-center py-32 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10">
        <AlertTriangle className="h-6 w-6 text-danger" />
      </span>
      <h1 className="mt-6 font-display text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">An unexpected error interrupted this page. You can try again, or head back to the job listings.</p>
      <div className="mt-6 flex gap-3">
        <Button variant="outline" onClick={() => (window.location.href = '/jobs')}>Browse jobs</Button>
        <Button variant="signal" onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
