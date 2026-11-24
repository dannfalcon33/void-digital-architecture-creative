'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, STUDIO_META } from '@/data/studio';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  ScrollTrigger,
  useGSAP,
  VOID_EASE,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';
import { Grid12 } from '@/components/ui/Grid12';
import { Badge } from '@/components/ui/Badge';
import { MobileMenu } from '@/components/layout/MobileMenu';

const SECTION_IDS = ['manifesto', 'work', 'capabilities', 'contact'] as const;

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const currentSection = pathname.startsWith('/work/') ? 'work' : activeSection;

  useEffect(() => {
    if (pathname.startsWith('/work/')) {
      return;
    }

    ensureGsapRegistered();
    const triggers: ScrollTrigger[] = [];

    SECTION_IDS.forEach((id) => {
      const target = document.getElementById(id);
      if (!target) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: target,
          start: 'top 42%',
          end: 'bottom 42%',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        }),
      );
    });

    const topReset = ScrollTrigger.create({
      start: 'top top',
      end: 'top -200',
      onEnterBack: () => setActiveSection(''),
    });
    triggers.push(topReset);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const el = headerRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        gsap.fromTo(
          el,
          { yPercent: -100, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: VOID_EASE.reveal,
            clearProps: 'transform',
          },
        );

        ScrollTrigger.create({
          start: 'top -48',
          end: 'max',
          onEnter: () => {
            gsap.to(el, {
              backgroundColor: 'rgba(6, 6, 6, 0.88)',
              borderBottomColor: 'rgba(245, 244, 240, 0.16)',
              duration: 0.35,
              ease: VOID_EASE.micro,
            });
          },
          onLeaveBack: () => {
            gsap.to(el, {
              backgroundColor: 'rgba(6, 6, 6, 0.35)',
              borderBottomColor: 'rgba(245, 244, 240, 0.08)',
              duration: 0.35,
              ease: VOID_EASE.micro,
            });
          },
        });
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(el, { yPercent: 0, autoAlpha: 1 });
      });
    },
    { scope: headerRef },
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-40 flex h-[var(--header-height)] items-center border-b border-void-border/70 bg-void-bg/35 backdrop-blur-md"
      >
        <Grid12 className="items-center gap-y-0">
          {/* Cols 1-3: Studio Wordmark */}
          <div className="col-span-6 lg:col-span-3 flex items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 focus-visible:outline-offset-4"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 bg-void-accent transition-transform duration-300 group-hover:rotate-45"
              />
              <span className="font-display text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] font-bold tracking-[0.22em] text-void-ink">
                {STUDIO_META.name}
              </span>
            </Link>
            <span className="type-mono-xs hidden xl:inline-block text-void-ink-muted">
              / STUDIO
            </span>
          </div>

          {/* Cols 4-9: Primary 12-Col Navigation with Active Section Spy */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:col-span-6 lg:flex items-center justify-center gap-[clamp(1.25rem,0.8rem+1.4vw,2.5rem)]"
          >
            {NAV_ITEMS.map((item) => {
              const sectionKey = item.href.replace('/#', '');
              const isActive = currentSection === sectionKey;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group relative inline-flex items-center gap-1.5 py-1 transition-colors duration-200',
                    isActive
                      ? 'text-void-ink'
                      : 'text-void-ink-secondary hover:text-void-ink',
                  )}
                >
                  <span
                    className={cn(
                      'type-mono-xs transition-colors',
                      isActive
                        ? 'text-void-accent'
                        : 'text-void-ink-muted group-hover:text-void-accent',
                    )}
                  >
                    {item.index}
                  </span>
                  <span className="type-mono-xs">{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-300 ease-out',
                      isActive
                        ? 'scale-x-100 bg-void-accent'
                        : 'scale-x-0 bg-void-ink group-hover:scale-x-100',
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Cols 10-12: Availability & Mobile Trigger */}
          <div className="col-span-6 lg:col-span-3 flex items-center justify-end gap-3">
            <Badge variant="live" className="hidden sm:inline-flex">
              {STUDIO_META.availability}
            </Badge>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="void-mobile-menu"
              className="type-mono-xs inline-flex lg:hidden items-center gap-2 border border-void-border-strong px-3.5 py-2 text-void-ink transition-colors hover:border-void-accent hover:text-void-accent"
            >
              <span>Menu</span>
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-void-accent" />
            </button>
          </div>
        </Grid12>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
