import { ReactNode } from 'react';
import { AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';

interface AlertProps {
  children: ReactNode;
  title?: string;
  variant?: 'info' | 'warning' | 'success' | 'error';
  className?: string;
}

export function Alert({ children, title, variant = 'info', className = '' }: AlertProps) {
  const variants = {
    info: {
      container: 'bg-won-complementary-blue/10 border-won-complementary-blue/20 text-won-complementary-blue',
      icon: <Info className="w-4 h-4" />
    },
    warning: {
      container: 'bg-won-complementary-orange/10 border-won-complementary-orange/20 text-won-complementary-orange',
      icon: <AlertCircle className="w-4 h-4" />
    },
    success: {
      container: 'bg-won-complementary-green/10 border-won-complementary-green/20 text-won-complementary-green',
      icon: <CheckCircle className="w-4 h-4" />
    },
    error: {
      container: 'bg-won-complementary-red/10 border-won-complementary-red/20 text-won-complementary-red',
      icon: <XCircle className="w-4 h-4" />
    }
  };

  return (
    <div className={`flex flex-col p-won-3 gap-won-1 border rounded-won-lg ${variants[variant].container} ${className}`}>
      <div className="flex items-center gap-won-2">
        {variants[variant].icon}
        {title && <span className="font-won-bold text-won-sm">{title}</span>}
      </div>
      <div className="text-won-xs leading-relaxed pl-won-6">
        {children}
      </div>
    </div>
  );
}
