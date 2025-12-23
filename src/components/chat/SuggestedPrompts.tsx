"use client";

import { DocumentIcon } from "./PromptIcons";

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

// Default icon for all prompts
const DefaultIcon = DocumentIcon;

// Static suggested prompts based on actual legislation data
const suggestedPrompts: string[] = [
  "What is the penalty for assault under Section 313?",
  "When can an authorised police officer grant bail?",
  "When can I search a vehicle without a warrant?",
  "What are my arrest powers?",
  "Do I need a warrant to enter premises?",
  "What's the penalty for assault?",
  "When can I use force during an arrest?",
  "Explain Section 317 of the Criminal Code",
  "What are the penalties for drink driving?",
  "When can I detain someone without arrest?",
  "What are my powers for welfare checks?",
  "Explain Section 61 of the Criminal Code",
];

export const SuggestedPrompts = ({ onPromptClick }: SuggestedPromptsProps) => {

  return (
    <div>
      <h2 className="text-xl font-semibold text-dark-blue font-dm-sans mb-6">
        Suggested Prompts
      </h2>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Grid layout - responsive */}
      <div className="flex flex-wrap gap-3 pb-4">
        {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
            onClick={() => onPromptClick(prompt)}
              className="flex-shrink-0 flex items-center space-x-2 bg-light-gray rounded-full px-4 py-2 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors"
            >
            <DefaultIcon className="w-4 h-4 text-dark-blue" />
              <span className="text-sm font-medium text-dark-blue font-dm-sans">
              {prompt}
                </span>
              </button>
            ))}
      </div>
    </div>
  );
};
