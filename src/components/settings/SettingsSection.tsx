"use client";

import { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export const SettingsSection = ({ title, children }: SettingsSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-primary mb-3 font-dm-sans">
        {title}
      </h2>
      <div className="bg-light-gray rounded-lg shadow-sm border border-placeholder-gray/20">
        {children}
      </div>
    </div>
  );
};
