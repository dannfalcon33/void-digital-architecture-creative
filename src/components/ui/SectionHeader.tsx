import { cn } from '@/lib/cn';
import { RevealText } from '@/components/motion/RevealText';
import { TweenReveal } from '@/components/motion/TweenReveal';

interface SectionHeaderProps {
  index: string;
  kicker: string;
  titleLines: readonly string[];
  aside?: string;
  className?: string;
}

/**
 * Composes section header directly inside a parent Grid12 container.
 */
export function SectionHeader({
  index,
  kicker,
  titleLines,
  aside,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'col-span-12 grid grid-cols-12 gap-x-[var(--space-grid-gap)] gap-y-[var(--space-stack-sm)] items-end',
        className,
      )}
    >
      <TweenReveal
        preset="fadeUp"
        className="col-span-12 lg:col-span-3 flex items-center gap-3 self-start pt-1"
      >
        <span className="type-mono-xs text-void-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-void-border-strong" />
        <span className="type-mono-xs text-void-ink-muted">{kicker}</span>
      </TweenReveal>

      <div className="col-span-12 lg:col-span-6">
        <RevealText
          as="h2"
          lines={titleLines}
          className="type-display-md text-void-ink"
        />
      </div>

      {aside && (
        <TweenReveal
          preset="fadeUp"
          delay={0.12}
          className="col-span-12 lg:col-span-3 lg:text-right"
        >
          <p className="type-mono-xs text-void-ink-muted">{aside}</p>
        </TweenReveal>
      )}
    </div>
  );
}
