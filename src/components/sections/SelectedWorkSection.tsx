'use client';

import { useMemo, useRef, useState } from 'react';
import { SELECTED_PROJECTS } from '@/data/studio';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  ScrollTrigger,
  useGSAP,
  VOID_DURATION,
  VOID_EASE,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Grid12 } from '@/components/ui/Grid12';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DepthLayer } from '@/components/motion/DepthLayer';
import { TweenReveal } from '@/components/motion/TweenReveal';
import { ProjectCard } from '@/components/studio/ProjectCard';

const ALL_DISCIPLINE = 'All';

const ASYMMETRIC_SPANS = [
  'col-span-12 lg:col-span-8',
  'col-span-12 lg:col-span-5 lg:col-start-1',
  'col-span-12 lg:col-span-6 lg:col-start-7 lg:mt-[clamp(2.5rem,6vw,6rem)]',
  'col-span-12 lg:col-span-9 lg:col-start-4',
] as const;

export function SelectedWorkSection() {
  const [activeDiscipline, setActiveDiscipline] = useState<string>(ALL_DISCIPLINE);
  const gridRef = useRef<HTMLDivElement>(null);

  const disciplines = useMemo(
    () => [
      ALL_DISCIPLINE,
      ...Array.from(new Set(SELECTED_PROJECTS.map((p) => p.discipline))),
    ],
    [],
  );

  const filteredProjects = useMemo(() => {
    if (activeDiscipline === ALL_DISCIPLINE) return SELECTED_PROJECTS;
    return SELECTED_PROJECTS.filter((p) => p.discipline === activeDiscipline);
  }, [activeDiscipline]);

  const isFiltered = activeDiscipline !== ALL_DISCIPLINE;

  useGSAP(
    () => {
      ensureGsapRegistered();
      const container = gridRef.current;
      if (!container) return;

      const cards = container.querySelectorAll('[data-project-card]');
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 28, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: VOID_DURATION.standard,
            stagger: 0.08,
            ease: VOID_EASE.reveal,
            clearProps: 'transform',
            onComplete: () => ScrollTrigger.refresh(),
          },
        );
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(cards, { autoAlpha: 1, clearProps: 'transform' });
        ScrollTrigger.refresh();
      });
    },
    { scope: gridRef, dependencies: [activeDiscipline] },
  );

  return (
    <Section
      id="work"
      dividerTop
      gridBackdrop
      ambientGlow="top-right"
      ariaLabel="Selected Work Archive"
      className="scroll-mt-[var(--header-height)]"
    >
      {/* Back Depth Plane: Monumental Numeral "02" */}
      <DepthLayer
        plane="back"
        speed={14}
        decorative
        className="pointer-events-none absolute left-[var(--space-gutter)] top-[8%] hidden lg:block"
      >
        <span className="font-display text-[clamp(8rem,18vw,18rem)] font-bold leading-none tracking-[-0.06em] text-void-ink/[0.03]">
          02
        </span>
      </DepthLayer>

      <Grid12>
        <SectionHeader
          index="02"
          kicker="SELECTED WORK"
          titleLines={['MONOLITHS IN', 'PRODUCTION']}
          aside={`ARCHIVE 2025 — 2026 (${SELECTED_PROJECTS.length} PLATES)`}
        />

        {/* 12-Col Filter Bar */}
        <TweenReveal
          preset="fadeUp"
          className="col-span-12 flex flex-wrap items-center justify-between gap-4 border-y border-void-border py-4"
        >
          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="flex flex-wrap items-center gap-2"
          >
            {disciplines.map((discipline) => {
              const selected = activeDiscipline === discipline;
              return (
                <button
                  key={discipline}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveDiscipline(discipline)}
                  className={cn(
                    'type-mono-xs border px-3.5 py-2 transition-colors duration-200',
                    selected
                      ? 'border-void-accent bg-void-accent text-void-bg'
                      : 'border-void-border bg-void-surface/70 text-void-ink-secondary hover:border-void-border-strong hover:text-void-ink',
                  )}
                >
                  {discipline}
                </button>
              );
            })}
          </div>

          <span className="type-mono-xs text-void-ink-muted tabular-nums">
            SHOWING 0{filteredProjects.length} / 0{SELECTED_PROJECTS.length}
          </span>
        </TweenReveal>

        {/* Asymmetric 12-Column Portfolio Canvas */}
        <div
          ref={gridRef}
          className="col-span-12 grid grid-cols-12 gap-x-[var(--space-grid-gap)] gap-y-[clamp(2.5rem,5vw,5.5rem)] pt-[var(--space-stack-sm)]"
        >
          {filteredProjects.map((project, idx) => {
            const spanClass = isFiltered
              ? 'col-span-12 lg:col-span-8 lg:col-start-3'
              : ASYMMETRIC_SPANS[idx % ASYMMETRIC_SPANS.length];

            const isElevatedPlate = !isFiltered && idx === 2;

            return (
              <div
                key={project.slug}
                className={cn(
                  spanClass,
                  !isFiltered && idx === 0 && 'contents',
                )}
              >
                {!isFiltered && idx === 0 ? (
                  <>
                    <div className="col-span-12 lg:col-span-8">
                      <ProjectCard project={project} />
                    </div>

                    {/* Floating Front Depth Spec Note paired with Plate 01 across cols 10-12 */}
                    <DepthLayer
                      plane="front"
                      speed={-6}
                      className="col-span-12 lg:col-span-3 lg:col-start-10 lg:self-center"
                    >
                      <aside className="void-depth-card flex flex-col gap-4 p-[var(--space-card-pad)]">
                        <span className="type-mono-xs text-void-accent">
                          CURATORIAL NOTE
                        </span>
                        <p className="type-body text-void-ink-secondary">
                          Each commission is architected from a single 12-column
                          blueprint—balancing brutalist restraint with fluid
                          typography and tactile motion layers.
                        </p>
                        <div className="border-t border-void-border pt-3 flex items-center justify-between">
                          <span className="type-mono-xs text-void-ink-muted">
                            GRID RATIO
                          </span>
                          <span className="type-mono-xs text-void-ink">
                            12 × FLUID
                          </span>
                        </div>
                      </aside>
                    </DepthLayer>
                  </>
                ) : isElevatedPlate ? (
                  <DepthLayer plane="front" speed={-5}>
                    <ProjectCard project={project} />
                  </DepthLayer>
                ) : (
                  <ProjectCard project={project} />
                )}
              </div>
            );
          })}
        </div>
      </Grid12>
    </Section>
  );
}
