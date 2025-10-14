interface NotificationsHeaderProps {
  title?: string;
  subtitle?: string;
}

export const NotificationsHeader = ({ 
  title = "Notifications",
  subtitle = "Stay updated on offers, redemptions, payouts, & account alerts."
}: NotificationsHeaderProps) => {
  return (
    <div className="py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-primary font-dm-sans leading-tight">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-text-gray font-dm-sans leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
