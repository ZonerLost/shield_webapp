"use client";

import { ReactNode } from "react";

interface SettingsMenuItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isLast?: boolean;
  isDanger?: boolean;
}

export const SettingsMenuItem = ({ 
  icon, 
  title, 
  description, 
  onClick, 
  isLast = false,
  isDanger = false 
}: SettingsMenuItemProps) => {
  return (
    <div className={`${!isLast ? 'border-b border-icons-bg mx-4' : 'mx-4'}`}>
      <button
        onClick={onClick}
        className={`
          w-full flex items-center justify-between py-3 text-left
          hover:bg-light-gray transition-colors duration-200
          ${isDanger ? 'hover:bg-error-red/5' : ''}
          first:rounded-t-lg last:rounded-b-lg
        `}
      >
      <div className="flex items-center space-x-4">
        <div className={`
          flex-shrink-0 p-2 rounded-lg
          ${isDanger ? 'bg-error-red/10 text-error-red' : 'bg-icons-bg text-text-gray'}
        `}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`
            text-lg font-medium font-dm-sans
            ${isDanger ? 'text-error-red' : 'text-blue-primary'}
          `}>
            {title}
          </h3>
          <p className={`
            text-sm font-dm-sans
            ${isDanger ? 'text-error-red/80' : 'text-text-gray'}
          `}>
            {description}
          </p>
        </div>
      </div>
      </button>
    </div>
  );
};
