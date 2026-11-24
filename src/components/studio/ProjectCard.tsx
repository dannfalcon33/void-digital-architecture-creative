'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { StudioProject } from '@/types/studio';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  useGSAP,
  VOID_EASE,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Badge } from '@/components/ui/Badge';
import { ProjectArtworkPlate } from '@/components/studio/ProjectArtworkPlate';

interface ProjectCardProps {
  project: StudioProject;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const card = cardRef.current;
      if (!card) return;

      const titleEl = card.querySelector('[data-card-title]');
      const arrowEl = card.querySelector('[data-card-arrow]');
      const lineEl = card.querySelector('[data-card-line]');

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.finePointer, () => {
        const onEnter = () => {
          gsap.to(titleEl, {
            x: 8,
            duration: 0.35,
            ease: VOID_EASE.micro,
          });
          gsap.to(arrowEl, {
            x: 4,
            y: -4,
            color: '#FF4D2E',
            duration: 0.3,
            ease: VOID_EASE.micro,
          });
          gsap.to(lineEl, {
            scaleX: 1,
            duration: 0.45,
            ease: VOID_EASE.reveal,
          });
        };

        const onLeave = () => {
          gsap.to(titleEl, {
            x: 0,
            duration: 0.35,
            ease: VOID_EASE.micro,
          });
          gsap.to(arrowEl, {
            x: 0,
            y: 0,
            color: '#F5F4F0',
            duration: 0.3,
            ease: VOID_EASE.micro,
          });
          gsap.to(lineEl, {
            scaleX: 0,
            duration: 0.35,
            ease: VOID_EASE.micro,
          });
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);

        return () => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
        };
      });
    },
    { scope: cardRef },
  );

  return (
    <article
      ref={cardRef}
      data-project-card
      className={cn('group relative flex flex-col gap-[var(--space-stack-sm)]', className)}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="MONOGRAPH"
        aria-label={`Open ${project.title} case study`}
        className="block focus-visible:outline-offset-4"
      >
        <MediaFrame
          aspect={project.aspect}
          className="transition-colors duration-300"
        >
          <ProjectArtworkPlate
            slug={project.slug}
            index={project.index}
            title={project.title}
            accentTone={project.accentTone}
          />
        </MediaFrame>

        <div className="mt-[clamp(0.9rem,1.4vw,1.35rem)] flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="type-mono-xs text-void-accent">{project.index}</span>
              <span aria-hidden="true" className="h-px w-4 bg-void-border-strong" />
              <span className="type-mono-xs text-void-ink-muted">
                {project.client} · {project.year}
              </span>
            </div>
            <span
              data-card-arrow
              aria-hidden="true"
              className="type-mono-sm text-void-ink"
            >
              ↗
            </span>
          </div>

          <div className="relative pb-2">
            <h3
              data-card-title
              className="type-heading text-void-ink will-change-transform"
            >
              {project.title}
            </h3>
            <span
              data-card-line
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-void-accent"
            />
          </div>

          <p className="type-body max-w-[50ch] text-void-ink-secondary">
            {project.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="accent">{project.discipline}</Badge>
            {project.tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
