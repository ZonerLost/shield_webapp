"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface FilePreviewItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  isImage: boolean;
}

interface FilePreviewProps {
  files: FilePreviewItem[];
  onRemove: (id: string) => void;
}

export const FilePreview = ({ files, onRemove }: FilePreviewProps) => {
  if (files.length === 0) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 13H8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 17H8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 9H8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 13H8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 17H8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  return (
    <div className="absolute bottom-full left-0 right-0 bg-white border-t border-placeholder-gray/20 p-4 max-h-48 overflow-y-auto">
      <div className="flex flex-wrap gap-2">
        {files.map((file) => (
          <div key={file.id} className="relative bg-chat-bg rounded-lg p-2 border border-placeholder-gray/20 max-w-48">
            {/* Remove button */}
            <button
              onClick={() => onRemove(file.id)}
              className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs hover:bg-black transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            
            {file.isImage ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={file.url || ''}
                    alt={file.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-dark-blue truncate">{file.name}</p>
                  <p className="text-xs text-text-gray">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-dark-blue truncate">{file.name}</p>
                  <p className="text-xs text-text-gray">{formatFileSize(file.size)}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
