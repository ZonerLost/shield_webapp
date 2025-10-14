"use client";

import { UploadFileIcon } from "../../ui/Icons";

interface FileAttachmentProps {
  file: {
    name: string;
    type: string;
    size: number;
    url?: string;
  };
}

export const FileAttachment = ({ file }: FileAttachmentProps) => {
  return (
    <div className="bg-white rounded-xl p-2 mb-2 border border-placeholder-gray/20 max-w-full overflow-hidden">
      <div className="flex items-center space-x-3 min-w-0">
        <div className="flex-shrink-0 w-6 h-6 bg-icons-bg rounded-lg flex items-center justify-center">
          <UploadFileIcon />
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-xs font-medium text-dark-blue font-dm-sans truncate">
            {file.name}
          </p>
        </div>
      </div>
    </div>
  );
};
