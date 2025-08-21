import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onGetStarted: () => void;
  onContactUs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onContactUs }) => {
  const { t, isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden hero-with-dots">
      {/* Animated Dotted Background */}
      <div className="animated-dots-background">
        <div className="dots-container">
          {/* Generate dots programmatically via CSS */}
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
          <div className="dot dot-4"></div>
          <div className="dot dot-5"></div>
          <div className="dot dot-6"></div>
          <div className="dot dot-7"></div>
          <div className="dot dot-8"></div>
          <div className="dot dot-9"></div>
          <div className="dot dot-10"></div>
          <div className="dot dot-11"></div>
          <div className="dot dot-12"></div>
          <div className="dot dot-13"></div>
          <div className="dot dot-14"></div>
          <div className="dot dot-15"></div>
          <div className="dot dot-16"></div>
          <div className="dot dot-17"></div>
          <div className="dot dot-18"></div>
          <div className="dot dot-19"></div>
          <div className="dot dot-20"></div>
        </div>
      </div>

      {/* AI Neural Network Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Neural Network Nodes */}
        <div className="ai-neural-network">
          {/* Primary Nodes */}
          <div className="neural-node node-1"></div>
          <div className="neural-node node-2"></div>
          <div className="neural-node node-3"></div>
          <div className="neural-node node-4"></div>
          <div className="neural-node node-5"></div>
          <div className="neural-node node-6"></div>
          <div className="neural-node node-7"></div>
          <div className="neural-node node-8"></div>
          
          {/* Connecting Lines */}
          <div className="neural-connection connection-1"></div>
          <div className="neural-connection connection-2"></div>
          <div className="neural-connection connection-3"></div>
          <div className="neural-connection connection-4"></div>
          <div className="neural-connection connection-5"></div>
          <div className="neural-connection connection-6"></div>
        </div>

        {/* Floating Data Particles */}
        <div className="data-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>

        {/* AI Brain Visualization */}
        <div className="ai-brain-container">
          <div className="ai-brain-core"></div>
          <div className="ai-brain-ring ring-1"></div>
          <div className="ai-brain-ring ring-2"></div>
          <div className="ai-brain-ring ring-3"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse"> {/* Swapped to lg:flex-row-reverse */}
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className={`inline-flex items-center px-6 py-3 glass-card text-green-300 text-sm font-medium mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${isRTL ? 'font-arabic' : ''}`}>
              {t('hero.badge')}
            </div>

            {/* Main Content */}
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {/* Main Headline */}
              <h1 className={`hero-title mb-8 ${isRTL ? 'font-arabic' : ''}`}>
                {t('hero.newTitle')}
              </h1>
              
              <p className={`subtitle mb-12 ${isRTL ? 'font-arabic' : ''}`}>
                {t('hero.newSubtitle')}
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'lg:justify-start' : 'lg:justify-start'} justify-center items-center mb-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <Button 
                  onClick={onContactUs}
                  className={`btn-primary px-6 py-3 text-base font-semibold ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t('hero.contactUs')}
                </Button>
                
                <Button 
                  onClick={onGetStarted}
                  className={`btn-outline px-6 py-3 text-base font-semibold ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t('hero.ourServices')}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Animation Space (Hidden on mobile, visible on desktop) */}
          <div className="hidden lg:block relative">
            <div className="ai-animation-container">
              {/* Central AI Hub */}
              <div className="ai-hub">
                <div className="ai-hub-core"></div>
                <div className="ai-hub-pulse"></div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="ai-orbit orbit-1">
                <div className="orbit-element"></div>
              </div>
              <div className="ai-orbit orbit-2">
                <div className="orbit-element"></div>
              </div>
              <div className="ai-orbit orbit-3">
                <div className="orbit-element"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};