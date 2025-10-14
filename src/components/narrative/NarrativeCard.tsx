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

  const handleCopy = () => {
    onCopy();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
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
        <p className="text-sm font-medium text-text-gray font-dm-sans">
          {content}
        </p>
        
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
