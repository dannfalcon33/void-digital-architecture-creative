'use client';

import { useRef, type ReactNode } from 'react';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  useGSAP,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Maximum attraction shift in pixels */
  strength?: number;
}

export function Magnetic({
  children,
  className,
  strength = 10,
}: MagneticProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const el = wrapperRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.finePointer, () => {
        const xTo = gsap.quickTo(el, 'x', {
          duration: 0.45,
          ease: 'power3.out',
        });
        const yTo = gsap.quickTo(el, 'y', {
          duration: 0.45,
          ease: 'power3.out',
        });

        const handleMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const relX = (event.clientX - rect.left) / rect.width - 0.5;
          const relY = (event.clientY - rect.top) / rect.height - 0.5;
          xTo(relX * strength * 2);
          yTo(relY * strength * 2);
        };

        const handleLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener('mousemove', handleMove);
        el.addEventListener('mouseleave', handleLeave);

        return () => {
          el.removeEventListener('mousemove', handleMove);
          el.removeEventListener('mouseleave', handleLeave);
          gsap.set(el, { x: 0, y: 0 });
        };
      });
    },
    { scope: wrapperRef, dependencies: [strength] },
  );

  return (
    <div ref={wrapperRef} className={cn('inline-flex', className)}>
      {children}
    </div>
  );
}
