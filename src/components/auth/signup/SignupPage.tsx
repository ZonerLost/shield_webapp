'use client';

import { AuthImage } from '../AuthImage';
import { SignupForm } from './SignupForm';

export const SignupPage = () => {

  return (
    <div className="h-screen flex flex-col lg:flex-row font-dm-sans">
      {/* Background Section */}
      <AuthImage variant="desktop" />

      {/* Signup Form Section */}
      <div className="flex-1 lg:h-screen lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full h-full sm:h-auto max-w-md">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};
