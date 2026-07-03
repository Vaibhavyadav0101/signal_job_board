'use client';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Toaster() {
  const { toasts } = useToast();
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              'glass flex items-start gap-3 rounded-xl p-4 shadow-xl',
              t.variant === 'success' && 'border-signal/40',
              t.variant === 'destructive' && 'border-danger/40'
            )}
            role="status"
          >
            {t.variant === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
            ) : t.variant === 'destructive' ? (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            ) : (
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-pulse" />
            )}
            <div>
              <p className="text-sm font-medium text-ink">{t.title}</p>
              {t.description && <p className="text-sm text-muted">{t.description}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
