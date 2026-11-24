'use client';

import { useRef } from 'react';
import { HERO_CONTENT, STUDIO_META } from '@/data/studio';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  useGSAP,
  VOID_DURATION,
  VOID_EASE,
} from '@/lib/gsap';
import { Grid12 } from '@/components/ui/Grid12';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RevealText } from '@/components/motion/RevealText';
import { DepthLayer } from '@/components/motion/DepthLayer';
import { AnimatedDivider } from '@/components/motion/AnimatedDivider';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const root = heroRef.current;
      if (!root) return;

      const metaItems = root.querySelectorAll('[data-hero-meta]');
      const bodyItems = root.querySelectorAll('[data-hero-body]');
      const plate = root.querySelector('[data-hero-plate]');
      const plateRings = root.querySelectorAll('[data-plate-ring]');
      const scrollBar = root.querySelector('[data-scroll-bar]');

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        const tl = gsap.timeline({ defaults: { ease: VOID_EASE.reveal } });

        tl.fromTo(
          metaItems,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: VOID_DURATION.micro,
            stagger: 0.06,
          },
          0.08,
        )
          .fromTo(
            bodyItems,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: VOID_DURATION.standard,
              stagger: 0.09,
              clearProps: 'transform',
            },
            0.32,
          )
          .fromTo(
            plate,
            { autoAlpha: 0, y: 32, scale: 0.97 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: VOID_DURATION.editorial,
              clearProps: 'transform',
            },
            0.38,
          )
          .fromTo(
            plateRings,
            { scale: 0.88, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: VOID_EASE.micro,
            },
            0.52,
          );

        if (scrollBar) {
          gsap.fromTo(
            scrollBar,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              duration: 1.4,
              repeat: -1,
              ease: 'power2.inOut',
              yoyo: true,
            },
          );
        }
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set([metaItems, bodyItems, plate, plateRings], {
          autoAlpha: 1,
          clearProps: 'transform',
        });
      });
    },
    { scope: heroRef },
  );

  return (
    <section
      id="top"
      ref={heroRef}
      aria-label="VOID Studio Introduction"
      className="void-section min-h-[100svh] justify-between pt-[calc(var(--header-height)+clamp(1.75rem,3.5vw,3.5rem))] pb-[clamp(2rem,3.5vw,3.25rem)]"
    >
      {/* DEPTH PLANE 0 (BACK): 12-Col Blueprint Hairlines + Atmospheric Glow + Ghost Watermark */}
      <DepthLayer
        plane="back"
        decorative
        className="absolute inset-0 mx-auto max-w-[var(--void-max-width)] px-[var(--space-gutter)] opacity-70"
      >
        <div className="void-grid-blueprint h-full w-full border-x border-void-border/50" />
      </DepthLayer>

      <DepthLayer
        plane="back"
        speed={10}
        decorative
        className="absolute inset-[-10%] bg-[radial-gradient(46%_42%_at_76%_24%,rgba(255,77,46,0.14)_0%,rgba(255,77,46,0.03)_42%,transparent_72%)]"
      >
        <div className="h-full w-full" />
      </DepthLayer>

      <DepthLayer
        plane="back"
        speed={14}
        decorative
        className="absolute inset-x-0 top-[14%] flex justify-center overflow-hidden"
      >
        <span className="font-display text-[clamp(9rem,26vw,26rem)] font-bold leading-none tracking-[-0.06em] text-void-ink/[0.025]">
          VOID
        </span>
      </DepthLayer>

      {/* DEPTH PLANE 1 (MID): 12-Column CSS Grid Editorial Composition */}
      <div className="relative z-10 flex w-full flex-1 flex-col justify-between gap-[var(--space-stack-lg)]">
        <Grid12 className="items-end">
          {/* Top Metadata Bar across 12 Cols */}
          <div
            data-hero-meta
            className="col-span-12 lg:col-span-8 flex flex-wrap items-center gap-3"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-void-accent" />
            <span className="type-mono-xs text-void-ink-secondary">
              {HERO_CONTENT.eyebrow}
            </span>
          </div>

          <div
            data-hero-meta
            className="col-span-12 lg:col-span-4 flex items-center lg:justify-end gap-4"
          >
            <span className="type-mono-xs text-void-ink-muted">
              {STUDIO_META.coordinates}
            </span>
            <span className="type-mono-xs text-void-accent">00 / HERO</span>
          </div>

          {/* Monumental Clamp Display Headline spanning all 12 cols */}
          <div className="col-span-12 pt-[clamp(0.75rem,1.8vw,2rem)]">
            <RevealText
              as="h1"
              lines={HERO_CONTENT.headlineLines}
              immediate
              preserveLcpPaint
              className="type-display-xl text-void-ink"
            />
          </div>

          {/* Animated Hairline across 12 cols */}
          <div className="col-span-12 py-[clamp(0.5rem,1vw,1rem)]">
            <AnimatedDivider immediate delay={0.22} strong />
          </div>

          {/* Asymmetric Swiss Lower Composition: Cols 1-5 Narrative & CTAs */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-[var(--space-stack-md)]">
            <p
              data-hero-body
              className="type-body-lg max-w-[44ch] text-void-ink-secondary"
            >
              {HERO_CONTENT.description}
            </p>

            <div
              data-hero-body
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Button
                href={HERO_CONTENT.primaryCta.href}
                variant="primary"
                trailingIcon={<span>→</span>}
              >
                {HERO_CONTENT.primaryCta.label}
              </Button>
              <Button href={HERO_CONTENT.secondaryCta.href} variant="outline">
                {HERO_CONTENT.secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* DEPTH PLANE 2 (FRONT): Floating Architectural Plate across Cols 8-12 */}
          <DepthLayer
            plane="front"
            speed={-5}
            className="col-span-12 lg:col-span-5 lg:col-start-8"
          >
            <article
              data-hero-plate
              className="void-depth-card group relative overflow-hidden p-[var(--space-card-pad)] transition-colors duration-300 hover:border-void-border-strong"
            >
              {/* Subtle Corner Coordinates */}
              <div className="flex items-center justify-between gap-2 pb-5">
                <Badge variant="accent">{HERO_CONTENT.featuredReel.code}</Badge>
                <span className="type-mono-xs text-void-ink-muted">
                  {HERO_CONTENT.featuredReel.year}
                </span>
              </div>

              {/* Architectural Geometric Visual Field */}
              <div className="relative my-2 flex aspect-[16/10] w-full items-center justify-center overflow-hidden border border-void-border bg-void-bg/80">
                <div
                  aria-hidden="true"
                  className="void-grid-blueprint absolute inset-0 opacity-60"
                />
                <div
                  data-plate-ring
                  aria-hidden="true"
                  className="absolute h-[78%] aspect-square rounded-full border border-void-border-strong/50 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  data-plate-ring
                  aria-hidden="true"
                  className="absolute h-[48%] aspect-square rounded-full border border-void-accent/60 transition-transform duration-700 ease-out group-hover:scale-95"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-1/2 h-px bg-void-border"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-1/2 w-px bg-void-border"
                />
                <span
                  data-plate-ring
                  className="relative z-10 font-display text-[clamp(1.25rem,2vw,1.85rem)] font-bold tracking-[0.28em] text-void-ink"
                >
                  VOID
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="type-heading text-void-ink">
                    {HERO_CONTENT.featuredReel.title}
                  </h2>
                  <p className="type-mono-xs mt-1.5 text-void-ink-muted">
                    {HERO_CONTENT.featuredReel.subtitle}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="type-mono-sm text-void-accent transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </div>
            </article>
          </DepthLayer>
        </Grid12>

        {/* Bottom Scroll Cue inside 12-Col Grid */}
        <Grid12 className="items-center gap-y-0 pt-2">
          <div className="col-span-6 flex items-center gap-3">
            <div
              aria-hidden="true"
              className="relative h-8 w-px overflow-hidden bg-void-border"
            >
              <span
                data-scroll-bar
                className="absolute inset-x-0 top-0 h-1/2 bg-void-accent"
              />
            </div>
            <span className="type-mono-xs text-void-ink-muted">
              Scroll to descend
            </span>
          </div>
          <div className="col-span-6 flex justify-end">
            <span className="type-mono-xs text-void-ink-muted">
              12-COL SYSTEM · FLUID CLAMP
            </span>
          </div>
        </Grid12>
      </div>
    </section>
  );
}
