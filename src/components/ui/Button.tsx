'use client';

import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Magnetic } from '@/components/motion/Magnetic';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  magnetic?: boolean;
  className?: string;
  trailingIcon?: ReactNode;
}

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'border-void-ink bg-void-ink text-void-bg hover:border-void-accent hover:bg-void-accent hover:text-void-bg',
  outline:
    'border-void-border-strong bg-transparent text-void-ink hover:border-void-ink hover:bg-void-ink/5',
  ghost:
    'border-transparent bg-transparent text-void-ink-secondary hover:text-void-ink px-0',
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    magnetic = true,
    className,
    trailingIcon,
  } = props;

  const sharedClassName = cn(
    'group type-mono-xs relative inline-flex items-center justify-center gap-3 overflow-hidden border px-[clamp(1.1rem,0.9rem+0.6vw,1.65rem)] py-[clamp(0.75rem,0.65rem+0.25vw,0.95rem)] font-medium transition-colors duration-300',
    VARIANT_CLASSES[variant],
    className,
  );

  const innerContent = (
    <>
      <span className="relative inline-flex overflow-hidden">
        <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {trailingIcon && (
        <span
          aria-hidden="true"
          className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          {trailingIcon}
        </span>
      )}
    </>
  );

  let element: ReactNode;

  if (props.href !== undefined) {
    const { href, external } = props;
    element = external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClassName}
      >
        {innerContent}
      </a>
    ) : (
      <Link href={href} className={sharedClassName}>
        {innerContent}
      </Link>
    );
  } else {
    const {
      variant: _v,
      magnetic: _m,
      trailingIcon: _t,
      children: _c,
      className: _cl,
      type = 'button',
      ...buttonRest
    } = props;
    void _v;
    void _m;
    void _t;
    void _c;
    void _cl;

    element = (
      <button type={type} className={sharedClassName} {...buttonRest}>
        {innerContent}
      </button>
    );
  }

  return magnetic ? <Magnetic strength={7}>{element}</Magnetic> : element;
}
