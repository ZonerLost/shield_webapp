'use client';

import { AuthImage } from '../AuthImage';
import { RoleSetupForm } from './RoleSetupForm';

export const RoleSetupPage = () => {

  return (
    <div className="h-screen flex flex-col lg:flex-row font-dm-sans">
      {/* Auth Image */}
      <AuthImage variant="desktop" />

      {/* Role Setup Form Section */}
      <div className="flex-1 lg:h-screen lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full h-full sm:h-auto max-w-md">
          <RoleSetupForm />
        </div>
      </div>
    </div>
  );
};
