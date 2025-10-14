'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {TextIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { TextArea } from '../ui/TextArea';
import { LoadingScreen } from '../narrative/LoadingScreen';

export const SMFBuilderPage = () => {
  const router = useRouter();
  const [narrative, setNarrative] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!narrative.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate SMF generation process
    setTimeout(() => {
      setIsGenerating(false);
      router.push('/draft-statement');
    }, 8000); // 8 second delay like narrative generator
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
  };

  if (isGenerating) {
    return <LoadingScreen onStop={handleStopGeneration} />;
  }

  return (
    <div className="bg-white font-dm-sans flex flex-col px-6 py-8 pb-24">

      {/* Main Content */}
      <div className="flex-1 ">
        <div className="max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="text-left mb-8">
            <h1 className="text-2xl font-bold text-blue-primary font-dm-sans">
              Statement of Material Facts Builder
            </h1>
            <p className="text-lg font-medium text-text-gray font-dm-sans">
              Convert narratives into court-ready SMFs
            </p>
          </div>

          {/* Narrative Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="">
                <TextArea
                  icon={<TextIcon />}
                  label="Narrative"
                  placeholder="Aa Paste narrative here..."
                  value={narrative}
                  onChange={setNarrative}
                  className="min-h-[200px] resize-none border-none bg-transparent p-0 text-sm font-medium text-blue-primary placeholder-placeholder-gray"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-placeholder-gray/20 p-4">
            <div className="max-w-2xl mx-auto">
              <Button
                variant="badge"
                size="lg"
                onClick={handleGenerate}
                disabled={!narrative.trim()}
                className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-4 font-medium font-dm-sans disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Generate Statement
              </Button>
            </div>
          </div>
      </div>
  );
};
