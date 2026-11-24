'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { STUDIO_META } from '@/data/studio';
import {
  ensureGsapRegistered,
  gsap,
  MEDIA_QUERIES,
  useGSAP,
  VOID_EASE,
} from '@/lib/gsap';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCOPES = [
  'Digital Flagship',
  'Design System',
  'Creative Frontend',
  'Brand Identity',
] as const;

const BUDGETS = ['$25K — $50K', '$50K — $100K', '$100K+'] as const;

interface InquiryApiResponse {
  ok: boolean;
  referenceId?: string;
  error?: string;
}

export function InquiryDrawer({ isOpen, onClose }: InquiryDrawerProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([SCOPES[0]]);
  const [budget, setBudget] = useState<string>(BUDGETS[1]);
  const [brief, setBrief] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const backdrop = backdropRef.current;
      const panel = panelRef.current;
      if (!backdrop || !panel) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA_QUERIES.motionOk, () => {
        if (isOpen) {
          const tl = gsap.timeline();
          tl.to(backdrop, {
            autoAlpha: 1,
            duration: 0.35,
            ease: VOID_EASE.micro,
          }).fromTo(
            panel,
            { xPercent: 100 },
            {
              xPercent: 0,
              duration: 0.55,
              ease: VOID_EASE.overlay,
            },
            '-=0.22',
          );
        } else {
          const tl = gsap.timeline();
          tl.to(panel, {
            xPercent: 100,
            duration: 0.38,
            ease: VOID_EASE.micro,
          }).to(
            backdrop,
            {
              autoAlpha: 0,
              duration: 0.25,
              ease: VOID_EASE.micro,
            },
            '-=0.18',
          );
        }
      });

      mm.add(MEDIA_QUERIES.reducedMotion, () => {
        gsap.set(backdrop, { autoAlpha: isOpen ? 1 : 0 });
        gsap.set(panel, { xPercent: isOpen ? 0 : 100 });
      });
    },
    { dependencies: [isOpen] },
  );

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope)
        ? prev.length > 1
          ? prev.filter((item) => item !== scope)
          : prev
        : [...prev, scope],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          scopes: selectedScopes,
          budget,
          brief,
          companyWebsite,
        }),
      });

      const data = (await response.json()) as InquiryApiResponse;

      if (!response.ok || !data.ok) {
        setErrorMessage(
          data.error ?? 'Unable to transmit brief. Please verify your inputs.',
        );
        return;
      }

      setReferenceId(data.referenceId ?? 'VOID-2026-REF');
    } catch {
      setErrorMessage(
        `Network interruption. You can also write directly to ${STUDIO_META.email}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setReferenceId(null);
    setErrorMessage(null);
    setName('');
    setEmail('');
    setBrief('');
    setCompanyWebsite('');
    onClose();
  };

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project inquiry form"
      aria-hidden={!isOpen}
      inert={!isOpen}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex justify-end bg-void-bg/80 backdrop-blur-md invisible opacity-0"
    >
      <div
        ref={panelRef}
        className="flex h-full w-full max-w-2xl flex-col justify-between overflow-y-auto border-l border-void-border-strong bg-void-surface p-[clamp(1.25rem,3vw,2.75rem)]"
      >
        <div>
          <div className="flex items-center justify-between border-b border-void-border pb-5">
            <div className="flex items-center gap-3">
              <span className="type-mono-xs text-void-accent">INQUIRY</span>
              <span aria-hidden="true" className="h-px w-5 bg-void-border-strong" />
              <span className="type-mono-xs text-void-ink-muted">
                {STUDIO_META.availability}
              </span>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="type-mono-xs border border-void-border-strong px-3.5 py-2 text-void-ink transition-colors hover:border-void-accent hover:text-void-accent"
            >
              Close [ESC]
            </button>
          </div>

          {referenceId ? (
            <div className="flex flex-col gap-6 py-12">
              <span className="type-mono-xs text-void-accent">
                TRANSMISSION CONFIRMED · {referenceId}
              </span>
              <h2 className="type-display-md text-void-ink">
                Thank you, {name}.
              </h2>
              <p className="type-body-lg text-void-ink-secondary">
                Our Zurich and New York partners review every inquiry directly.
                Expect a calibrated response at{' '}
                <span className="text-void-ink">{email}</span> within 48 hours.
              </p>
              <div className="border border-void-border bg-void-bg/70 p-5 flex flex-col gap-2">
                <p className="type-mono-xs text-void-ink-muted">
                  COMMISSION RECORD
                </p>
                <p className="type-mono-xs text-void-ink">
                  {selectedScopes.join(' · ')} — {budget}
                </p>
                <p className="type-mono-xs text-void-accent">
                  REF: {referenceId}
                </p>
              </div>
              <div>
                <Button onClick={resetAndClose} variant="primary">
                  Return to VOID
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <div>
                <h2 className="type-display-md text-void-ink">
                  Start a Dialogue
                </h2>
                <p className="type-body mt-2 text-void-ink-secondary">
                  Share the contours of your commission. We take on four
                  flagship partnerships per quarter.
                </p>
              </div>

              {/* Honeypot anti-spam field */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Company Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <label className="col-span-12 sm:col-span-6 flex flex-col gap-2">
                  <span className="type-mono-xs text-void-ink-muted">
                    Name *
                  </span>
                  <input
                    required
                    minLength={2}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena Vance"
                    className="border border-void-border bg-void-bg px-4 py-3 text-void-ink placeholder:text-void-ink-muted/60 focus:border-void-accent focus:outline-none"
                  />
                </label>

                <label className="col-span-12 sm:col-span-6 flex flex-col gap-2">
                  <span className="type-mono-xs text-void-ink-muted">
                    Work Email *
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@company.com"
                    className="border border-void-border bg-void-bg px-4 py-3 text-void-ink placeholder:text-void-ink-muted/60 focus:border-void-accent focus:outline-none"
                  />
                </label>
              </div>

              <fieldset className="flex flex-col gap-2.5">
                <legend className="type-mono-xs text-void-ink-muted">
                  Scope of Work
                </legend>
                <div className="mt-1 flex flex-wrap gap-2">
                  {SCOPES.map((scope) => {
                    const active = selectedScopes.includes(scope);
                    return (
                      <button
                        key={scope}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleScope(scope)}
                        className={cn(
                          'type-mono-xs border px-3.5 py-2 transition-colors',
                          active
                            ? 'border-void-accent bg-void-accent text-void-bg'
                            : 'border-void-border bg-void-bg text-void-ink-secondary hover:border-void-border-strong hover:text-void-ink',
                        )}
                      >
                        {scope}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-2.5">
                <legend className="type-mono-xs text-void-ink-muted">
                  Anticipated Investment
                </legend>
                <div className="mt-1 flex flex-wrap gap-2">
                  {BUDGETS.map((tier) => {
                    const active = budget === tier;
                    return (
                      <button
                        key={tier}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setBudget(tier)}
                        className={cn(
                          'type-mono-xs border px-3.5 py-2 transition-colors',
                          active
                            ? 'border-void-ink bg-void-ink text-void-bg'
                            : 'border-void-border bg-void-bg text-void-ink-secondary hover:border-void-border-strong hover:text-void-ink',
                        )}
                      >
                        {tier}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="flex flex-col gap-2">
                <span className="type-mono-xs text-void-ink-muted">
                  Project Context
                </span>
                <textarea
                  rows={4}
                  maxLength={3000}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Timeline, objectives, or links to existing brand material..."
                  className="resize-none border border-void-border bg-void-bg px-4 py-3 text-void-ink placeholder:text-void-ink-muted/60 focus:border-void-accent focus:outline-none"
                />
              </label>

              {errorMessage && (
                <p
                  role="alert"
                  className="type-mono-xs border border-void-accent/50 bg-void-accent-soft px-4 py-3 text-void-accent"
                >
                  {errorMessage}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="type-mono-xs text-void-ink-muted">
                  DIRECT: {STUDIO_META.email}
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  trailingIcon={<span>{isSubmitting ? '…' : '→'}</span>}
                >
                  {isSubmitting ? 'Transmitting' : 'Transmit Brief'}
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-void-border pt-4">
          <span className="type-mono-xs text-void-ink-muted">
            {STUDIO_META.location}
          </span>
          <span className="type-mono-xs text-void-ink-muted">
            NDA READY ON REQUEST
          </span>
        </div>
      </div>
    </div>
  );
}
