'use client';
import { useEffect, useState } from 'react';

/**
 * Why: instant search that fires a filter recompute on every keystroke feels
 * fast but reads as jittery once result counts change mid-word. Debouncing
 * gives the "instant search" feel real search engines have — settle, then react.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
