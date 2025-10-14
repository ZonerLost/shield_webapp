"use client";

import { useState } from "react";
import { PlusIcon, SendIcon } from "@/components/ui/Icons";
import { UploadMediaModal } from "@/components/ui/modals/UploadMediaModal";
import { FilePreview } from "./attachments/FilePreview";

interface FilePreviewItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  isImage: boolean;
}

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (previewFiles: FilePreviewItem[]) => void;
  isLoading: boolean;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput = ({
  inputValue,
  setInputValue,
  onSendMessage,
  isLoading,
  onKeyPress,
}: ChatInputProps) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<FilePreviewItem[]>([]);

  const handleUploadImage = () => {
    // Create a file input for images
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const newPreviewFiles: FilePreviewItem[] = Array.from(files).map(file => ({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
          isImage: true,
        }));
        
        setPreviewFiles(prev => [...prev, ...newPreviewFiles]);
        
        // Close modal only after files are selected
        setIsUploadModalOpen(false);
      }
    };
    
    // Open file picker without closing modal
    input.click();
  };

  const handleUploadFile = () => {
    // Create a file input for documents
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt,.rtf';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const newPreviewFiles: FilePreviewItem[] = Array.from(files).map(file => ({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          isImage: false,
        }));
        
        setPreviewFiles(prev => [...prev, ...newPreviewFiles]);
        
        // Close modal only after files are selected
        setIsUploadModalOpen(false);
      }
    };
    
    // Open file picker without closing modal
    input.click();
  };

  const handleRemoveFile = (id: string) => {
    setPreviewFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleSendMessage = () => {
    onSendMessage(previewFiles);
    setPreviewFiles([]);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-placeholder-gray/20 px-6 py-4">
        {/* File Preview */}
        <FilePreview files={previewFiles} onRemove={handleRemoveFile} />
        
        <div className="flex items-center space-x-3 bg-light-gray rounded-full p-3 border border-placeholder-gray/20">
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-placeholder-gray/10 transition-colors"
          >
            <PlusIcon />
          </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type your legal question..."
          className="flex-1 bg-transparent text-dark-blue placeholder-text-gray font-dm-sans focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          disabled={(!inputValue.trim() && previewFiles.length === 0) || isLoading}
          className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-coffee-bg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon />
        </button>
      </div>
    </div>

    {/* Upload Media Modal */}
    <UploadMediaModal
      isOpen={isUploadModalOpen}
      onClose={() => setIsUploadModalOpen(false)}
      onUploadImage={handleUploadImage}
      onUploadFile={handleUploadFile}
    />
  </>
  );
};
