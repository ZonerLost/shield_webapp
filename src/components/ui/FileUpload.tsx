"use client";

import { useRef, useState } from 'react';
import { AttachmentIcon, UploadIcon } from './Icons';

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  error?: string;
  className?: string;
}

export const FileUpload = ({
  label,
  onFileSelect,
  error,
  className = '',
}: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 font-dm-sans ${className}`}>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-blue-primary">
          {label}
        </label>
      </div>
      
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        />
        
        <div 
          onClick={handleClick}
          className={`
            w-full px-3 py-3 rounded-lg bg-light-gray border border-placeholder-gray 
            cursor-pointer hover:bg-light-gray transition-colors duration-200
            ${error ? 'border-error-red' : ''}
            flex items-center space-x-3
          `}
        >
          <div className="text-placeholder-gray">
            <AttachmentIcon />
          </div>
          
          <div className="flex-1">
            {selectedFile ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-primary">
                  {selectedFile.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="text-error-red hover:text-error-red/80 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <span className="text-sm text-placeholder-gray">
                Proof.png
              </span>
            )}
          </div>
          
          <div className="text-placeholder-gray">
            <UploadIcon />
          </div>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-error-red">{error}</p>
      )}
    </div>
  );
};
