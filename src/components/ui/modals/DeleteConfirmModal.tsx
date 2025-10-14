"use client";

import { Button } from "../Button";
import { DeleteIcon } from "../Icons";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-error-red/5 rounded-full flex items-center justify-center">
            <DeleteIcon />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-dark-blue font-dm-sans text-center mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm text-text-gray font-dm-sans text-center mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-light-gray text-dark-blue rounded-xl font-medium font-dm-sans hover:bg-placeholder-gray/10 transition-colors"
          >
            Cancel
          </button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-error-red flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
