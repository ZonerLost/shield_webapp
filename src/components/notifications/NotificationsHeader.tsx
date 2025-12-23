"use client";

interface NotificationsHeaderProps {
  title?: string;
  subtitle?: string;
  onMarkAllAsRead?: () => void;
  hasUnread?: boolean;
}

export const NotificationsHeader = ({ 
  title = "Notifications",
  onMarkAllAsRead,
  hasUnread = false
}: NotificationsHeaderProps) => {
  return (
    <div className="py-6 sm:py-8 flex items-center justify-between">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-primary font-dm-sans leading-tight">
        {title}
      </h1>
      {hasUnread && onMarkAllAsRead && (
        <button
          onClick={onMarkAllAsRead}
          className="text-sm font-medium text-blue-primary hover:text-blue-600 font-dm-sans px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Mark all as read
        </button>
      )}
    </div>
  );
};
