"use client";

import { useState, useEffect } from "react";
import { Logo, MenuIcon, BellIcon, MoreDotsIcon } from "./Icons";
import { useRouter, usePathname } from "next/navigation";
import { notificationsApi } from "@/lib/api";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
    // Refresh unread count every 5 seconds for real-time updates
    const interval = setInterval(fetchUnreadCount, 5000);
    
    // Listen for custom event when notifications are updated
    const handleNotificationsUpdated = () => {
      fetchUnreadCount();
    };
    window.addEventListener('notificationsUpdated', handleNotificationsUpdated);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('notificationsUpdated', handleNotificationsUpdated);
    };
  }, [pathname]); // Refresh when pathname changes (e.g., when navigating to dashboard)

  const fetchUnreadCount = async () => {
    const response = await notificationsApi.getUnreadCount();
    if (response.success) {
      setUnreadCount(response.count);
    }
  };
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-placeholder-gray">
      {/* Left side - Menu */}
      <div className="flex items-center">
        <button className="hover:bg-icons-bg rounded-lg transition-colors cursor-pointer"
        onClick={() => {
          router.push("/settings");
        }}>
          <MenuIcon />
        </button>
      </div>

      {/* Center - Logo */}
      <div className="flex items-center space-x-2 cursor-pointer" 
      onClick={() => {
        router.push("/");
      }}>
        <Logo className="h-8 w-8" />
        <span className="text-xl font-normal text-black font-dm-sans">
          ShieldSystems
        </span>
      </div>

      {/* Right side - Notifications (dashboard only) or Chat History */}
      <div className="flex items-center">
        {/* Show notification bell icon only on dashboard */}
        {pathname === "/dashboard" && (
          <button className="hover:bg-icons-bg rounded-lg transition-colors cursor-pointer relative"
          onClick={() => {
            router.push("/notifications");
          }}>
            <BellIcon />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        )}
        {/* Show chat history icon only on chat page */}
        {pathname === "/chat" && (
          <button className="hover:bg-icons-bg rounded-lg transition-colors cursor-pointer"
          onClick={() => {
            router.push("/chat-history");
          }}>
            <MoreDotsIcon />
          </button>
        )}
      </div>
    </div>
  );
};