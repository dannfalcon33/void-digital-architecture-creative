import Link from 'next/link';
import { NAV_ITEMS, STUDIO_META } from '@/data/studio';
import { Grid12 } from '@/components/ui/Grid12';
import { AnimatedDivider } from '@/components/motion/AnimatedDivider';
import { StudioClock } from '@/components/layout/StudioClock';

export function Footer() {
  return (
    <footer className="void-section void-section--tight border-t border-void-border bg-void-bg">
      <Grid12 className="items-start">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 bg-void-accent" />
            <span className="font-display text-xl font-bold tracking-[0.22em] text-void-ink">
              {STUDIO_META.name}
            </span>
          </div>
          <p className="type-body max-w-xs text-void-ink-secondary">
            {STUDIO_META.tagline}
          </p>
        </div>

        <div className="col-span-6 lg:col-span-3 flex flex-col gap-2.5">
          <span className="type-mono-xs text-void-ink-muted">Navigation</span>
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="type-mono-xs text-void-ink-secondary transition-colors hover:text-void-ink"
                >
                  {item.index} / {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 lg:col-span-3 flex flex-col gap-2.5">
          <span className="type-mono-xs text-void-ink-muted">Studio</span>
          <p className="type-mono-xs text-void-ink-secondary">
            {STUDIO_META.location}
          </p>
          <p className="type-mono-xs text-void-ink-muted">
            {STUDIO_META.coordinates}
          </p>
          <StudioClock />
        </div>

        <div className="col-span-12 lg:col-span-2 flex lg:justify-end">
          <a
            href="#top"
            className="type-mono-xs inline-flex items-center gap-2 border border-void-border px-3.5 py-2 text-void-ink-secondary transition-colors hover:border-void-ink hover:text-void-ink"
          >
            Top ↑
          </a>
        </div>

        <div className="col-span-12 pt-[var(--space-stack-md)]">
          <AnimatedDivider />
        </div>

        <div className="col-span-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="type-mono-xs text-void-ink-muted">
            © {STUDIO_META.copyrightYear} {STUDIO_META.name} STUDIO — ALL RIGHTS RESERVED
          </p>
          <p className="type-mono-xs text-void-ink-muted">
            12-COL GRID · FLUID CLAMP · GSAP TWEEN ARCHITECTURE
          </p>
        </div>
      </Grid12>
    </footer>
  );
}
