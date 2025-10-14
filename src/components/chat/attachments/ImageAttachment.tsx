"use client";

import Image from "next/image";

interface ImageAttachmentProps {
  image: {
    name: string;
    url: string;
    size: number;
  };
}

export const ImageAttachment = ({ image }: ImageAttachmentProps) => {
  return (
    <div className="mb-2">
      <div className="relative rounded-lg overflow-hidden border border-gray-200">
        <Image
          src={image.url}
          alt={image.name}
          width={300}
          height={200}
          className="w-full h-auto max-w-sm"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};
