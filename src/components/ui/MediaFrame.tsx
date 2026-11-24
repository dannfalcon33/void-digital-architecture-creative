import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type AspectVariant = 'wide' | 'landscape' | 'portrait' | 'square';

const ASPECT_CLASSES: Record<AspectVariant, string> = {
  wide: 'aspect-[16/9]',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
};

interface MediaFrameProps {
  children: ReactNode;
  aspect?: AspectVariant;
  className?: string;
  caption?: string;
}

/**
 * Aspect-ratio locked architectural frame to eliminate CLS and host layered visual plates.
 */
export function MediaFrame({
  children,
  aspect = 'landscape',
  className,
  caption,
}: MediaFrameProps) {
  return (
    <figure className={cn('group relative w-full', className)}>
      <div
        className={cn(
          'relative w-full overflow-hidden border border-void-border bg-void-surface',
          ASPECT_CLASSES[aspect],
        )}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="type-mono-xs mt-3 flex items-center justify-between text-void-ink-muted">
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
