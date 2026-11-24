import { CAPABILITIES } from '@/data/studio';
import { Section } from '@/components/ui/Section';
import { Grid12 } from '@/components/ui/Grid12';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DepthLayer } from '@/components/motion/DepthLayer';
import { TweenReveal } from '@/components/motion/TweenReveal';
import { CapabilityAccordion } from '@/components/studio/CapabilityAccordion';

export function CapabilitiesSection() {
  return (
    <Section
      id="capabilities"
      dividerTop
      ambientGlow="center"
      ariaLabel="Studio Capabilities"
      className="scroll-mt-[var(--header-height)]"
    >
      {/* Back Depth Numeral */}
      <DepthLayer
        plane="back"
        speed={14}
        decorative
        className="pointer-events-none absolute right-[var(--space-gutter)] top-[10%] hidden lg:block"
      >
        <span className="font-display text-[clamp(8rem,18vw,18rem)] font-bold leading-none tracking-[-0.06em] text-void-ink/[0.03]">
          03
        </span>
      </DepthLayer>

      <Grid12 className="items-start">
        <SectionHeader
          index="03"
          kicker="CAPABILITIES"
          titleLines={['DISCIPLINES IN', 'HARMONY']}
          aside="STRATEGY · DESIGN · CODE"
        />

        {/* Cols 1-4: Sticky Methodology Depth Card */}
        <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-[calc(var(--header-height)+2rem)] pt-[var(--space-stack-sm)]">
          <TweenReveal preset="scaleSubtle">
            <aside className="void-depth-card flex flex-col gap-[var(--space-stack-md)] p-[var(--space-card-pad)]">
              <div className="flex items-center justify-between">
                <span className="type-mono-xs text-void-accent">
                  METHODOLOGY
                </span>
                <span className="type-mono-xs text-void-ink-muted">
                  END-TO-END
                </span>
              </div>

              <p className="type-body-lg text-void-ink">
                We operate as a senior, compact unit—zero handoff loss between
                creative direction, grid architecture, and production engineering.
              </p>

              <dl className="grid grid-cols-2 gap-4 border-t border-void-border pt-4">
                <div>
                  <dt className="type-mono-xs text-void-ink-muted">SPRINT CADENCE</dt>
                  <dd className="type-mono-sm mt-1 text-void-ink">WEEKLY BUILDS</dd>
                </div>
                <div>
                  <dt className="type-mono-xs text-void-ink-muted">ENGAGEMENT</dt>
                  <dd className="type-mono-sm mt-1 text-void-ink">6 — 12 WEEKS</dd>
                </div>
              </dl>
            </aside>
          </TweenReveal>
        </div>

        {/* Cols 6-12: Interactive GSAP Accordion */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 pt-[var(--space-stack-sm)]">
          <TweenReveal preset="fadeUp" delay={0.08}>
            <CapabilityAccordion items={CAPABILITIES} />
          </TweenReveal>
        </div>
      </Grid12>
    </Section>
  );
}
