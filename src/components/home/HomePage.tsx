"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FeatureCard } from "./FeatureCard";
import { WelcomeSection } from "./WelcomeSection";


export const HomePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  
  useEffect(() => {
    // Get user info from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.fullName || 'User');
      } catch {
        setUserName('User');
      }
    } else {
      // If no user data, redirect to login
      router.push('/login');
    }
  }, [router]);
  
  const handleCardClick = (feature: string) => {
    
    // Handle navigation to specific feature
    if (feature === "Narrative Generator") {
      router.push("/narrative-generator");
    } else if (feature === "SMF Builder") {
      router.push("/smf-builder");
    } else if (feature === "Shield Nexus") {
      router.push("/chat");
    }
    // Shield Nexus navigation can be added later
  };

  // Don't render until we have user data
  if (!userName) {
    return null;
  }

  return (
    <div className="bg-white px-6">
      {/* Welcome Section */}
      <WelcomeSection userName={userName} />

      {/* Feature Cards */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            <FeatureCard
              title="Narrative Generator"
              description="Turn quick notes into polished incident narratives."
              imageSrc="/Narrative.png"
              imageAlt="Narrative Generator icon"
              onClick={() => handleCardClick("Narrative Generator")}
            />

            <FeatureCard
              title="Statement of Material Facts Builder"
              description="Convert narratives into court-ready SMFs."
              imageSrc="/SMF.png"
              imageAlt="Statement of Material Facts Builder icon"
              onClick={() => handleCardClick("SMF Builder")}
            />

            <FeatureCard
              title="Shield Nexus"
              description="Get fast answers to legislation questions."
              imageSrc="/Nexus.png"
              imageAlt="Shield Nexus icon"
              onClick={() => handleCardClick("Shield Nexus")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
