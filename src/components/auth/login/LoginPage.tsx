import { AuthImage } from '../AuthImage';
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row font-dm-sans">
      {/* Background Section */}
      <AuthImage variant="desktop" src="/login.png" />

      {/* Login Form Section */}
      <div className="flex-1 lg:h-screen lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full h-full sm:h-auto max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};