"use client";

import { useEffect } from "react";
import { Button } from "../Button";
import { LogoutIcon } from "../Icons";

interface ConfirmLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmLogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmLogoutModalProps) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl p-4 mx-4 w-full max-w-md shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-gray hover:text-dark-blue transition-colors duration-200 focus:outline-none"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-start">
          <div className="w-10 h-10 bg-icons-bg rounded-lg flex items-center mb-2 justify-center">
            <LogoutIcon />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-blue-primary text-start font-dm-sans">
          Confirm Logout?
        </h2>

        {/* Description */}
        <p className="text-text-gray font-medium text-start mb-4 font-dm-sans leading-relaxed">
          You&apos;re about to sign out of Shield Systems. Drafts are auto-saved and
          can be restored when you log back in.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="badge"
            size="md"
            onClick={onConfirm}
            className="w-full"
          >
            Confirm, Logout
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
