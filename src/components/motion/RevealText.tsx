'use client';

import { useRef } from 'react';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  useGSAP,
  VOID_DURATION,
  VOID_EASE,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p' | 'div';

interface RevealTextProps {
  lines: readonly string[];
  as?: HeadingTag;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  /** Keep first paint visible for LCP elements by avoiding opacity:0 */
  preserveLcpPaint?: boolean;
}

export function RevealText({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.085,
  immediate = false,
  preserveLcpPaint = false,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullLabel = lines.join(' ');

  useGSAP(
    () => {
      ensureGsapRegistered();
      const root = containerRef.current;
      if (!root) return;

      const lineNodes = root.querySelectorAll('[data-reveal-line]');
      if (!lineNodes.length) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        gsap.fromTo(
          lineNodes,
          {
            yPercent: 108,
            ...(preserveLcpPaint ? {} : { autoAlpha: 0 }),
          },
          {
            yPercent: 0,
            ...(preserveLcpPaint ? {} : { autoAlpha: 1 }),
            duration: VOID_DURATION.editorial,
            delay,
            stagger,
            ease: VOID_EASE.reveal,
            clearProps: 'transform',
            ...(immediate
              ? {}
              : {
                  scrollTrigger: {
                    trigger: root,
                    start: 'top 86%',
                    once: true,
                  },
                }),
          },
        );
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(lineNodes, { yPercent: 0, autoAlpha: 1 });
      });
    },
    { scope: containerRef, dependencies: [delay, stagger, immediate, preserveLcpPaint] },
  );

  return (
    <div ref={containerRef}>
      <Tag className={cn(className)} aria-label={fullLabel}>
        {lines.map((line, idx) => (
          <span
            key={`${line}-${idx}`}
            aria-hidden="true"
            className="block overflow-hidden pb-[0.06em]"
          >
            <span
              data-reveal-line
              className={cn('block will-change-transform', lineClassName)}
            >
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
