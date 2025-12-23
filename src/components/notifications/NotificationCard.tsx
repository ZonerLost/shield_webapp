"use client";

import {  NotificationBellIcon } from "../ui/Icons";

interface NotificationCardProps {
  title: string;
  description: string;
  onClick?: () => void;
  isRead?: boolean;
}

export const NotificationCard = ({
  title,
  description,
  onClick,
  isRead = false,
}: NotificationCardProps) => {
  return (
    <div
      className={`rounded-xl shadow-sm border p-3 cursor-pointer hover:shadow-md active:scale-[0.98] transition-all duration-200 touch-manipulation relative ${
        isRead 
          ? 'bg-light-gray border-placeholder-gray opacity-70' 
          : 'bg-blue-50 border-blue-primary border-2'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {/* Notification Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          isRead ? 'bg-icons-bg' : 'bg-blue-primary'
        }`}>
          <NotificationBellIcon className={`w-5 h-5 ${isRead ? '' : 'text-white'}`} />
        </div>
        
        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`text-base font-semibold font-dm-sans leading-none ${
              isRead ? 'text-text-gray' : 'text-blue-primary'
            }`}>
              {title}
            </h3>
            {!isRead && (
              <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            )}
          </div>
          <p className={`text-sm font-medium font-dm-sans truncate leading-none ${
            isRead ? 'text-placeholder-gray' : 'text-text-gray'
          }`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
