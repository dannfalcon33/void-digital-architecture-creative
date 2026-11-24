'use client';

import { useEffect } from 'react';
import { ensureGsapRegistered, ScrollTrigger } from '@/lib/gsap';

export function MotionRoot() {
  useEffect(() => {
    ensureGsapRegistered();

    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) {
          ScrollTrigger.refresh();
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
