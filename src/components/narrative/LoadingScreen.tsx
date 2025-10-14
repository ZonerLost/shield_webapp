'use client';

import { Button } from '../ui/Button';
import { EllipsisIcon } from '../ui/Icons';

interface LoadingScreenProps {
  onStop: () => void;
}

export const LoadingScreen = ({ onStop }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {/* Ellipsis Icon with Animation and Gaussian Blur */}
      <div className="relative mb-8">
        {/* Gaussian Blur around Ellipsis */}
        <div className="absolute inset-0 w-16 h-16 bg-white/40 rounded-full blur-xl animate-pulse"></div>
        <div className="relative animate-pulse">
          <EllipsisIcon />
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 font-dm-sans mb-4">
          Generating...
        </h2>
        <p className="text-lg text-gray-600 font-dm-sans leading-relaxed">
          Please wait ~8 seconds while Shield AI<br />
          expands your notes.
        </p>
      </div>

      {/* Full Width Stop Button Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 w-full flex justify-center items-center">
        <Button
          variant="badge"
          size="md"
          onClick={onStop}
          className="w-full"
        >
          Stop
        </Button>
      </div>
    </div>
  );
};
