import React from 'react';
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
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
import { UserProfile } from './components/auth/UserProfile';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const AppContent: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, loading, initialized } = useAuth();

  // Show loading while auth is initializing
  if (!initialized || loading) {
    return (
      <div className="dark-gradient-bg min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  // Show user profile
  if (showProfile) {
    return (
      <ProtectedRoute>
        <div className="relative">
          <button
            onClick={() => setShowProfile(false)}
            className="fixed top-4 left-4 z-50 glass-card px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
          >
            ← Back
          </button>
          <UserProfile />
        </div>
      </ProtectedRoute>
    );
  }

  // Show dashboard
  if (showDashboard && user) {
    return (
      <ProtectedRoute>
        <Dashboard onBack={() => setShowDashboard(false)} />
      </ProtectedRoute>
    );
  }

  // Main landing page
  return (
    <div className="dark-gradient-bg min-h-screen">
      <Navigation 
        onAuthClick={() => setShowAuthModal(true)}
        onDashboardClick={() => setShowDashboard(true)}
        onProfileClick={() => setShowProfile(true)}
      />
      
      <HeroSection 
        onGetStarted={() => setShowAuthModal(true)}
        onContactUs={() => setShowContactModal(true)}
      />
      <PainPointsSection />
      <SolutionSection />
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