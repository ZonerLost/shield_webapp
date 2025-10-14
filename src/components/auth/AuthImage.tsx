import Image from 'next/image';

interface AuthImageProps {
  variant?: 'mobile' | 'desktop';
  src?: string;
}

export const AuthImage = ({ variant = 'mobile', src = '/auth.png' }: AuthImageProps) => {
  if (variant === 'desktop') {
    return (
      <div className="h-1/3 sm:h-auto lg:h-screen lg:w-1/2 relative overflow-hidden bg-blue-primary">
        <div className="absolute inset-0">
          <Image
            src={src}
            alt="Auth background"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 sm:h-80 bg-light-gray flex items-center justify-center">
      <Image
        src={src}
        alt="Authentication"
        width={300}
        height={300}
        className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
      />
    </div>
  );
};
