'use client';

import { useRef, useState } from 'react';
import { STUDIO_META } from '@/data/studio';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  VOID_EASE,
} from '@/lib/gsap';
import { Section } from '@/components/ui/Section';
import { Grid12 } from '@/components/ui/Grid12';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RevealText } from '@/components/motion/RevealText';
import { TweenReveal } from '@/components/motion/TweenReveal';
import { DepthLayer } from '@/components/motion/DepthLayer';
import { AnimatedDivider } from '@/components/motion/AnimatedDivider';
import { InquiryDrawer } from '@/components/studio/InquiryDrawer';

export function ContactCTASection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyFeedbackRef = useRef<HTMLSpanElement>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_META.email);
      setCopied(true);

      ensureGsapRegistered();
      if (
        copyFeedbackRef.current &&
        window.matchMedia(MEDIA_QUERIES.motionOk).matches
      ) {
        gsap.fromTo(
          copyFeedbackRef.current,
          { scale: 0.92, autoAlpha: 0.6 },
          { scale: 1, autoAlpha: 1, duration: 0.32, ease: VOID_EASE.micro },
        );
      }

      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${STUDIO_META.email}`;
    }
  };

  return (
    <>
      <Section
        id="contact"
        dividerTop
        gridBackdrop
        ambientGlow="top-right"
        ariaLabel="Start a Dialogue"
        className="scroll-mt-[var(--header-height)]"
      >
        {/* Back Depth Plane Watermark */}
        <DepthLayer
          plane="back"
          speed={12}
          decorative
          className="pointer-events-none absolute inset-x-0 bottom-[10%] flex justify-center overflow-hidden"
        >
          <span className="font-display text-[clamp(6rem,18vw,18rem)] font-bold leading-none tracking-[-0.06em] text-void-ink/[0.025]">
            DIALOGUE
          </span>
        </DepthLayer>

        <Grid12 className="items-end">
          {/* Index Row */}
          <TweenReveal
            preset="fadeUp"
            className="col-span-12 lg:col-span-6 flex items-center gap-3"
          >
            <span className="type-mono-xs text-void-accent">04</span>
            <span aria-hidden="true" className="h-px w-6 bg-void-border-strong" />
            <span className="type-mono-xs text-void-ink-muted">
              NEW COMMISSIONS
            </span>
          </TweenReveal>

          <TweenReveal
            preset="fadeUp"
            delay={0.08}
            className="col-span-12 lg:col-span-6 flex lg:justify-end"
          >
            <Badge variant="live">{STUDIO_META.availability}</Badge>
          </TweenReveal>

          {/* Monumental Closing Headline across 12 Cols */}
          <div className="col-span-12 pt-[clamp(0.75rem,2vw,1.75rem)]">
            <RevealText
              as="h2"
              lines={["LET'S ARCHITECT", 'SOMETHING', 'PERMANENT']}
              className="type-display-xl text-void-ink"
            />
          </div>

          <div className="col-span-12 py-2">
            <AnimatedDivider strong />
          </div>

          {/* Lower Asymmetric Split: Cols 1-6 Actions / Cols 8-12 Floating Direct Card */}
          <TweenReveal
            preset="fadeUp"
            delay={0.1}
            className="col-span-12 lg:col-span-6 flex flex-col gap-[var(--space-stack-md)]"
          >
            <p className="type-body-lg max-w-[46ch] text-void-ink-secondary">
              Ready to define a new digital flagship, design system, or launch
              monograph? Initiate a direct conversation with our partners.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                onClick={() => setDrawerOpen(true)}
                variant="primary"
                trailingIcon={<span>→</span>}
              >
                Open Project Brief
              </Button>

              <Button
                onClick={handleCopyEmail}
                variant="outline"
                aria-live="polite"
              >
                <span ref={copyFeedbackRef}>
                  {copied ? 'Email Copied ✓' : `Copy ${STUDIO_META.email}`}
                </span>
              </Button>
            </div>
          </TweenReveal>

          {/* Front Depth Layer: Direct Studio Channels across Cols 8-12 */}
          <DepthLayer
            plane="front"
            speed={-4}
            className="col-span-12 lg:col-span-5 lg:col-start-8"
          >
            <div className="void-depth-card flex flex-col gap-5 p-[var(--space-card-pad)]">
              <div className="flex items-center justify-between border-b border-void-border pb-4">
                <span className="type-mono-xs text-void-ink-muted">
                  DIRECT LINE
                </span>
                <a
                  href={`mailto:${STUDIO_META.email}`}
                  className="type-mono-sm text-void-ink transition-colors hover:text-void-accent"
                >
                  {STUDIO_META.email}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="type-mono-xs text-void-ink-muted">STUDIOS</p>
                  <p className="type-body mt-1.5 text-void-ink">
                    {STUDIO_META.location}
                  </p>
                </div>
                <div>
                  <p className="type-mono-xs text-void-ink-muted">COORDINATES</p>
                  <p className="type-mono-xs mt-2 text-void-ink-secondary">
                    {STUDIO_META.coordinates}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 border-t border-void-border pt-4">
                {STUDIO_META.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-mono-xs text-void-ink-secondary transition-colors hover:text-void-accent"
                  >
                    {social.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </DepthLayer>
        </Grid12>
      </Section>

      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
