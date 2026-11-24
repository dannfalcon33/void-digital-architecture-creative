'use client';

import { useRef } from 'react';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  useGSAP,
  VOID_EASE,
} from '@/lib/gsap';

/**
 * Razor-thin architectural scroll progress indicator pinned below the Header.
 * Uses compositor-only scaleX driven by GSAP ScrollTrigger.
 */
export function ScrollProgressRail() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const bar = barRef.current;
      if (!bar) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        gsap.fromTo(
          bar,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: VOID_EASE.scrub,
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.15,
            },
          },
        );
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(bar, { scaleX: 0 });
      });
    },
    { scope: barRef },
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[var(--header-height)] z-40 h-[2px] w-full bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-void-accent will-change-transform"
      />
    </div>
  );
}
