'use client';
import { useLocalStorage } from './useLocalStorage';
import { useCallback } from 'react';

const MAX = 8;

export function useRecentlyViewed() {
  const [recentIds, setRecentIds, hydrated] = useLocalStorage<string[]>('signal:recently-viewed', []);

  const recordView = useCallback(
    (jobId: string) => {
      setRecentIds((prev) => [jobId, ...prev.filter((id) => id !== jobId)].slice(0, MAX));
    },
    [setRecentIds]
  );

  return { recentIds, recordView, hydrated };
}
