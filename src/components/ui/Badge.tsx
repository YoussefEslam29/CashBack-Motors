import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'electric' | 'gas' | 'new';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/20 text-primary border-primary/30',
    electric: 'bg-green-500/20 text-green-400 border-green-500/30',
    gas: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    new: 'bg-primary text-white border-primary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold border uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
