import { ReactNode } from 'react';

interface TextAreaProps {
  label: string;
  placeholder: string;
  icon?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
  className?: string;
}

export const TextArea = ({
  label,
  placeholder,
  icon,
  value,
  onChange,
  error,
  rows = 4,
  className = '',
}: TextAreaProps) => {
  return (
    <div className={`space-y-2 font-dm-sans ${className}`}>
      <div className="flex items-center gap-2">
        <label className="text-md font-semibold text-blue-primary">
          {label}
        </label>
      </div>
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-placeholder-gray">
            {icon}
          </div>
        )}
        
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`
            w-full px-3 py-3 rounded-lg bg-light-gray border border-placeholder-gray 
            focus:outline-none
            transition-colors duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-error-red' : ''}
            text-sm font-medium font-dm-sans text-blue-primary placeholder-placeholder-gray
            resize-none
          `}
        />
      </div>
      
      {error && (
        <p className="text-sm text-error-red">{error}</p>
      )}
    </div>
  );
};
