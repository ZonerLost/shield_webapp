interface WelcomeSectionProps {
  userName: string;
}

export const WelcomeSection = ({ userName }: WelcomeSectionProps) => {
  return (
    <div className="py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-blue-primary font-dm-sans leading-tight">
        Welcome, {userName}
      </h1>
    </div>
  );
};
