'use client';

import { useState, useRef, useEffect } from 'react';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const OTPInput = ({ length = 6, value, onChange, error }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Update internal state when value prop changes
    const newOtp = value.split('').slice(0, length);
    const paddedOtp = [...newOtp, ...new Array(length - newOtp.length).fill('')];
    setOtp(paddedOtp);
  }, [value, length]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Update parent component
    onChange(newOtp.join(''));

    // Focus next input
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const newOtp = pastedData.split('');
    const paddedOtp = [...newOtp, ...new Array(length - newOtp.length).fill('')];
    setOtp(paddedOtp);
    onChange(paddedOtp.join(''));
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(newOtp.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-center space-x-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-12 h-12 text-center text-text-gray text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary transition-colors ${
              error
                ? 'border-error-red bg-red-50'
                : 'border-placeholder-gray bg-white focus:border-blue-primary'
            }`}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500 font-dm-sans text-center">{error}</p>
      )}
    </div>
  );
};
