'use client';

import { useRef, type ReactNode } from 'react';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  useGSAP,
  VOID_EASE,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';

export type DepthPlane = 'back' | 'mid' | 'front' | 'float';

const PLANE_Z_CLASSES: Record<DepthPlane, string> = {
  back: 'z-0',
  mid: 'z-10',
  front: 'z-20',
  float: 'z-30',
};

interface DepthLayerProps {
  children: ReactNode;
  className?: string;
  /** Spatial stratum for multi-plane section styling */
  plane?: DepthPlane;
  /** Vertical scroll parallax amplitude in percent (positive moves slower/deeper, negative rises faster) */
  speed?: number;
  /** Optional subtle scale delta across scroll range */
  scaleFrom?: number;
  scaleTo?: number;
  /** Optional decorative / non-interactive flag */
  decorative?: boolean;
}

export function DepthLayer({
  children,
  className,
  plane = 'mid',
  speed = 0,
  scaleFrom,
  scaleTo,
  decorative = false,
}: DepthLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const el = layerRef.current;
      if (!el || (speed === 0 && scaleFrom === undefined)) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.desktopMotion, () => {
        const fromVars: gsap.TweenVars = {
          yPercent: -speed,
        };
        const toVars: gsap.TweenVars = {
          yPercent: speed,
          ease: VOID_EASE.scrub,
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.75,
          },
        };

        if (scaleFrom !== undefined && scaleTo !== undefined) {
          fromVars.scale = scaleFrom;
          toVars.scale = scaleTo;
        }

        gsap.fromTo(el, fromVars, toVars);
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(el, { clearProps: 'transform' });
      });
    },
    { scope: layerRef, dependencies: [speed, scaleFrom, scaleTo] },
  );

  return (
    <div
      ref={layerRef}
      aria-hidden={decorative ? 'true' : undefined}
      className={cn(
        PLANE_Z_CLASSES[plane],
        decorative && 'pointer-events-none select-none',
        className,
      )}
    >
      {children}
    </div>
  );
}
