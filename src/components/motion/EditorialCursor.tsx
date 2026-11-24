'use client';

import { useRef, useState } from 'react';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  useGSAP,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';

/**
 * Restrained architectural pointer companion.
 * - Strictly gated to desktop fine pointers with reduced-motion off.
 * - Never hides the native OS cursor (preserves usability & accessibility).
 * - Displays contextual micro-label when hovering elements with [data-cursor].
 */
export function EditorialCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>('');

  useGSAP(
    () => {
      ensureGsapRegistered();
      const cursor = cursorRef.current;
      if (!cursor) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.finePointer, () => {
        gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

        const xTo = gsap.quickTo(cursor, 'x', {
          duration: 0.28,
          ease: 'power3.out',
        });
        const yTo = gsap.quickTo(cursor, 'y', {
          duration: 0.28,
          ease: 'power3.out',
        });

        let visible = false;

        const onPointerMove = (event: PointerEvent) => {
          if (!visible) {
            visible = true;
            gsap.to(cursor, { autoAlpha: 1, duration: 0.25 });
          }
          xTo(event.clientX);
          yTo(event.clientY);

          const target = event.target as HTMLElement | null;
          const cursorEl = target?.closest<HTMLElement>('[data-cursor]');
          const nextLabel = cursorEl?.dataset.cursor ?? '';
          setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
        };

        const onPointerLeave = () => {
          visible = false;
          setLabel('');
          gsap.to(cursor, { autoAlpha: 0, duration: 0.2 });
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', onPointerLeave);

        return () => {
          window.removeEventListener('pointermove', onPointerMove);
          document.documentElement.removeEventListener(
            'pointerleave',
            onPointerLeave,
          );
          gsap.set(cursor, { autoAlpha: 0 });
        };
      });
    },
    { scope: cursorRef },
  );

  const hasLabel = label.length > 0;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[60] hidden lg:flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out will-change-transform invisible opacity-0',
        hasLabel
          ? 'h-9 min-w-[5.5rem] border-void-accent bg-void-accent px-3 text-void-bg shadow-lg'
          : 'h-6 w-6 border-void-ink/35 bg-transparent',
      )}
    >
      {hasLabel && (
        <span className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
