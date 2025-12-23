import Image from 'next/image';

interface AuthImageProps {
  variant?: 'mobile' | 'desktop';
  src?: string;
}

export const AuthImage = ({ variant = 'mobile', src = '/main-logo.png' }: AuthImageProps) => {
  if (variant === 'desktop') {
    return (
      <div className="h-1/3 sm:h-auto lg:h-screen lg:w-1/2 relative overflow-hidden bg-blue-primary flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <Image
            src={src}
            alt="Shield AI Logo"
            width={400}
            height={400}
            className="w-auto h-auto max-w-md max-h-md object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 sm:h-80 bg-light-gray flex items-center justify-center">
      <Image
        src={src}
        alt="Shield AI Logo"
        width={300}
        height={300}
        className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
      />
    </div>
  );
};
