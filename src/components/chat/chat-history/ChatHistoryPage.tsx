"use client";

import { useState, useEffect } from "react";
import { ChatHistoryEntry } from "./ChatHistoryEntry";
import { DeleteConfirmModal } from "../../ui/modals/DeleteConfirmModal";
import { chatHistoryApi } from "@/lib/api";

interface ChatHistoryItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

// Helper to format timestamp
const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};

// Helper to get title from question
const getTitleFromQuestion = (question: string): string => {
  if (question.length > 50) {
    return question.substring(0, 50) + "...";
  }
  return question;
};

// Helper to get description from answer
const getDescriptionFromAnswer = (answer: string): string => {
  // Extract first meaningful sentence from answer
  const lines = answer.split('\n').filter(l => l.trim());
  for (const line of lines) {
    if (line.startsWith('Citation:') || line.startsWith('Verbatim:') || line.startsWith('Summary:')) {
      const content = line.replace(/^(Citation|Verbatim|Summary):\s*/, '').trim();
      if (content && content.length > 20) {
        return content.substring(0, 50) + "...";
      }
    }
  }
  // Fallback to first 50 chars of answer
  return answer.substring(0, 50) + "...";
};

export const ChatHistoryPage = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    chatId: string | null;
    chatTitle: string;
  }>({
    isOpen: false,
    chatId: null,
    chatTitle: "",
  });

  useEffect(() => {
    const fetchChatHistory = async () => {
      setLoading(true);
      const response = await chatHistoryApi.getChats();
      if (response.success && response.data) {
        const formattedChats: ChatHistoryItem[] = response.data.map((chat: { chatId: string; question: string; answer: string; timestamp: string | Date }) => ({
          id: chat.chatId,
          title: getTitleFromQuestion(chat.question),
          description: getDescriptionFromAnswer(chat.answer),
          timestamp: formatTimestamp(new Date(chat.timestamp)),
        }));
        setChatHistory(formattedChats);
      }
      setLoading(false);
    };

    fetchChatHistory();
  }, []);

  const handleDeleteClick = (chatId: string, chatTitle: string) => {
    setDeleteModal({
      isOpen: true,
      chatId,
      chatTitle,
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.chatId) {
      const response = await chatHistoryApi.deleteChat(deleteModal.chatId);
      if (response.success) {
        setChatHistory(prev => prev.filter(chat => chat.id !== deleteModal.chatId));
      }
      setDeleteModal({
        isOpen: false,
        chatId: null,
        chatTitle: "",
      });
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
        {loading ? (
          <div className="text-sm text-text-gray">Loading chat history...</div>
        ) : chatHistory.length === 0 ? (
          <div className="text-sm text-text-gray">No chat history found. Start a conversation to see your chats here.</div>
        ) : (
          <div className="space-y-3">
            {chatHistory.map((chat) => (
              <ChatHistoryEntry 
                key={chat.id} 
                chat={chat}
                onDelete={() => handleDeleteClick(chat.id, chat.title)}
                onClick={() => {
                  // Handle chat selection
                }}
              />
            ))}
          </div>
        )}
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
