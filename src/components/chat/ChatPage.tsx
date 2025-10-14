"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FeatureCards } from "./FeatureCards";
import { ChatInput } from "./ChatInput";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { ChatMessages } from "./messages/ChatMessages";

// Add hidden scrollbar styles
const scrollbarStyles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

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

interface ChatPageProps {
  documentId?: string;
  documentTitle?: string;
}

export const ChatPage = ({ }: ChatPageProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingMessage, setTypingMessage] = useState<string>("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  };

  // Auto-scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, typingMessage]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const handleSendMessage = async (previewFiles: { name: string; type: string; size: number; isImage: boolean; url?: string }[]) => {
    if (!inputValue.trim() && previewFiles.length === 0) return;

    // Convert preview files to attachments
    const files = previewFiles.filter(f => !f.isImage).map(f => ({
      name: f.name,
      type: f.type,
      size: f.size,
    }));

    const images = previewFiles.filter(f => f.isImage).map(f => ({
      name: f.name,
      url: f.url || '',
      size: f.size,
    }));

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      attachments: {
        files: files.length > 0 ? files : undefined,
        images: images.length > 0 ? images : undefined,
      },
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Scroll to bottom immediately when user sends message
    scrollToBottom();

    // Simulate AI response with real-time typing
    const fullResponse = "This is a simulated response. In a real implementation, this would be an AI-generated answer based on legal knowledge and the document context.";
    
    // Show loading indicator for 2 seconds before starting typing
    setTimeout(() => {
      // Start typing effect
      let currentIndex = 0;
      setTypingMessage("");
      
      // Scroll to show typing indicator
      scrollToBottom();
      
      // Clear any existing interval
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }

      typingIntervalRef.current = setInterval(() => {
        if (currentIndex < fullResponse.length) {
          setTypingMessage(fullResponse.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          // Typing complete, add final message
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: "assistant",
            content: fullResponse,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setTypingMessage("");
          setIsLoading(false);
        }
      }, 10); // 10ms delay between characters for faster typing
    }, 2000); // 2 second delay before starting typing
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage([]);
    }
  };


  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <div className="flex flex-col calc(100vh - 4rem) px-6 py-4 bg-white">
      {/* Chat Content Area */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto pb-24 min-h-0 hide-scrollbar"
        style={{ 
          scrollBehavior: 'smooth'
        }}
      >
        {messages.length === 0 ? (
          <>
            {/* Header Banner */}
            <div className="flex justify-center">
              <Image
                src="/chat.png"
                alt="Chat Header"
                width={1000}
                height={1000}
                className="sm:w-1/2"
              />
            </div>
            {/* Feature Cards */}
            <FeatureCards />
            <SuggestedPrompts onPromptClick={handlePromptClick} />
          </>
        ) : (
          <ChatMessages messages={messages} isLoading={isLoading} typingMessage={typingMessage} />
        )}
      </div>

      {/* Input Area */}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onKeyPress={handleKeyPress}
      />
      </div>
    </>
  );
};
