import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn('text-center mb-12', className)}>
      {eyebrow && (
        <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-white font-display text-4xl md:text-5xl font-bold uppercase">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-text-secondary mt-4 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="red-line mx-auto mt-6" />
      {children}
    </div>
  );
}
