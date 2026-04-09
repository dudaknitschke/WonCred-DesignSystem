import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'error' | 'warning';
  className?: string;
}

export function Badge({ children, variant = 'info', className = '' }: BadgeProps) {
  const variants = {
    info: 'bg-won-complementary-blue/20 border-won-complementary-blue/60 text-won-complementary-blue',
    success: 'bg-won-complementary-green/10 border-won-complementary-green/60 text-won-complementary-green',
    error: 'bg-won-complementary-red/10 border-won-complementary-red/50 text-won-complementary-red',
    warning: 'bg-won-complementary-orange/10 border-won-complementary-orange/50 text-won-complementary-orange',
  };

  return (
    <span className={`inline-flex items-center justify-center px-won-2 py-won-1 border rounded-won-md text-won-2xs font-won-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
