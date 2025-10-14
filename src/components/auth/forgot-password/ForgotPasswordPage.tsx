import { AuthImage } from '../AuthImage';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const ForgotPasswordPage = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row font-dm-sans">
      {/* Background Section */}
      <AuthImage variant="desktop" />

      {/* Forgot Password Form Section */}
      <div className="flex-1 lg:h-screen lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full h-full sm:h-auto max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};
