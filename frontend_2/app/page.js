import HeroSection from '@/components/HeroSection';
import WhatAreDeepfakes from '@/components/WhatAreDeepfakes';
import HowItWorks from '@/components/HowItWorks';
import RealWorldImpact from '@/components/RealWorldImpact';
import WhyChooseUs from '@/components/WhyChooseUs';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhatAreDeepfakes />
      <HowItWorks />
      <RealWorldImpact />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
    </div>
  );
}
