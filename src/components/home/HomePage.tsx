"use client";

import { useRouter } from "next/navigation";
import { FeatureCard } from "./FeatureCard";
import { WelcomeSection } from "./WelcomeSection";


export const HomePage = () => {
  const router = useRouter();
  
  const handleCardClick = (feature: string) => {
    console.log(`Clicked on ${feature}`);
    
    // Handle navigation to specific feature
    if (feature === "Narrative Generator") {
      router.push("/narrative-generator");
    } else if (feature === "SMF Builder") {
      router.push("/smf-builder");
    }
    // Shield Nexus navigation can be added later
  };

  return (
    <div className="bg-white px-6">
      {/* Welcome Section */}
      <WelcomeSection userName="Kashan" />

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
