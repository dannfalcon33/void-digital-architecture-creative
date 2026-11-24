import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Grid12Props {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'header' | 'footer' | 'nav' | 'article';
}

/**
 * Architectural 12-column CSS Grid container.
 * Governs the internal composition of every section with fluid clamp() gutters & gaps.
 */
export function Grid12({
  children,
  className,
  as: Tag = 'div',
}: Grid12Props) {
  return <Tag className={cn('void-grid-12', className)}>{children}</Tag>;
}
