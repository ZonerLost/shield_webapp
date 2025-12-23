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
  // Parse the content to format the 3 paragraphs properly (no headings)
  const formatContent = (content: string) => {
    // Remove any heading labels that might be present
    const cleanedContent = content
      .replace(/^Citation:\s*/gmi, '')
      .replace(/^Verbatim:\s*/gmi, '')
      .replace(/^Summary:\s*/gmi, '')
      .replace(/^VERBATIM TEXT:\s*/gmi, '')
      .replace(/^PLAIN ENGLISH SUMMARY:\s*/gmi, '')
      .replace(/^CITATION:\s*/gmi, '')
      .trim();
    
    // Split by paragraphs (double newlines)
    const parts = cleanedContent.split(/\n\n+/).filter(p => p.trim());
    
    return parts.map((part, index) => {
      const trimmed = part.trim();
      
      // First paragraph: Citation (regular text)
      if (index === 0) {
        return (
          <p key={index} className="text-sm font-medium text-text-gray font-dm-sans mb-4">
            {formatBoldText(trimmed)}
          </p>
        );
      }
      // Second paragraph: Verbatim (italic, styled)
      else if (index === 1) {
        return (
          <p key={index} className="text-sm font-medium text-text-gray font-dm-sans italic bg-light-gray/50 px-3 py-2 rounded border-l-2 border-blue-primary mb-4">
            {trimmed}
          </p>
        );
      }
      // Third paragraph: Summary (with bold formatting)
      else if (index === 2) {
        return (
          <p key={index} className="text-sm font-medium text-text-gray font-dm-sans mb-2">
            {formatBoldText(trimmed)}
          </p>
        );
      }
      // Any additional paragraphs
      else {
        return (
          <p key={index} className="text-sm font-medium text-text-gray font-dm-sans mb-2 whitespace-pre-wrap">
            {formatBoldText(trimmed)}
          </p>
        );
      }
    });
  };

  // Format markdown bold (**text**) to HTML
  const formatBoldText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={i} className="font-bold text-dark-blue">{boldText}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start space-x-2 max-w-2xl lg:max-w-3xl">
        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
          <Logo className="filter invert h-6 w-6"/>
        </div>
        <div className="bg-chat-bg text-text-gray px-4 py-3 rounded-2xl rounded-bl-md border border-placeholder-gray/20 min-w-0 flex-1">
          <div className="text-sm font-medium font-dm-sans">
            {formatContent(message.content)}
          </div>
        </div>
      </div>
    </div>
  );
};
