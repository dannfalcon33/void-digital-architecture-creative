'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

let isRegistered = false;

export function ensureGsapRegistered() {
  if (typeof window === 'undefined' || isRegistered) return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({
    ease: 'power4.out',
    duration: 0.85,
  });
  isRegistered = true;
}

export const VOID_EASE = {
  reveal: 'power4.out',
  micro: 'power3.out',
  overlay: 'power3.inOut',
  scrub: 'none',
} as const;

export const VOID_DURATION = {
  instant: 0.22,
  micro: 0.45,
  standard: 0.8,
  editorial: 1.05,
} as const;

export type TweenPresetName =
  | 'fadeUp'
  | 'fadeIn'
  | 'clipUp'
  | 'scaleSubtle'
  | 'slideLeft';

export const TWEEN_PRESETS: Record<
  TweenPresetName,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  fadeUp: {
    from: { autoAlpha: 0, y: 28 },
    to: { autoAlpha: 1, y: 0 },
  },
  fadeIn: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1 },
  },
  clipUp: {
    from: { autoAlpha: 0, yPercent: 18, clipPath: 'inset(0% 0% 100% 0%)' },
    to: { autoAlpha: 1, yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)' },
  },
  scaleSubtle: {
    from: { autoAlpha: 0, scale: 0.96, y: 18 },
    to: { autoAlpha: 1, scale: 1, y: 0 },
  },
  slideLeft: {
    from: { autoAlpha: 0, x: 24 },
    to: { autoAlpha: 1, x: 0 },
  },
};

export const MEDIA_QUERIES = {
  reducedMotion: '(prefers-reduced-motion: reduce)',
  motionOk: '(prefers-reduced-motion: no-preference)',
  desktopMotion: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  finePointer: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
} as const;

export { gsap, ScrollTrigger, useGSAP };
