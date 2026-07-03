'use client';
import { useLocalStorage } from './useLocalStorage';
import { useCallback } from 'react';
import { ApplicationStatus, TrackedApplication } from '@/types';

export function useApplications() {
  const [applications, setApplications, hydrated] = useLocalStorage<TrackedApplication[]>(
    'signal:applications',
    []
  );

  const apply = useCallback(
    (jobId: string) => {
      setApplications((prev) => {
        if (prev.some((a) => a.jobId === jobId)) return prev;
        const now = new Date().toISOString();
        return [
          ...prev,
          { jobId, status: 'Applied', updatedAt: now, history: [{ status: 'Applied', date: now }] },
        ];
      });
    },
    [setApplications]
  );

  const advance = useCallback(
    (jobId: string, status: ApplicationStatus) => {
      setApplications((prev) =>
        prev.map((a) =>
          a.jobId === jobId
            ? { ...a, status, updatedAt: new Date().toISOString(), history: [...a.history, { status, date: new Date().toISOString() }] }
            : a
        )
      );
    },
    [setApplications]
  );

  const isApplied = useCallback((jobId: string) => applications.some((a) => a.jobId === jobId), [applications]);
  const getApplication = useCallback((jobId: string) => applications.find((a) => a.jobId === jobId), [applications]);

  return { applications, apply, advance, isApplied, getApplication, hydrated };
}
