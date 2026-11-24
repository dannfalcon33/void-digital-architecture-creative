'use client';

import { useRef, type ReactNode } from 'react';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  TWEEN_PRESETS,
  type TweenPresetName,
  useGSAP,
  VOID_DURATION,
  VOID_EASE,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';

interface TweenRevealProps {
  children: ReactNode;
  className?: string;
  preset?: TweenPresetName;
  delay?: number;
  duration?: number;
  stagger?: number;
  /** Optional CSS selector inside this wrapper to stagger multiple child elements */
  targetSelector?: string;
  /** Trigger immediately on mount instead of waiting for ScrollTrigger */
  immediate?: boolean;
  start?: string;
}

export function TweenReveal({
  children,
  className,
  preset = 'fadeUp',
  delay = 0,
  duration = VOID_DURATION.standard,
  stagger = 0.08,
  targetSelector,
  immediate = false,
  start = 'top 86%',
}: TweenRevealProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const root = scopeRef.current;
      if (!root) return;

      const targets = targetSelector
        ? root.querySelectorAll(targetSelector)
        : root;

      if (targets instanceof NodeList && targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        const config = TWEEN_PRESETS[preset];

        gsap.fromTo(targets, config.from, {
          ...config.to,
          duration,
          delay,
          ease: VOID_EASE.reveal,
          stagger: targetSelector ? stagger : 0,
          clearProps: 'transform,clipPath',
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: root,
                  start,
                  once: true,
                },
              }),
        });
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(targets, { clearProps: 'all', autoAlpha: 1 });
      });
    },
    { scope: scopeRef, dependencies: [preset, delay, duration, stagger, targetSelector, immediate, start] },
  );

  return (
    <div ref={scopeRef} className={cn(className)}>
      {children}
    </div>
  );
}
