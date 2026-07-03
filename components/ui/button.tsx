import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-ink text-canvas dark:bg-signal dark:text-signal-foreground hover:opacity-90 shadow-sm',
        signal: 'bg-signal text-signal-foreground hover:brightness-110 shadow-sm shadow-signal/20',
        pulse: 'bg-pulse text-pulse-foreground hover:brightness-110 shadow-sm shadow-pulse/20',
        outline: 'border border-border bg-transparent hover:bg-surface-2 text-ink',
        ghost: 'hover:bg-surface-2 text-ink',
        link: 'text-ink underline-offset-4 hover:underline p-0 h-auto',
        destructive: 'bg-danger text-white hover:brightness-110',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };
