import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import CategoriesSection from '../components/CategoriesSection';
import DoctorsPreview from '../components/DoctorsPreview';
import TestimonialsSection from '../components/TestimonialsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CategoriesSection />
      <DoctorsPreview />
      <TestimonialsSection />
    </>
  );
}
