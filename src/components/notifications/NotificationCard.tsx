"use client";

import {  NotificationBellIcon } from "../ui/Icons";

interface NotificationCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export const NotificationCard = ({
  title,
  description,
  onClick,
}: NotificationCardProps) => {
  return (
    <div
      className="bg-light-gray rounded-xl shadow-sm border border-placeholder-gray p-3 cursor-pointer hover:shadow-md active:scale-[0.98] transition-all duration-200 touch-manipulation"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {/* Notification Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-icons-bg rounded-lg flex items-center justify-center">
          <NotificationBellIcon className="w-5 h-5" />
        </div>
        
        {/* Content */}
        <div className="flex-grow min-w-0">
          <h3 className="text-base font-semibold text-text-gray font-dm-sans mb-1 leading-none">
            {title}
          </h3>
          <p className="text-sm font-medium text-placeholder-gray font-dm-sans truncate leading-none">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
