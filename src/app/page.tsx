import { HeroSection } from '@/components/sections/HeroSection';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { RecognitionSection } from '@/components/sections/RecognitionSection';
import { ContactCTASection } from '@/components/sections/ContactCTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <SelectedWorkSection />
      <CapabilitiesSection />
      <RecognitionSection />
      <ContactCTASection />
    </>
  );
}
