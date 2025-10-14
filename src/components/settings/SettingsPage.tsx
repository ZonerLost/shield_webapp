"use client";

import { SettingsHeader } from "./SettingsHeader";
import { SettingsMenu } from "./SettingsMenu";

export const SettingsPage = () => {
  return (
    <div className="py-8 px-6">
      <div className="max-w-md mx-auto">
        <SettingsHeader 
          name="Kashan Ali"
          email="Kashan@003.com"
          role="Associate Lawyer"
        />
        <SettingsMenu />
      </div>
    </div>
  );
};
