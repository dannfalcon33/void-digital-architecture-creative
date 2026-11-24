import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps {
  children: ReactNode;
  variant?: 'neutral' | 'accent' | 'live';
  className?: string;
}

export function Badge({
  children,
  variant = 'neutral',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'type-mono-xs inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-200',
        variant === 'neutral' &&
          'border-void-border bg-void-surface/80 text-void-ink-secondary',
        variant === 'accent' &&
          'border-void-accent/40 bg-void-accent-soft text-void-accent',
        variant === 'live' &&
          'border-void-border-strong bg-void-surface/90 text-void-ink',
        className,
      )}
    >
      {variant === 'live' && (
        <span
          aria-hidden="true"
          className="relative flex h-2 w-2 shrink-0 items-center justify-center"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-void-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-void-accent" />
        </span>
      )}
      {children}
    </span>
  );
}
