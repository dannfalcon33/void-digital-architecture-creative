import { RECOGNITION } from '@/data/studio';
import { Section } from '@/components/ui/Section';
import { Grid12 } from '@/components/ui/Grid12';
import { TweenReveal } from '@/components/motion/TweenReveal';

export function RecognitionSection() {
  return (
    <Section tight dividerTop ariaLabel="Recognition and Honors">
      <Grid12>
        <div className="col-span-12 flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="type-mono-xs text-void-accent">03.B</span>
            <span aria-hidden="true" className="h-px w-6 bg-void-border-strong" />
            <span className="type-mono-xs text-void-ink-muted">
              RECOGNITION &amp; HONORS LEDGER
            </span>
          </div>
          <span className="type-mono-xs text-void-ink-muted">
            INDEPENDENTLY AUDITED CRAFT
          </span>
        </div>

        {/* Strict 12-Column Tabular Ledger */}
        <TweenReveal
          preset="fadeUp"
          targetSelector="[data-honor-row]"
          stagger={0.07}
          className="col-span-12 flex flex-col divide-y divide-void-border border-y border-void-border"
        >
          {RECOGNITION.map((entry) => (
            <div
              key={`${entry.year}-${entry.organization}-${entry.project}`}
              data-honor-row
              className="group relative grid grid-cols-12 items-baseline gap-x-[var(--space-grid-gap)] gap-y-1.5 overflow-hidden py-[clamp(1rem,1.9vw,1.6rem)] transition-colors duration-300 hover:bg-void-surface/65"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-void-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
              />
              <span className="type-mono-xs col-span-3 sm:col-span-2 pl-2 text-void-ink-muted tabular-nums">
                {entry.year}
              </span>
              <span className="type-mono-sm col-span-9 sm:col-span-3 text-void-ink transition-transform duration-300 group-hover:translate-x-1">
                {entry.organization}
              </span>
              <span className="type-body col-span-12 sm:col-span-3 pl-2 sm:pl-0 text-void-ink-secondary">
                {entry.project}
              </span>
              <span className="type-mono-xs col-span-12 sm:col-span-4 pl-2 sm:pl-0 sm:text-right text-void-ink-muted group-hover:text-void-ink">
                {entry.honor}
              </span>
            </div>
          ))}
        </TweenReveal>
      </Grid12>
    </Section>
  );
}
