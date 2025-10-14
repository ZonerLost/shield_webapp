"use client";

import { Logo } from "../../ui/Icons";

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
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: {
    files?: FileAttachment[];
    images?: ImageAttachment[];
  };
}

interface AssistantMessageProps {
  message: ChatMessage;
}

export const AssistantMessage = ({ message }: AssistantMessageProps) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
          <Logo className="filter invert h-6 w-6"/>
        </div>
        <div className="bg-chat-bg text-text-gray px-4 py-3 rounded-2xl rounded-bl-md border border-placeholder-gray/20 min-w-0 flex-1">
          <p className="text-sm font-medium font-dm-sans whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};
