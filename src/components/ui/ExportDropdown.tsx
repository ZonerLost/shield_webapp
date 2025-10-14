'use client';

import { useRef, useEffect } from 'react';

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface ExportDropdownProps {
  options: DropdownOption[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExportDropdown = ({ options, isOpen, onClose }: ExportDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-placeholder-gray/20 min-w-[200px] flex flex-col gap-2 z-50 p-4"
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            option.onClick();
            onClose();
          }}    
          className="w-full text-left text-md font-normal text-dark-blue font-dm-sans hover:bg-light-gray transition-colors duration-200"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
