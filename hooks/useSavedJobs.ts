'use client';
import { useLocalStorage } from './useLocalStorage';
import { useCallback } from 'react';

export function useSavedJobs() {
  const [savedIds, setSavedIds, hydrated] = useLocalStorage<string[]>('signal:saved-jobs', []);

  const isSaved = useCallback((jobId: string) => savedIds.includes(jobId), [savedIds]);

  const toggleSave = useCallback(
    (jobId: string) => {
      setSavedIds((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
    },
    [setSavedIds]
  );

  return { savedIds, isSaved, toggleSave, hydrated };
}
