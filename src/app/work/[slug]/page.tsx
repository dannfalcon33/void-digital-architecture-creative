import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getNextProject,
  getProjectBySlug,
  SELECTED_PROJECTS,
} from '@/data/studio';
import { Section } from '@/components/ui/Section';
import { Grid12 } from '@/components/ui/Grid12';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { RevealText } from '@/components/motion/RevealText';
import { TweenReveal } from '@/components/motion/TweenReveal';
import { DepthLayer } from '@/components/motion/DepthLayer';
import { AnimatedDivider } from '@/components/motion/AnimatedDivider';
import { ProjectArtworkPlate } from '@/components/studio/ProjectArtworkPlate';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SELECTED_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Not Found' };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);

  return (
    <>
      <Section
        gridBackdrop
        ambientGlow="top-right"
        className="pt-[calc(var(--header-height)+clamp(2rem,4vw,4rem))]"
      >
        <DepthLayer
          plane="back"
          speed={12}
          decorative
          className="pointer-events-none absolute right-[var(--space-gutter)] top-[14%] hidden lg:block"
        >
          <span className="font-display text-[clamp(8rem,20vw,20rem)] font-bold leading-none tracking-[-0.06em] text-void-ink/[0.03]">
            {project.index}
          </span>
        </DepthLayer>

        <Grid12>
          <div className="col-span-12 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#work"
              className="type-mono-xs inline-flex items-center gap-2 text-void-ink-secondary transition-colors hover:text-void-accent"
            >
              ← Back to Selected Work
            </Link>
            <Badge variant="accent">
              MONOGRAPH {project.index} / {project.year}
            </Badge>
          </div>

          <div className="col-span-12 pt-4">
            <RevealText
              as="h1"
              lines={[project.title]}
              immediate
              preserveLcpPaint
              className="type-display-xl text-void-ink"
            />
          </div>

          <div className="col-span-12">
            <AnimatedDivider immediate strong />
          </div>

          {/* 12-Col Spec Strip */}
          <TweenReveal
            preset="fadeUp"
            immediate
            delay={0.12}
            className="col-span-12 grid grid-cols-12 gap-x-[var(--space-grid-gap)] gap-y-4"
          >
            <div className="col-span-6 lg:col-span-3">
              <p className="type-mono-xs text-void-ink-muted">CLIENT</p>
              <p className="type-body mt-1 text-void-ink">{project.client}</p>
            </div>
            <div className="col-span-6 lg:col-span-3">
              <p className="type-mono-xs text-void-ink-muted">DISCIPLINE</p>
              <p className="type-body mt-1 text-void-ink">{project.discipline}</p>
            </div>
            <div className="col-span-6 lg:col-span-4">
              <p className="type-mono-xs text-void-ink-muted">ROLE</p>
              <p className="type-body mt-1 text-void-ink">{project.role}</p>
            </div>
            <div className="col-span-6 lg:col-span-2 lg:text-right">
              <p className="type-mono-xs text-void-ink-muted">TIMELINE</p>
              <p className="type-body mt-1 text-void-ink">{project.timeline}</p>
            </div>
          </TweenReveal>

          {/* Hero Visual Plate across 12 Cols */}
          <div className="col-span-12 pt-[var(--space-stack-sm)]">
            <MediaFrame aspect="wide">
              <ProjectArtworkPlate
                slug={project.slug}
                index={project.index}
                title={project.title}
                accentTone={project.accentTone}
              />
            </MediaFrame>
          </div>
        </Grid12>
      </Section>

      {/* Editorial Narrative & Outcomes */}
      <Section dividerTop>
        <Grid12>
          <TweenReveal
            preset="fadeUp"
            className="col-span-12 lg:col-span-5 flex flex-col gap-4"
          >
            <span className="type-mono-xs text-void-accent">01 / CHALLENGE</span>
            <p className="type-body-lg text-void-ink">{project.challenge}</p>
          </TweenReveal>

          <TweenReveal
            preset="fadeUp"
            delay={0.1}
            className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col gap-4"
          >
            <span className="type-mono-xs text-void-accent">02 / ARCHITECTURE</span>
            <p className="type-body-lg text-void-ink-secondary">
              {project.solution}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          </TweenReveal>

          <div className="col-span-12 pt-4">
            <AnimatedDivider />
          </div>

          <TweenReveal
            preset="scaleSubtle"
            targetSelector="[data-outcome-card]"
            stagger={0.08}
            className="col-span-12 grid grid-cols-12 gap-x-[var(--space-grid-gap)] gap-y-[var(--space-row-gap)]"
          >
            {project.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                data-outcome-card
                className="void-depth-card col-span-12 md:col-span-4 flex flex-col gap-2 p-[var(--space-card-pad)]"
              >
                <span className="type-display-lg text-void-ink tabular-nums">
                  {outcome.value}
                </span>
                <span className="type-mono-xs text-void-ink-muted">
                  {outcome.label}
                </span>
              </div>
            ))}
          </TweenReveal>
        </Grid12>
      </Section>

      {/* Next Project Handoff */}
      <Section tight dividerTop>
        <Grid12 className="items-center">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-2">
            <span className="type-mono-xs text-void-ink-muted">
              NEXT MONOGRAPH · {nextProject.index}
            </span>
            <h2 className="type-display-lg text-void-ink">
              {nextProject.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex lg:justify-end">
            <Button
              href={`/work/${nextProject.slug}`}
              variant="primary"
              trailingIcon={<span>→</span>}
            >
              Inspect Plate {nextProject.index}
            </Button>
          </div>
        </Grid12>
      </Section>
    </>
  );
}
