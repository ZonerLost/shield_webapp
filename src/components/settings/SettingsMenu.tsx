"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SettingsMenuItem } from "./SettingsMenuItem";
import { SettingsSection } from "./SettingsSection";
import { ConfirmLogoutModal } from "../ui/modals/ConfirmLogoutModal";
import { DocumentsIcon, HelpCircleIcon, LogoutIcon, OutcomeIcon, PreferencesIcon, PrivacyPolicyIcon, SecurityIcon, UserIcon } from "../ui/Icons";
import { useToastContext } from "@/components/providers/ToastProvider";

export const SettingsMenu = () => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const toast = useToastContext();

  const handleItemClick = (action: string) => {
    switch (action) {
      case 'Personal Info':
        router.push('/settings/personal-info');
        break;
      case 'Security & Access':
        router.push('/settings/security');
        break;
      case 'App Preferences':
        router.push('/settings/preferences');
        break;
      case 'Documents & Data':
        router.push('/settings/documents');
        break;
      case 'Help':
        router.push('/settings/help');
        break;
      case 'Privacy Policy':
        router.push('/settings/privacy');
        break;
      case 'Narrative':
        router.push('/settings/narrative');
        break;
      case 'Logout':
        setIsLogoutModalOpen(true);
        break;
      default:
        console.log(`${action} clicked`);
    }
  };

  const handleLogoutConfirm = () => {
    // Clear all authentication data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Close modal
    setIsLogoutModalOpen(false);
    
    // Show logout toast
    toast.info('Logged out successfully');
    
    // Redirect to login page
    router.push('/login');
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Account Section */}
      <SettingsSection title="Account">
        <SettingsMenuItem
          icon={<UserIcon />}
          title="Personal Info"
          description="View your agency profile details."
          onClick={() => handleItemClick('Personal Info')}
        />
        <SettingsMenuItem
          icon={<SecurityIcon />}
          title="Security & Access"
          description="Manage login and authentication options."
          onClick={() => handleItemClick('Security & Access')}
        />
        <SettingsMenuItem
          icon={<PreferencesIcon />}
          title="App Preferences"
          description="Customise theme, text, notifications."
          onClick={() => handleItemClick('App Preferences')}
        />
        <SettingsMenuItem
          icon={<DocumentsIcon />}
          title="Documents & Data"
          description="Access drafts and exported files."
          onClick={() => handleItemClick('Documents & Data')}
          isLast
        />
      </SettingsSection>

      {/* Support Section */}
      <SettingsSection title="Support">
        <SettingsMenuItem
          icon={<HelpCircleIcon />}
          title="Help"
          description="Find guides or report issues."
          onClick={() => handleItemClick('Help')}
        />
        <SettingsMenuItem
          icon={<PrivacyPolicyIcon />}
          title="Privacy Policy"
          description="Read app's data use terms."
          onClick={() => handleItemClick('Privacy Policy')}
          isLast
        />
      </SettingsSection>

      <SettingsSection title="Narrative">
        <SettingsMenuItem
          icon={<OutcomeIcon />}
          title="Narrative"
          description="View your narrative."
          onClick={() => handleItemClick('Narrative')}
        />
      </SettingsSection>

      {/* Danger Zone Section */}
      <SettingsSection title="Session">
        <SettingsMenuItem
          icon={<LogoutIcon />}
          title="Logout"
          description="Sign out from this device."
          onClick={() => handleItemClick('Logout')}
          isLast
        />
      </SettingsSection>

      {/* Confirm Logout Modal */}
      <ConfirmLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};
