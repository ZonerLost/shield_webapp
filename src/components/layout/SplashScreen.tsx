import { Logo } from '../ui/Icons';

export const SplashScreen = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-dm-sans">
      <div className="flex flex-col items-center space-y-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Logo />
          <h1 className="text-4xl sm:text-5xl font-medium text-black tracking-tight font-dm-sans">
            ShieldSystems
          </h1>
        </div>
      </div>
    </div>
  );
};
