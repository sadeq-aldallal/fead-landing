import React from 'react';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
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
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { OrganizationView } from './components/dashboard/OrganizationView';
import { BusinessView } from './components/dashboard/BusinessView';
import { OrganizationModal } from './components/modals/OrganizationModal';
import { UserProfile } from './components/auth/UserProfile';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useDashboard } from './contexts/DashboardContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'profile' | 'privacy-policy' | 'terms-and-conditions' | 'account-deletion-policy'>('home');
  const [dashboardView, setDashboardView] = useState<'organization' | 'business'>('organization');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);
  const { user, loading, initialized } = useAuth();
  const { organization, loading: dashboardLoading } = useDashboard();

  // Handle URL-based routing for legal pages
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/privacy-policy') {
      setCurrentPage('privacy-policy');
    } else if (path === '/terms-and-conditions') {
      setCurrentPage('terms-and-conditions');
    } else if (path === '/account-deletion-policy') {
      setCurrentPage('account-deletion-policy');
    }
  }, []);

  // Update URL when page changes
  useEffect(() => {
    const path = currentPage === 'home' ? '/' : `/${currentPage}`;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [currentPage]);

  // Auto-redirect to dashboard when user logs in
  useEffect(() => {
    if (user && currentPage === 'home') {
      setCurrentPage('dashboard');
    } else if (!user && currentPage !== 'home') {
      setCurrentPage('home');
    }
  }, [user, currentPage]);

  // Check for organization and show modal if needed
  useEffect(() => {
    if (user && currentPage === 'dashboard' && !dashboardLoading && !organization) {
      setShowOrganizationModal(true);
    }
  }, [user, currentPage, dashboardLoading, organization]);
  const handleLoginClick = () => {
    setAuthModalMode('signin');
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setAuthModalMode('signup');
    setShowAuthModal(true);
  };

  const handleNavigateToLegalPage = (page: 'privacy-policy' | 'terms-and-conditions' | 'account-deletion-policy') => {
    setCurrentPage(page);
  };
  // Show loading while auth is initializing
  if (!initialized || loading) {
    return (
      <div className="dark-gradient-bg min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  // Show legal pages (not protected)
  if (currentPage === 'privacy-policy') {
    return (
      <div className="dark-gradient-bg">
        <Navigation 
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
          onDashboardClick={() => setCurrentPage('dashboard')}
          onProfileClick={() => setCurrentPage('profile')}
          onHomeClick={() => setCurrentPage('home')}
          currentPage={currentPage}
        />
        <PrivacyPolicy />
      </div>
    );
  }

  if (currentPage === 'terms-and-conditions') {
    return (
      <div className="dark-gradient-bg">
        <Navigation 
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
          onDashboardClick={() => setCurrentPage('dashboard')}
          onProfileClick={() => setCurrentPage('profile')}
          onHomeClick={() => setCurrentPage('home')}
          currentPage={currentPage}
        />
        <TermsAndConditions />
      </div>
    );
  }

  if (currentPage === 'account-deletion-policy') {
    return (
      <div className="dark-gradient-bg">
        <Navigation 
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
          onDashboardClick={() => setCurrentPage('dashboard')}
          onProfileClick={() => setCurrentPage('profile')}
          onHomeClick={() => setCurrentPage('home')}
          currentPage={currentPage}
        />
        <AccountDeletionPolicy />
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
        <DashboardLayout
          currentView={dashboardView}
          onViewChange={setDashboardView}
          breadcrumbs={[
            { label: 'Dashboard', href: '#' },
            { label: dashboardView === 'organization' ? 'Organization' : 'Business', current: true }
          ]}
        >
          {dashboardView === 'organization' ? <OrganizationView /> : <BusinessView />}
        </DashboardLayout>
        
        <OrganizationModal
          isOpen={showOrganizationModal}
          onClose={() => {
            setShowOrganizationModal(false);
            // If user closes modal without creating org, redirect to home
            if (!organization) {
              setCurrentPage('home');
            }
          }}
        />
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
      <Footer 
        onPrivacyClick={() => setCurrentPage('privacy-policy')}
        onTermsClick={() => setCurrentPage('terms-and-conditions')}
        onAccountDeletionClick={() => setCurrentPage('account-deletion-policy')}
      />
      
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
      <DashboardProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;