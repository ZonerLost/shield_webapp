"use client";

import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";

interface SettingsHeaderProps {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export const SettingsHeader = ({ 
  name, 
  email, 
  role, 
  avatarUrl 
}: SettingsHeaderProps) => {
  return (
    <div className="bg-light-gray rounded-xl border border-placeholder-gray/20 p-3 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <Avatar 
            name={name}
            src={avatarUrl}
            size="lg"
          />
          
          {/* User Info */}
          <div>
            <h1 className="text-lg font-semibold text-blue-primary font-dm-sans">
              {name}
            </h1>
            <p className="text-sm text-text-gray font-dm-sans">
              {email}
            </p>
          </div>
        </div>
        
        {/* Role Badge */}
        <Badge variant="role" size="md">
          {role}
        </Badge>
      </div>
    </div>
  );
};
