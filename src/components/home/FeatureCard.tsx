"use client";

import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  onClick?: () => void;
}

export const FeatureCard = ({
  title,
  description,
  imageSrc,
  imageAlt,
  onClick,
}: FeatureCardProps) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-placeholder-gray p-4 sm:p-6 cursor-pointer hover:shadow-md active:scale-[0.98] transition-all duration-200 touch-manipulation h-full flex flex-col"
      onClick={onClick}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg flex items-center justify-center overflow-hidden relative">
            <div 
              className="absolute inset-0 bg-white rounded-lg"
              style={{ zIndex: 1 }}
            />
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={300}
              height={300}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain scale-300 sm:scale-350 relative"
              style={{ zIndex: 2 }}
            />
          </div>
        </div>
        
        <div className="space-y-2 text-left">
          <h3 className="text-base sm:text-lg font-bold text-blue-primary font-dm-sans leading-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-text-gray font-dm-sans leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
