'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * WHY this exists: traditional job boards bury "fit" inside a wall of text —
 * you read the whole posting before learning whether it's worth reading.
 * SignalBars surfaces a computed match score (skills overlap + level fit +
 * location fit, in this demo) as a glanceable, radio-signal-style indicator,
 * so a user can triage a list of 50 jobs in seconds, not minutes.
 *
 * WHAT problem it solves: decision fatigue from undifferentiated result lists.
 * HOW it improves UX: recognizable "signal bars" metaphor needs no legend —
 * it borrows meaning people already have from wifi/cell reception icons.
 */
export function SignalBars({
  score,
  size = 'md',
  showLabel = true,
}: {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}) {
  const bars = 5;
  const filled = Math.round((score / 100) * bars);

  const heights = {
    sm: [4, 6, 8, 10, 12],
    md: [6, 9, 12, 15, 18],
    lg: [8, 12, 16, 20, 24],
  }[size];

  const tone = score >= 85 ? 'text-signal' : score >= 65 ? 'text-amber' : 'text-muted';
  const barColor = score >= 85 ? 'bg-signal' : score >= 65 ? 'bg-amber' : 'bg-muted';

  return (
    <div className="inline-flex items-center gap-2" role="img" aria-label={`${score} percent match`}>
      <div className="flex items-end gap-[3px]">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0.2, opacity: 0.3 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className={cn('signal-bar w-[3px] rounded-full', i < filled ? barColor : 'bg-border')}
            style={{ height: h }}
          />
        ))}
      </div>
      {showLabel && <span className={cn('font-mono text-xs font-medium', tone)}>{score}% match</span>}
    </div>
  );
}
