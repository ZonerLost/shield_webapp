"use client";

interface SettingsHeaderProps {
  name: string;
  email: string;
}

export const SettingsHeader = ({ 
  name, 
  email
}: SettingsHeaderProps) => {
  return (
    <div className="bg-light-gray rounded-xl border border-placeholder-gray/20 p-3 mb-8">
      <div className="flex items-center">
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
    </div>
  );
};
