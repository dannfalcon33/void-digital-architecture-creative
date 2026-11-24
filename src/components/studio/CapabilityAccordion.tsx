'use client';

import { useRef, useState } from 'react';
import type { StudioCapability } from '@/types/studio';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  ScrollTrigger,
  useGSAP,
  VOID_EASE,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';

interface CapabilityAccordionProps {
  items: readonly StudioCapability[];
}

export function CapabilityAccordion({ items }: CapabilityAccordionProps) {
  const [openIndex, setOpenIndex] = useState<string>(items[0]?.index ?? '');
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const root = listRef.current;
      if (!root) return;

      const panels = root.querySelectorAll<HTMLElement>('[data-cap-panel]');
      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        panels.forEach((panel) => {
          const id = panel.dataset.capPanel;
          const isOpen = id === openIndex;
          const chips = panel.querySelectorAll('[data-cap-chip]');

          if (isOpen) {
            gsap.to(panel, {
              height: 'auto',
              autoAlpha: 1,
              duration: 0.48,
              ease: VOID_EASE.overlay,
              onComplete: () => ScrollTrigger.refresh(),
            });
            gsap.fromTo(
              chips,
              { autoAlpha: 0, y: 10 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.36,
                stagger: 0.045,
                delay: 0.08,
                ease: VOID_EASE.micro,
              },
            );
          } else {
            gsap.to(panel, {
              height: 0,
              autoAlpha: 0,
              duration: 0.35,
              ease: VOID_EASE.micro,
              onComplete: () => ScrollTrigger.refresh(),
            });
          }
        });
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        panels.forEach((panel) => {
          const isOpen = panel.dataset.capPanel === openIndex;
          gsap.set(panel, {
            height: isOpen ? 'auto' : 0,
            autoAlpha: isOpen ? 1 : 0,
          });
        });
        ScrollTrigger.refresh();
      });
    },
    { scope: listRef, dependencies: [openIndex] },
  );

  return (
    <div
      ref={listRef}
      className="flex flex-col divide-y divide-void-border border-y border-void-border"
    >
      {items.map((item) => {
        const isOpen = openIndex === item.index;
        const panelId = `capability-panel-${item.index}`;
        const triggerId = `capability-trigger-${item.index}`;

        return (
          <div key={item.index} className="group">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpenIndex((prev) => (prev === item.index ? '' : item.index))
                }
                className="grid w-full grid-cols-12 items-center gap-x-[var(--space-grid-gap)] py-[clamp(1.25rem,2.2vw,1.9rem)] text-left transition-colors duration-200 hover:text-void-accent"
              >
                <span className="type-mono-xs col-span-2 sm:col-span-1 text-void-accent">
                  {item.index}
                </span>
                <span
                  className={cn(
                    'type-heading col-span-8 sm:col-span-9 transition-transform duration-300 group-hover:translate-x-1',
                    isOpen ? 'text-void-ink' : 'text-void-ink-secondary group-hover:text-void-ink',
                  )}
                >
                  {item.title}
                </span>
                <span className="col-span-2 flex justify-end">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'type-mono-sm inline-flex h-8 w-8 items-center justify-center border transition-all duration-300',
                      isOpen
                        ? 'border-void-accent bg-void-accent text-void-bg rotate-45'
                        : 'border-void-border-strong text-void-ink',
                    )}
                  >
                    +
                  </span>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              data-cap-panel={item.index}
              className="overflow-hidden"
              style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
            >
              <div className="grid grid-cols-12 gap-x-[var(--space-grid-gap)] pb-[clamp(1.5rem,2.6vw,2.25rem)]">
                <div className="col-span-12 sm:col-span-11 sm:col-start-2 flex flex-col gap-5">
                  <p className="type-body-lg max-w-[54ch] text-void-ink-secondary">
                    {item.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.deliverables.map((deliverable) => (
                      <span key={deliverable} data-cap-chip>
                        <Badge variant="neutral">{deliverable}</Badge>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
