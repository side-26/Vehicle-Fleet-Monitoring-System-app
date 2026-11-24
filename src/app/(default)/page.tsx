import { AboutUsSection } from "./_components/about-us-section";
import { FaqSection } from "./_components/faq-section";
import { FeaturesSection } from "./_components/features-section";
import { FleetMapSection } from "./_components/fleet-map-section";
import { HeroSection } from "./_components/hero-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { PricingSection } from "./_components/pricing-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FleetMapSection apiKey={process.env.GEOAPIFY_API_KEY} />
      <PricingSection />
      <AboutUsSection />
      <FaqSection />
    </>
  );
}
