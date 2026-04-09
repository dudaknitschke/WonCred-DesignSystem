import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  colorScheme?: 'primary' | 'confirm' | 'cancel' | 'neutral';
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'solid', 
  colorScheme = 'primary', 
  icon, 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center gap-won-2 px-won-6 py-won-3 rounded-won-xl font-won-semibold text-won-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    solid: {
      primary: "bg-won-brand-primary-0 text-white hover:bg-won-brand-primary-1 active:bg-won-brand-primary-2",
      confirm: "bg-won-complementary-green text-white hover:brightness-90 active:brightness-75",
      cancel: "bg-won-complementary-red text-white hover:brightness-90 active:brightness-75",
      neutral: "bg-won-content-secondary text-white hover:bg-won-content-primary active:bg-won-brand-tertiary",
    },
    outline: {
      primary: "border-2 border-won-brand-primary-0 text-won-brand-primary-0 hover:bg-won-brand-primary-0 hover:text-white",
      confirm: "border-2 border-won-complementary-green text-won-complementary-green hover:bg-won-complementary-green hover:text-white",
      cancel: "border-2 border-won-complementary-red text-won-complementary-red hover:bg-won-complementary-red hover:text-white",
      neutral: "border-2 border-won-border-default text-won-content-primary hover:bg-won-brand-secondary",
    }
  };

  const variantStyles = variants[variant][colorScheme];

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
}
