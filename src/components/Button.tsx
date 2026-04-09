import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'primary' | 'confirm' | 'cancel' | 'neutral';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function Button({ 
  variant = 'solid', 
  size = 'md',
  colorScheme = 'primary', 
  leftIcon,
  rightIcon,
  children, 
  fullWidth = false,
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center gap-won-2 font-won-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const sizeStyles = {
    sm: "px-won-3 py-won-1.5 text-won-xs rounded-won-md",
    md: "px-won-6 py-won-3 text-won-sm rounded-won-xl",
    lg: "px-won-8 py-won-4 text-won-base rounded-won-2xl",
  };

  const iconOnlySizeStyles = {
    sm: "p-won-1.5 rounded-won-md",
    md: "p-won-3 rounded-won-xl",
    lg: "p-won-4 rounded-won-2xl",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  
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
    },
    text: {
      primary: "text-won-brand-primary-0 hover:bg-won-brand-primary-0/10",
      confirm: "text-won-complementary-green hover:bg-won-complementary-green/10",
      cancel: "text-won-complementary-red hover:bg-won-complementary-red/10",
      neutral: "text-won-content-secondary hover:bg-won-content-primary/10",
    }
  };

  const variantStyles = variants[variant][colorScheme];
  const isIconOnly = !children && (leftIcon || rightIcon);
  const finalSizeStyles = isIconOnly ? iconOnlySizeStyles[size] : sizeStyles[size];

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${finalSizeStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {leftIcon && <span className="flex items-center justify-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center justify-center">{rightIcon}</span>}
    </button>
  );
}
