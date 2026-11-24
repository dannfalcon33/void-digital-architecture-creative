import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { AnimatedDivider } from '@/components/motion/AnimatedDivider';
import { DepthLayer } from '@/components/motion/DepthLayer';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  tight?: boolean;
  dividerTop?: boolean;
  /** Render subtle 12-column architectural hairline guides in the back depth plane */
  gridBackdrop?: boolean;
  /** Optional atmospheric depth glow positioned in the back plane */
  ambientGlow?: 'none' | 'top-right' | 'center' | 'bottom-left';
  ariaLabel?: string;
}

const GLOW_STYLES: Record<Exclude<NonNullable<SectionProps['ambientGlow']>, 'none'>, string> = {
  'top-right':
    'bg-[radial-gradient(48%_42%_at_82%_14%,rgba(255,77,46,0.12)_0%,rgba(255,77,46,0.03)_42%,transparent_72%)]',
  center:
    'bg-[radial-gradient(52%_45%_at_50%_48%,rgba(245,244,240,0.065)_0%,rgba(245,244,240,0.015)_48%,transparent_75%)]',
  'bottom-left':
    'bg-[radial-gradient(48%_44%_at_18%_84%,rgba(255,77,46,0.10)_0%,rgba(245,244,240,0.02)_46%,transparent_75%)]',
};

/**
 * Outer section frame controlled via Flexbox (.void-section).
 * Hosts background depth planes (z-0) behind the 12-column CSS Grid content (z-10+).
 */
export function Section({
  id,
  children,
  className,
  tight = false,
  dividerTop = false,
  gridBackdrop = false,
  ambientGlow = 'none',
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        'void-section',
        tight && 'void-section--tight',
        className,
      )}
    >
      {gridBackdrop && (
        <DepthLayer
          plane="back"
          decorative
          className="absolute inset-0 mx-auto max-w-[var(--void-max-width)] px-[var(--space-gutter)] opacity-60"
        >
          <div className="void-grid-blueprint h-full w-full border-x border-void-border/40" />
        </DepthLayer>
      )}

      {ambientGlow !== 'none' && (
        <DepthLayer
          plane="back"
          speed={8}
          decorative
          className={cn('absolute inset-[-12%]', GLOW_STYLES[ambientGlow])}
        >
          <div className="h-full w-full" />
        </DepthLayer>
      )}

      {dividerTop && (
        <div className="relative z-10 w-full max-w-[var(--void-max-width)] px-[var(--space-gutter)] pb-[var(--space-stack-lg)]">
          <AnimatedDivider />
        </div>
      )}

      <div className="relative z-10 flex w-full flex-col items-center">
        {children}
      </div>
    </section>
  );
}
