'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NAV_ITEMS, STUDIO_META } from '@/data/studio';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  useGSAP,
  VOID_EASE,
} from '@/lib/gsap';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const overlay = overlayRef.current;
      if (!overlay) return;

      const items = overlay.querySelectorAll('[data-menu-item]');
      const meta = overlay.querySelector('[data-menu-meta]');

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        if (isOpen) {
          const tl = gsap.timeline();
          tl.fromTo(
            overlay,
            { autoAlpha: 0, clipPath: 'inset(0% 0% 100% 0%)' },
            {
              autoAlpha: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.55,
              ease: VOID_EASE.overlay,
            },
          )
            .fromTo(
              items,
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.06,
                ease: VOID_EASE.reveal,
              },
              '-=0.25',
            )
            .fromTo(
              meta,
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.4, ease: VOID_EASE.micro },
              '-=0.3',
            );
        } else {
          gsap.to(overlay, {
            autoAlpha: 0,
            duration: 0.25,
            ease: VOID_EASE.micro,
          });
        }
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(overlay, { autoAlpha: isOpen ? 1 : 0, clearProps: 'clipPath' });
        gsap.set(items, { autoAlpha: 1, y: 0 });
        gsap.set(meta, { autoAlpha: 1, y: 0 });
      });
    },
    { scope: overlayRef, dependencies: [isOpen] },
  );

  return (
    <div
      id="void-mobile-menu"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-void-bg/98 backdrop-blur-xl invisible opacity-0"
    >
      <div className="void-grid-12 h-[var(--header-height)] items-center border-b border-void-border">
        <div className="col-span-6 flex items-center gap-3">
          <span className="font-display text-lg font-bold tracking-[0.18em] text-void-ink">
            {STUDIO_META.name}
          </span>
          <span className="type-mono-xs text-void-ink-muted">MENU</span>
        </div>
        <div className="col-span-6 flex justify-end">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="type-mono-xs border border-void-border-strong px-4 py-2 text-void-ink transition-colors hover:border-void-accent hover:text-void-accent"
          >
            Close [ESC]
          </button>
        </div>
      </div>

      <nav aria-label="Mobile navigation" className="void-grid-12 my-auto py-8">
        <ul className="col-span-12 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} data-menu-item className="border-b border-void-border pb-4">
              <Link
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline justify-between gap-4"
              >
                <span className="type-display-md text-void-ink transition-colors group-hover:text-void-accent">
                  {item.label}
                </span>
                <span className="type-mono-xs text-void-ink-muted">
                  {item.index}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        data-menu-meta
        className="void-grid-12 border-t border-void-border py-6"
      >
        <div className="col-span-12 sm:col-span-6">
          <p className="type-mono-xs text-void-ink-muted">{STUDIO_META.location}</p>
          <p className="type-mono-xs mt-1 text-void-ink">{STUDIO_META.email}</p>
        </div>
        <div className="col-span-12 sm:col-span-6 sm:text-right">
          <p className="type-mono-xs text-void-accent">{STUDIO_META.availability}</p>
        </div>
      </div>
    </div>
  );
}
