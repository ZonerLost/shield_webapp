"use client";

import { useState } from "react";
import { ArrowDownIcon } from "./Icons";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItemComponent = ({ item, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="bg-light-gray rounded-lg border border-placeholder-gray/20">
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-placeholder-gray/10 transition-colors duration-200 rounded-xl focus:outline-none"
      >
        <span className="text-md font-semibold text-blue-primary font-dm-sans pr-4">
          {item.question}
        </span>
        <ArrowDownIcon 
          className={`flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="">
            <p className="text-sm font-medium text-text-gray font-dm-sans leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const FAQ = ({ items, className = "" }: FAQProps) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // First item open by default

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <FAQItemComponent
          key={index}
          item={item}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};
