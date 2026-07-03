'use client';
import { useEffect, useState, useCallback } from 'react';

/**
 * Why: every "personalization" feature (saved jobs, applications, recently
 * viewed, profile) needs state that survives a refresh without a backend.
 * localStorage is the honest, zero-infra choice for a demo product like this.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setValue(JSON.parse(item));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // storage full or unavailable — fail silently, state still updates in-memory
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, update, hydrated] as const;
}
