"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsMenu } from "./SettingsMenu";

export const SettingsPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Get user info from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.fullName || 'User');
        setUserEmail(user.email || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUserName('User');
        setUserEmail('');
      }
    } else {
      // If no user data, redirect to login
      router.push('/login');
    }
  }, [router]);

  // Don't render until we have user data
  if (!userName) {
    return null;
  }

  return (
    <div className="py-8 px-6">
      <div className="max-w-md mx-auto">
        <SettingsHeader 
          name={userName}
          email={userEmail}
        />
        <SettingsMenu />
      </div>
    </div>
  );
};
