"use client";

import { Avatar } from "../../ui/Avatar";
import { FileAttachment } from "../attachments/FileAttachment";
import { ImageAttachment } from "../attachments/ImageAttachment";

interface FileAttachment {
  name: string;
  type: string;
  size: number;
  url?: string;
}

interface ImageAttachment {
  name: string;
  url: string;
  size: number;
}

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: {
    files?: FileAttachment[];
    images?: ImageAttachment[];
  };
}

interface UserMessageProps {
  message: ChatMessage;
}

export const UserMessage = ({ message }: UserMessageProps) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
        <div className="bg-black text-white px-4 py-3 rounded-2xl rounded-br-md min-w-0 flex-1">
          {/* Display files */}
          {message.attachments?.files?.map((file, index) => (
            <FileAttachment key={index} file={file} />
          ))}

          {/* Display text content if present */}
          {message.content && (
            <p className={`text-sm font-dm-sans ${message?.attachments?.images?.length || message?.attachments?.images?.length ? 'pb-2' : ''}`}>{message.content}</p>
          )}
          {/* Display images first */}
          {message.attachments?.images?.map((image, index) => (
            <ImageAttachment key={index} image={image} />
          ))}
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <Avatar name="John Doe" size="md" />
        </div>
      </div>
    </div>
  );
};
