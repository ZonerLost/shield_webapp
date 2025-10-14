"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { ArrowDownIcon } from "./Icons";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export const Dropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option", 
  error, 
  disabled, 
  className = "", 
  icon 
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full py-3 text-sm font-medium font-dm-sans text-left
          bg-light-gray border border-placeholder-gray rounded-lg
          focus:outline-none
          disabled:bg-gray-50 disabled:cursor-not-allowed
          transition-colors duration-200
          flex items-center justify-between
          ${icon ? 'pl-10 pr-2' : 'px-3 pr-2'}
          ${error ? 'border-error-red' : ''}
        `}
      >
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholder-gray">
            {icon}
          </div>
        )}
        
        {/* Selected Value or Placeholder */}
        <span className={`flex-1 ${selectedOption ? 'text-blue-primary' : 'text-placeholder-gray'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        {/* Chevron Icon */}
        <ArrowDownIcon 
          className={` transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-light-gray border border-placeholder-gray rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className={`
                w-full px-3 py-3 text-left text-sm font-medium font-dm-sans
                hover:bg-light-gray transition-colors duration-150
                focus:outline-none focus:bg-light-gray
                ${value === option.value ? 'bg-blue-primary/5 text-blue-primary font-medium' : 'text-blue-primary'}
                first:rounded-t-lg last:rounded-b-lg
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-error-red font-dm-sans">
          {error}
        </p>
      )}
    </div>
  );
};
