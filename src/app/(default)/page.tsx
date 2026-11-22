import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { HowItWorksSection } from "./_components/how-it-works-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </>
  );
}
