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

interface AnimatedDividerProps {
  className?: string;
  delay?: number;
  immediate?: boolean;
  strong?: boolean;
}

export function AnimatedDivider({
  className,
  delay = 0,
  immediate = false,
  strong = false,
}: AnimatedDividerProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const el = lineRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: VOID_DURATION.editorial,
            delay,
            ease: VOID_EASE.reveal,
            ...(immediate
              ? {}
              : {
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 92%',
                    once: true,
                  },
                }),
          },
        );
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(el, { scaleX: 1 });
      });
    },
    { scope: lineRef, dependencies: [delay, immediate] },
  );

  return (
    <div
      ref={lineRef}
      role="separator"
      aria-hidden="true"
      className={cn(
        'h-px w-full origin-left',
        strong ? 'bg-void-border-strong' : 'bg-void-border',
        className,
      )}
    />
  );
}
