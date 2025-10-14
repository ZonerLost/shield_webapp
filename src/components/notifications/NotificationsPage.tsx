"use client";

import { NotificationCard } from "./NotificationCard";
import { NotificationsHeader } from "./NotificationsHeader";

export const NotificationsPage = () => {
  const handleNotificationClick = (title: string) => {
    console.log(`Clicked on notification: ${title}`);
    // Handle notification click - could mark as read, navigate to detail, etc.
  };

  // Sample notification data
  const notifications = [
    {
      title: "Draft Narrative Ready",
      description: "Your notes have been expanded into a polished incident narrative. Review and edit as needed."
    },
    {
      title: "Auto-Save Restored",
      description: "We've recovered your last draft. Continue where you left off with your work."
    },
    {
      title: "SMF Generated",
      description: "Your Statement of Material Facts is ready for review and submission to court."
    },
    {
      title: "Legal Guidance Available",
      description: "An answer to your recent legislation query is now available in your dashboard."
    },
    {
      title: "Export Successful",
      description: "Your document has been securely saved and exported to your specified location."
    },
    {
      title: "Clarification Needed",
      description: "Shield AI requires more detail to answer your recent query. Please provide additional context."
    },
    {
      title: "Legal Guidance Available",
      description: "An answer to your recent legislation query is now available in your dashboard."
    }
  ];

  return (
    <div className=" px-6 bg-white">
      {/* Header */}
      <NotificationsHeader />

      {/* Notifications List */}
      <div className="pb-8 sm:pb-12">
        <div className="max-w-2xl">
          <div className="space-y-3 sm:space-y-4">
            {notifications.map((notification, index) => (
              <NotificationCard
                key={index}
                title={notification.title}
                description={notification.description}
                onClick={() => handleNotificationClick(notification.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
