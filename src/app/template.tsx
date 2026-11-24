'use client';

import { useRef, type ReactNode } from 'react';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  ScrollTrigger,
  useGSAP,
  VOID_EASE,
} from '@/lib/gsap';

/**
 * App Router route template — plays a subtle compositor-only spatial settle
 * on route transitions (/ <-> /work/[slug]) and refreshes ScrollTrigger.
 */
export default function Template({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const el = containerRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        gsap.fromTo(
          el,
          { y: 12 },
          {
            y: 0,
            duration: 0.45,
            ease: VOID_EASE.reveal,
            clearProps: 'transform',
            onComplete: () => ScrollTrigger.refresh(),
          },
        );
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(el, { clearProps: 'transform' });
        ScrollTrigger.refresh();
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="flex w-full flex-col">
      {children}
    </div>
  );
}
