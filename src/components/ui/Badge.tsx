import React from 'react';

export type BadgeVariant = 'default' | 'role' | 'tag';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-badge-bg text-white',
  role: 'bg-badge-bg text-white',
  tag: 'bg-badge-bg text-white',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-2 text-sm',
};

const fontClasses: Record<BadgeVariant, string> = {
  default: 'font-medium',
  role: 'italic font-light',
  tag: 'font-medium font-dm-sans italic',
};

const roundedClasses: Record<BadgeVariant, string> = {
  default: 'rounded-md',
  role: 'rounded-md',
  tag: 'rounded-md',
};

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) => {
  return (
    <span
      className={`
        inline-flex items-center
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fontClasses[variant]}
        ${roundedClasses[variant]}
        font-dm-sans
        ${className}
      `}
    >
      {children}
    </span>
  );
};
