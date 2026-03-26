
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import Sponsors from '@/components/Sponsors';
import InterestForm from '@/components/InterestForm';
import Footer from '@/components/Footer';
import ConferencePosterPopup from '@/components/ConferencePosterPopup';

const Index = () => {
  // Lock scrollbar on page load and smoothly enable it
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Enable smooth scrolling after initial render
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
    }, 800);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-ubc-blue">
      <Header />
      <ConferencePosterPopup />
      <HeroSection />
      <MissionSection />
      <CapabilitiesSection />
      <Sponsors />
      <InterestForm />
      <Footer />
    </div>
  );
};

export default Index;
