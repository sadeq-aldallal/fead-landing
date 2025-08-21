import React from 'react';
import { useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'profile'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showContactModal, setShowContactModal] = useState(false);
  const { user, loading, initialized } = useAuth();

  // Auto-redirect to dashboard when user logs in
  useEffect(() => {
    if (user && currentPage === 'home') {
      setCurrentPage('dashboard');
    } else if (!user && currentPage !== 'home') {
      setCurrentPage('home');
    }
  }, [user, currentPage]);

  const handleLoginClick = () => {
    setAuthModalMode('signin');
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setAuthModalMode('signup');
    setShowAuthModal(true);
  };

  // Show loading while auth is initializing
  if (!initialized || loading) {
    return (
      <div className="dark-gradient-bg min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  // Show user profile
  if (currentPage === 'profile') {
    return (
      <ProtectedRoute>
        <div className="relative">
          <button
            onClick={() => setCurrentPage('dashboard')}
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
  if (currentPage === 'dashboard' && user) {
    return (
      <ProtectedRoute>
        <div className="dark-gradient-bg min-h-screen">
          <Navigation 
            onLoginClick={handleLoginClick}
            onSignupClick={handleSignupClick}
            onDashboardClick={() => setCurrentPage('dashboard')}
            onProfileClick={() => setCurrentPage('profile')}
            onHomeClick={() => setCurrentPage('home')}
            currentPage={currentPage}
          />
          <Dashboard onBack={() => setCurrentPage('home')} />
        </div>
      </ProtectedRoute>
    );
  }

  // Main landing page
  return (
    <div className="dark-gradient-bg min-h-screen">
      <Navigation 
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
        onDashboardClick={() => setCurrentPage('dashboard')}
        onProfileClick={() => setCurrentPage('profile')}
        onHomeClick={() => setCurrentPage('home')}
        currentPage={currentPage}
      />
      
      <HeroSection 
        onGetStarted={handleSignupClick}
        onContactUs={() => setShowContactModal(true)}
      />
      <PainPointsSection />
      <SolutionSection />
      <AboutSection />
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultMode={authModalMode}
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