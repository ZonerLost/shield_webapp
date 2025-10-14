import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'badge' | 'coffee';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
}: ButtonProps) => {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none font-dm-sans';
  
  const variantClasses = {
    primary: 'bg-dark-blue text-white hover:bg-slate-800 disabled:bg-placeholder-gray/70 disabled:text-text-gray',
    secondary: 'bg-placeholder-gray text-dark-blue hover:bg-text-gray disabled:bg-placeholder-gray',
    outline: 'border bg-light-gray border-placeholder-gray text-text-gray disabled:border-placeholder-gray',
    badge: 'bg-badge-bg text-white hover:bg-badge-bg/90 disabled:bg-placeholder-gray/70 disabled:text-text-gray',
    coffee: 'bg-coffee-bg text-white hover:bg-coffee-bg/90 disabled:bg-coffee-bg/50',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
