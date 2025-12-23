"use client";

import { useState, useEffect } from "react";
import { NotificationCard } from "./NotificationCard";
import { NotificationsHeader } from "./NotificationsHeader";
import { notificationsApi } from "@/lib/api";

interface Notification {
  notificationId: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    const response = await notificationsApi.getNotifications(10);
    if (response.success && response.data) {
      // Limit to 10 notifications on frontend as well (defensive)
      setNotifications(response.data.slice(0, 10));
    }
    setLoading(false);
  };

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read if not already read
    if (!notification.isRead) {
      await notificationsApi.markAsRead(notification.notificationId);
      // Update local state
      setNotifications(prev => 
        prev.map(n => 
          n.notificationId === notification.notificationId 
            ? { ...n, isRead: true, readAt: new Date().toISOString() }
            : n
        )
      );
      // Trigger a custom event to refresh the count in Header
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
    }
  };

  const handleMarkAllAsRead = async () => {
    const response = await notificationsApi.markAllAsRead();
    if (response.success) {
      // Update all notifications to read
      setNotifications(prev => 
        prev.map(n => ({ ...n, isRead: true, readAt: new Date().toISOString() }))
      );
      // Trigger a custom event to refresh the count in Header
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
    }
  };

  const hasUnread = notifications.some(n => !n.isRead);

  return (
    <div className=" px-6 bg-white">
      {/* Header */}
      <NotificationsHeader 
        onMarkAllAsRead={handleMarkAllAsRead}
        hasUnread={hasUnread}
      />

      {/* Notifications List */}
      <div className="pb-8 sm:pb-12">
        <div className="max-w-2xl">
          {loading ? (
            <div className="text-sm text-text-gray">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-sm text-text-gray">No notifications found.</div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.notificationId}
                  title={notification.title}
                  description={notification.message}
                  isRead={notification.isRead}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
