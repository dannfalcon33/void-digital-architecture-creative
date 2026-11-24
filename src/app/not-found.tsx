import { Section } from '@/components/ui/Section';
import { Grid12 } from '@/components/ui/Grid12';
import { Button } from '@/components/ui/Button';
import { DepthLayer } from '@/components/motion/DepthLayer';
import { AnimatedDivider } from '@/components/motion/AnimatedDivider';

export default function NotFound() {
  return (
    <Section
      gridBackdrop
      ambientGlow="center"
      className="min-h-[82svh] pt-[calc(var(--header-height)+clamp(2rem,4vw,4rem))]"
    >
      <DepthLayer
        plane="back"
        decorative
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="font-display text-[clamp(10rem,30vw,28rem)] font-bold leading-none tracking-[-0.06em] text-void-ink/[0.03]">
          404
        </span>
      </DepthLayer>

      <Grid12>
        <div className="col-span-12 lg:col-span-8 lg:col-start-3 flex flex-col gap-[var(--space-stack-md)]">
          <span className="type-mono-xs text-void-accent">
            ERR / 404 — COORDINATES UNMAPPED
          </span>
          <h1 className="type-display-xl text-void-ink">SIGNAL LOST IN VOID</h1>
          <AnimatedDivider immediate strong />
          <p className="type-body-lg max-w-[46ch] text-void-ink-secondary">
            The monograph or route you requested does not exist on this grid.
            Return to the primary studio canvas.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/" variant="primary" trailingIcon={<span>→</span>}>
              Return to Studio
            </Button>
            <Button href="/#work" variant="outline">
              Browse Archive
            </Button>
          </div>
        </div>
      </Grid12>
    </Section>
  );
}
