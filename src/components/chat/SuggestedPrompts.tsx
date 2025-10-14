"use client";

import { CarIcon, SecurityCameraIcon, ScaleIcon, DocumentIcon, GavelIcon, PersonIcon, HamburgerIcon } from "./PromptIcons";

interface SuggestedPrompt {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const suggestedPrompts: SuggestedPrompt[] = [
  { text: "to search a vehicle?", icon: CarIcon },
  { text: "Explain Section 61 Criminal Code.", icon: SecurityCameraIcon },
  { text: "rights quickly.", icon: ScaleIcon },
  { text: "Do I need a warrant here?", icon: DocumentIcon },
  { text: "When can I issue...", icon: GavelIcon },
  { text: "Criminal Code.", icon: SecurityCameraIcon },
  { text: "What's the penalty for trespass?", icon: PersonIcon },
  { text: "Summary", icon: HamburgerIcon },
  { text: "trespass?", icon: PersonIcon },
  { text: "When can I issue a caution?", icon: GavelIcon },
  { text: "Do I need a...", icon: DocumentIcon },
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
      
      {/* Grid layout with 4 rows - all items visible */}
      <div className="grid grid-rows-4 gap-3 overflow-x-auto pb-4 hide-scrollbar">
        {/* Row 1 */}
        <div className="flex space-x-3 min-w-max">
          {suggestedPrompts.slice(0, 3).map((prompt, index) => (
            <button
              key={index}
              onClick={() => onPromptClick(prompt.text)}
              className="flex-shrink-0 flex items-center space-x-2 bg-light-gray rounded-full px-4 py-2 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors"
            >
              <prompt.icon className="w-4 h-4 text-dark-blue" />
              <span className="text-sm font-medium text-dark-blue font-dm-sans">
                {prompt.text}
              </span>
            </button>
          ))}
          {/* Desktop: Add more items */}
          <div className="hidden lg:flex space-x-3">
            {suggestedPrompts.slice(3, 5).map((prompt, index) => (
              <button
                key={index + 3}
                onClick={() => onPromptClick(prompt.text)}
                className="flex-shrink-0 flex items-center space-x-2 bg-light-gray rounded-full px-4 py-2 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors"
              >
                <prompt.icon className="w-4 h-4 text-dark-blue" />
                <span className="text-sm font-medium text-dark-blue font-dm-sans">
                  {prompt.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex space-x-3 min-w-max">
          {suggestedPrompts.slice(3, 6).map((prompt, index) => (
            <button
              key={index + 3}
              onClick={() => onPromptClick(prompt.text)}
              className="flex-shrink-0 flex items-center space-x-2 bg-light-gray rounded-full px-4 py-2 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors"
            >
              <prompt.icon className="w-4 h-4 text-dark-blue" />
              <span className="text-sm font-medium text-dark-blue font-dm-sans">
                {prompt.text}
              </span>
            </button>
          ))}
          {/* Desktop: Add more items */}
          <div className="hidden lg:flex space-x-3">
            {suggestedPrompts.slice(8, 10).map((prompt, index) => (
              <button
                key={index + 8}
                onClick={() => onPromptClick(prompt.text)}
                className="flex-shrink-0 flex items-center space-x-2 bg-light-gray rounded-full px-4 py-2 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors"
              >
                <prompt.icon className="w-4 h-4 text-dark-blue" />
                <span className="text-sm font-medium text-dark-blue font-dm-sans">
                  {prompt.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex space-x-3 min-w-max">
          {suggestedPrompts.slice(6, 9).map((prompt, index) => (
            <button
              key={index + 6}
              onClick={() => onPromptClick(prompt.text)}
              className="flex-shrink-0 flex items-center space-x-2 bg-light-gray rounded-full px-4 py-2 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors"
            >
              <prompt.icon className="w-4 h-4 text-dark-blue" />
              <span className="text-sm font-medium text-dark-blue font-dm-sans">
                {prompt.text}
              </span>
            </button>
          ))}
          {/* Desktop: Add more items */}
          <div className="hidden lg:flex space-x-3">
            {suggestedPrompts.slice(0, 2).map((prompt, index) => (
              <button
                key={`extra-${index}`}
                onClick={() => onPromptClick(prompt.text)}
                className="flex-shrink-0 flex items-center space-x-2 bg-light-gray rounded-full px-4 py-2 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors"
              >
                <prompt.icon className="w-4 h-4 text-dark-blue" />
                <span className="text-sm font-medium text-dark-blue font-dm-sans">
                  {prompt.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex space-x-3 min-w-max">
          {suggestedPrompts.slice(9, 11).map((prompt, index) => (
            <button
              key={index + 9}
              onClick={() => onPromptClick(prompt.text)}
              className="flex-shrink-0 flex items-center space-x-2 bg-light-gray rounded-full px-4 py-2 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors"
            >
              <prompt.icon className="w-4 h-4 text-dark-blue" />
              <span className="text-sm font-medium text-dark-blue font-dm-sans">
                {prompt.text}
              </span>
            </button>
          ))}
          {/* Desktop: Add more items */}
          <div className="hidden lg:flex space-x-3">
            {suggestedPrompts.slice(2, 5).map((prompt, index) => (
              <button
                key={`desktop-${index}`}
                onClick={() => onPromptClick(prompt.text)}
                className="flex-shrink-0 flex items-center space-x-2 bg-light-gray rounded-full px-4 py-2 border border-placeholder-gray/20 hover:bg-placeholder-gray/10 transition-colors"
              >
                <prompt.icon className="w-4 h-4 text-dark-blue" />
                <span className="text-sm font-medium text-dark-blue font-dm-sans">
                  {prompt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
