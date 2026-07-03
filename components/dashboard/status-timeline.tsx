'use client';
import { Check } from 'lucide-react';
import { ApplicationStatus } from '@/types';
import { cn } from '@/lib/utils';

const stages: ApplicationStatus[] = ['Applied', 'In Review', 'Interviewing', 'Offer'];

export function StatusTimeline({ current, history }: { current: ApplicationStatus; history: { status: ApplicationStatus; date: string }[] }) {
  if (current === 'Rejected') {
    return (
      <div className="flex items-center gap-2 text-sm text-danger">
        <span className="h-2 w-2 rounded-full bg-danger" /> Application closed
      </div>
    );
  }

  const currentIndex = stages.indexOf(current);

  return (
    <div className="flex items-center" role="list" aria-label="Application progress">
      {stages.map((stage, i) => {
        const done = i <= currentIndex;
        const entry = history.find((h) => h.status === stage);
        return (
          <div key={stage} className="flex flex-1 items-center last:flex-none" role="listitem">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-semibold transition-colors',
                  done ? 'border-signal bg-signal text-signal-foreground' : 'border-border text-muted'
                )}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={cn('text-[11px] font-medium', done ? 'text-ink' : 'text-muted')}>{stage}</span>
              {entry && <span className="text-[10px] text-muted">{new Date(entry.date).toLocaleDateString()}</span>}
            </div>
            {i < stages.length - 1 && <div className={cn('mx-1.5 h-0.5 flex-1 rounded', i < currentIndex ? 'bg-signal' : 'bg-border')} />}
          </div>
        );
      })}
    </div>
  );
}
