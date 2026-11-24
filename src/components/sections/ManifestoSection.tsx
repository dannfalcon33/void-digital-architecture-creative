import { MANIFESTO_CONTENT } from '@/data/studio';
import { Section } from '@/components/ui/Section';
import { Grid12 } from '@/components/ui/Grid12';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealText } from '@/components/motion/RevealText';
import { TweenReveal } from '@/components/motion/TweenReveal';
import { DepthLayer } from '@/components/motion/DepthLayer';
import { AnimatedDivider } from '@/components/motion/AnimatedDivider';

export function ManifestoSection() {
  return (
    <Section
      id="manifesto"
      dividerTop
      gridBackdrop
      ambientGlow="bottom-left"
      ariaLabel="Studio Manifesto"
    >
      {/* Background Depth Numeral drifting slower than content */}
      <DepthLayer
        plane="back"
        speed={16}
        decorative
        className="pointer-events-none absolute right-[var(--space-gutter)] top-[10%] hidden lg:block"
      >
        <span className="font-display text-[clamp(8rem,18vw,18rem)] font-bold leading-none tracking-[-0.06em] text-void-ink/[0.03]">
          {MANIFESTO_CONTENT.index}
        </span>
      </DepthLayer>

      <Grid12>
        <SectionHeader
          index={MANIFESTO_CONTENT.index}
          kicker={MANIFESTO_CONTENT.kicker}
          titleLines={['ARCHITECTURE', 'OVER ORNAMENT']}
          aside="SWISS GRID / KINETIC DEPTH"
        />

        {/* Asymmetric Editorial Statement: Cols 4-12 */}
        <div className="col-span-12 lg:col-span-9 lg:col-start-4 pt-[var(--space-stack-sm)]">
          <RevealText
            as="p"
            lines={[MANIFESTO_CONTENT.statement]}
            className="type-display-md text-void-ink"
          />
        </div>

        {/* Supporting Editorial Copy: Cols 4-9 */}
        <TweenReveal
          preset="fadeUp"
          delay={0.1}
          className="col-span-12 lg:col-span-6 lg:col-start-4"
        >
          <p className="type-body-lg text-void-ink-secondary">
            {MANIFESTO_CONTENT.body}
          </p>
        </TweenReveal>

        <div className="col-span-12 pt-[var(--space-stack-sm)]">
          <AnimatedDivider />
        </div>

        {/* 3 Depth-Elevated Monolith Metric Cards spanning 4 cols each (4 x 3 = 12 cols) */}
        <TweenReveal
          preset="scaleSubtle"
          targetSelector="[data-metric-card]"
          stagger={0.1}
          className="col-span-12 grid grid-cols-12 gap-x-[var(--space-grid-gap)] gap-y-[var(--space-row-gap)]"
        >
          {MANIFESTO_CONTENT.metrics.map((metric, idx) => (
            <DepthLayer
              key={metric.label}
              plane={idx === 1 ? 'front' : 'mid'}
              speed={idx === 1 ? -4 : 0}
              className="col-span-12 md:col-span-4"
            >
              <article
                data-metric-card
                className="void-depth-card group flex h-full flex-col justify-between gap-[var(--space-stack-md)] p-[var(--space-card-pad)] transition-all duration-300 hover:-translate-y-1 hover:border-void-border-strong"
              >
                <div className="flex items-center justify-between">
                  <span className="type-mono-xs text-void-ink-muted">
                    0{idx + 1} / SPEC
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 bg-void-border-strong transition-colors duration-300 group-hover:bg-void-accent"
                  />
                </div>

                <div>
                  <p className="type-display-lg text-void-ink tabular-nums">
                    {metric.value}
                  </p>
                  <h3 className="type-mono-sm mt-3 text-void-accent">
                    {metric.label}
                  </h3>
                  <p className="type-body mt-2 text-void-ink-secondary">
                    {metric.detail}
                  </p>
                </div>
              </article>
            </DepthLayer>
          ))}
        </TweenReveal>
      </Grid12>
    </Section>
  );
}
