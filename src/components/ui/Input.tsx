import { ReactNode, useState, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { InfoIcon, DateIcon, ClockAddIcon } from './Icons';
import { Tooltip } from './Tooltip';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'date' | 'time';
  label: string;
  placeholder: string;
  icon?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showInfoIcon?: boolean;
  tooltipText?: string;
  className?: string;
}

export const Input = ({
  type = 'text',
  label,
  placeholder,
  icon,
  value,
  onChange,
  error,
  showInfoIcon = false,
  tooltipText,
  className = '',
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const isPassword = type === 'password';
  const isDate = type === 'date';
  const isTime = type === 'time';

  const handleDateIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.();
    }
  };

  const handleTimeIconClick = () => {
    if (timeInputRef.current) {
      timeInputRef.current.showPicker?.();
    }
  };

  return (
    <div className={`space-y-2 font-dm-sans ${className}`}>
      <div className="flex items-center gap-2">
        <label className="text-md font-semibold text-blue-primary">
          {label}
        </label>
        {showInfoIcon && (
          <Tooltip 
            content={tooltipText || "Additional information about this field"}
            position="top"
          >
            <InfoIcon className='cursor-pointer' />
          </Tooltip>
        )}
      </div>
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholder-gray">
            {icon}
          </div>
        )}
        
        <input
          ref={isDate ? dateInputRef : isTime ? timeInputRef : undefined}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full px-3 py-3 rounded-lg bg-light-gray border border-placeholder-gray 
            focus:outline-none
            transition-colors duration-200
            ${icon ? 'pl-10' : ''}
            ${isPassword || isDate || isTime ? 'pr-10' : ''}
            ${error ? 'border-error-red' : ''}
            text-sm font-medium font-dm-sans text-blue-primary placeholder-placeholder-gray
            ${isDate ? '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:pointer-events-none' : ''}
            ${isTime ? '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:pointer-events-none' : ''}
          `}
        />
        
        {isDate && !isPassword && (
          <button
            type="button"
            onClick={handleDateIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-placeholder-gray hover:text-blue-primary transition-colors duration-200 focus:outline-none"
          >
            <DateIcon />
          </button>
        )}

        {isTime && !isPassword && (
            <button
              type="button"
              onClick={handleTimeIconClick}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-placeholder-gray hover:text-blue-primary transition-colors duration-200 focus:outline-none"
            >
              <ClockAddIcon />
            </button>
        )}
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-primary hover:text-dark-blue"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-error-red">{error}</p>
      )}
    </div>
  );
};
