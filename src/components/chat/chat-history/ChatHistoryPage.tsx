"use client";

import { useState } from "react";
import { ChatHistoryEntry } from "./ChatHistoryEntry";
import { DeleteConfirmModal } from "../../ui/modals/DeleteConfirmModal";

interface ChatHistoryItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

const mockChatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    title: "Arrest Without Warrant",
    description: "Query on police powers to arrest und...",
    timestamp: "2 hours ago"
  },
  {
    id: "2", 
    title: "Search Premises for Evidence",
    description: "Asked about conditions required befo...",
    timestamp: "1 day ago"
  },
  {
    id: "3",
    title: "Drink Driving Limits", 
    description: "Clarification on legal BAC thresholds f...",
    timestamp: "2 days ago"
  },
  {
    id: "4",
    title: "Obstructing Police",
    description: "Asked about penalties for hindering o...",
    timestamp: "3 days ago"
  },
  {
    id: "5",
    title: "Detaining a Suspect",
    description: "Guidance on maximum time a suspec...",
    timestamp: "1 week ago"
  },
  {
    id: "6",
    title: "Domestic Violence Orders",
    description: "Questioned when an officer can issue...",
    timestamp: "1 week ago"
  },
  {
    id: "7",
    title: "Use of Force in Arrest",
    description: "Query on lawful limits of reasonable f...",
    timestamp: "2 weeks ago"
  }
];

export const ChatHistoryPage = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(mockChatHistory);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    chatId: string | null;
    chatTitle: string;
  }>({
    isOpen: false,
    chatId: null,
    chatTitle: "",
  });

  const handleDeleteClick = (chatId: string, chatTitle: string) => {
    setDeleteModal({
      isOpen: true,
      chatId,
      chatTitle,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.chatId) {
      setChatHistory(prev => prev.filter(chat => chat.id !== deleteModal.chatId));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      isOpen: false,
      chatId: null,
      chatTitle: "",
    });
  };

  return (
    <>
      <div className="px-6 py-6 bg-white">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-dark-blue font-dm-sans mb-2">
            Chats History
          </h1>
          <p className="text-sm text-text-gray font-dm-sans">
            See all your previous chats and sessions you had with Shield Nexus.
          </p>
        </div>

        {/* Chat History List */}
        <div className="space-y-3">
          {chatHistory.map((chat) => (
            <ChatHistoryEntry 
              key={chat.id} 
              chat={chat}
              onDelete={() => handleDeleteClick(chat.id, chat.title)}
              onClick={() => {
                // Handle chat selection
                console.log("Select chat:", chat.id);
              }}
            />
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Chat"
        message={`Are you sure you want to delete "${deleteModal.chatTitle}"? This action cannot be undone.`}
      />
    </>
  );
};
