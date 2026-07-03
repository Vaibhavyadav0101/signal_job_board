'use client';
import * as React from 'react';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'destructive';
}

type Listener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
const listeners: Listener[] = [];

function emit() {
  listeners.forEach((l) => l(toasts));
}

export function toast(item: Omit<ToastItem, 'id'>) {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { ...item, id }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 3800);
}

export function useToast() {
  const [state, setState] = React.useState<ToastItem[]>(toasts);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);
  return { toasts: state };
}
