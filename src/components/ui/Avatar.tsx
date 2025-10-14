"use client";

import Image from "next/image";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
  "2xl": "w-20 h-20 text-xl",
  "3xl": "w-32 h-32 text-xl",
  "4xl": "w-40 h-40 text-2xl",
};

export const Avatar = ({ 
  name, 
  src = "/avatar.png", 
  size = "md", 
  className = "" 
}: AvatarProps) => {
  const sizeClass = sizeClasses[size];
  
  // Generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`${sizeClass} rounded-full overflow-hidden bg-placeholder-gray/20 flex-shrink-0 ${className}`}>
      {src ? (
        <Image 
          src={src}
          alt={name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
          priority={size === "lg" || size === "xl" || size === "2xl" || size === "3xl" || size === "4xl"}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-blue-primary/10">
          <span className="text-blue-primary font-semibold font-dm-sans">
            {getInitials(name)}
          </span>
        </div>
      )}
    </div>
  );
};
