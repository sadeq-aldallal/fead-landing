import React from 'react';
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';
import { Navigation } from './components/layout/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { ClientLogosSection } from './components/sections/ClientLogosSection';
import { AboutSection } from './components/sections/AboutSection';
import { PainPointsSection } from './components/sections/PainPointsSection';
import { SolutionSection } from './components/sections/SolutionSection';
import { Footer } from './components/sections/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { ContactModal } from './components/modals/ContactModal';
import { Dashboard } from './components/dashboard/Dashboard';

const AppContent: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="dark-gradient-bg min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  if (showDashboard && isAuthenticated) {
    return <Dashboard onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="dark-gradient-bg min-h-screen">
      <Navigation 
        onAuthClick={() => setShowAuthModal(true)}
        onDashboardClick={() => setShowDashboard(true)}
      />
      
      <HeroSection 
        onGetStarted={() => setShowAuthModal(true)}
        onContactUs={() => setShowContactModal(true)}
      />
      <PainPointsSection />
      <SolutionSection />
      <ClientLogosSection />
      <AboutSection />
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;