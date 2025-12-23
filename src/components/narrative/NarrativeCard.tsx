'use client';

import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, CopyIcon, TextIcon } from '../ui/Icons';

interface NarrativeCardProps {
  title: string;
  content: string;
  onApprove: () => void;
  onReject: () => void;
  onCopy: () => void;
  showActions?: boolean;
}

export const NarrativeCard = ({ 
  title, 
  content, 
  onApprove, 
  onReject, 
  onCopy,
  showActions = true
}: NarrativeCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  // Remove asterisks from headings for clean copy
  const cleanContentForCopy = (text: string) => {
    return text.replace(/\*\*\*(.+?)\*\*\*/g, '$1');
  };

  const handleCopy = () => {
    // Copy the cleaned content without asterisks
    const cleanedContent = cleanContentForCopy(content);
    navigator.clipboard.writeText(cleanedContent);
    onCopy();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Format narrative content: Replace ***Heading*** with properly styled headings
  const formatNarrativeContent = (text: string) => {
    // Split by headings wrapped in triple asterisks
    const parts = text.split(/(\*\*\*[^*]+\*\*\*)/g);
    
    return parts.map((part, index) => {
      // Check if this part is a heading (wrapped in ***)
      const headingMatch = part.match(/^\*\*\*(.+?)\*\*\*$/);
      if (headingMatch) {
        const headingText = headingMatch[1].trim();
        return (
          <div key={index} className="mt-4 first:mt-0">
            <h4 className="text-base font-bold text-dark-blue font-dm-sans mb-2">
              {headingText}
            </h4>
          </div>
        );
      }
      // Regular text content
      if (part.trim()) {
        return (
          <p key={index} className="text-sm font-medium text-text-gray font-dm-sans mb-3 whitespace-pre-wrap">
            {part.trim()}
          </p>
        );
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <div className="">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-blue-primary font-dm-sans">
          {title}
        </h3>
        {showActions && (
          <div className="flex items-center space-x-2">
            <button
              onClick={onApprove}
              className=""
            >
              <CheckCircleIcon />
            </button>
            <button
              onClick={onReject}
              className=""
            >
              <XCircleIcon />
            </button>
          </div>
        )}
      </div>

      {/* Content Box */}
      <div className="bg-light-gray flex items-start gap-2 rounded-xl p-4 border border-placeholder-gray/20 relative">
        <div>
        <TextIcon />
        </div>
        <div className="flex-1">
          {formatNarrativeContent(content)}
        </div>
        
         {/* Copy Icon */}
         <button
           onClick={handleCopy}
           className={`mt-auto p-1 rounded-lg transition-all duration-300 `}
         >
           <div className={`relative transition-all duration-300`}>
             {isCopied ? (
               <div className="animate-pulse">
                 <svg
                   width="20"
                   height="20"
                   viewBox="0 0 20 20"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <rect width="20" height="20" rx="4" fill="#475569" />
                   <path
                     d="M6.66667 10L8.33333 11.6667L13.3333 6.66667"
                     stroke="white"
                     strokeWidth="1.66667"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                   />
                 </svg>
               </div>
             ) : (
               <CopyIcon />
             )}
           </div>
         </button>
      </div>
    </div>
  );
};
