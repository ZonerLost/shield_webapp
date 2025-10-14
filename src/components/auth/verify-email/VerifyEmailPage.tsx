'use client';

import { AuthImage } from '../AuthImage';
import { VerifyEmailForm } from './VerifyEmailForm';

export const VerifyEmailPage = () => {

  return (
    <div className="h-screen flex flex-col lg:flex-row font-dm-sans">

      {/* Auth Image */}
      <AuthImage variant="desktop" />

      {/* Form Section */}
      <div className="flex-1 lg:h-screen lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full h-full sm:h-auto max-w-md">
          <VerifyEmailForm />
        </div>
      </div>
    </div>
  );
};
