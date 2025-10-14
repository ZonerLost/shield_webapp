"use client";

import { Logo } from "../../ui/Icons";

export const LoadingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
          <Logo className="filter invert h-6 w-6"/>
        </div>
        <div className="bg-light-gray text-dark-blue px-4 py-3 rounded-2xl rounded-bl-md border border-placeholder-gray/20">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-text-gray rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-text-gray rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-text-gray rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
