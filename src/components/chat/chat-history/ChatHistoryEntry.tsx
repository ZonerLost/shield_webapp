"use client";

import { ChatIcon, DeleteIcon } from "../../ui/Icons";

interface ChatHistoryItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

interface ChatHistoryEntryProps {
  chat: ChatHistoryItem;
  onDelete: () => void;
  onClick: () => void;
}

export const ChatHistoryEntry = ({ chat, onDelete, onClick }: ChatHistoryEntryProps) => {
  return (
    <div 
      className="bg-light-gray rounded-xl p-4 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {/* Chat Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-icons-bg rounded-lg flex items-center justify-center">
          <ChatIcon />
        </div>

        {/* Chat Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-md font-semibold text-dark-blue font-dm-sans">
            {chat.title}
          </h3>
          <p className="text-sm font-medium text-text-gray font-dm-sans truncate">
            {chat.description}
          </p>
        </div>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};
