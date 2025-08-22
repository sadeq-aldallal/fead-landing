import React from 'react';
import { useState, useEffect, useRef } from 'react';
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
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsAndConditions } from './components/pages/TermsAndConditions';
import { AccountDeletionPolicy } from './components/pages/AccountDeletionPolicy';
import { useDashboard } from './contexts/DashboardContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'profile' | 'privacy-policy' | 'terms-and-conditions' | 'account-deletion-policy'>('home');
  const [dashboardView, setDashboardView] = useState<'organization' | 'business'>('organization');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);
  const { user, loading, initialized } = useAuth();
  const { 
    organization, 
    businesses, 
    currentBusiness, 
    loading: dashboardLoading, 
    processInstagramCode,
    setCurrentBusiness 
  } = useDashboard();
  
  // Ref to track if OAuth code has been processed to prevent duplicate processing
  const processedOAuthCodeRef = useRef(false);
  
  // Centralized Instagram OAuth callback handling
  useEffect(() => {
    const handleInstagramCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      
      // Handle OAuth errors first
      if (error) {
        console.error('Instagram OAuth Error:', { error, errorDescription });
        // Clean URL and show error (you might want to show a toast/modal here)
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
      
      // Process OAuth code if present and conditions are met
      if (code && 
          user && 
          organization && 
          businesses.length > 0 && 
          !dashboardLoading && 
          !processedOAuthCodeRef.current) {
        
        console.log('Processing Instagram OAuth code:', {
          code: code.substring(0, 10) + '...',
          businessCount: businesses.length,
          currentBusiness: currentBusiness?.name
        });
        
        // Mark as processed to prevent duplicate processing
        processedOAuthCodeRef.current = true;
        
        try {
          // Determine target business (prefer currentBusiness, fallback to first business)
          const targetBusiness = currentBusiness || businesses[0];
          
          if (!targetBusiness) {
            throw new Error('No business available for Instagram connection');
          }
          
          // Set current business if not already set
          if (!currentBusiness) {
            setCurrentBusiness(targetBusiness);
          }
          
          // Process the Instagram OAuth code
          const { error: processError } = await processInstagramCode(code, targetBusiness.id);
          
          if (processError) {
            console.error('Error processing Instagram code:', processError);
            // Reset the flag so user can retry
            processedOAuthCodeRef.current = false;
          } else {
            console.log('Instagram OAuth code processed successfully');
          }
          
        } catch (error) {
          console.error('Error in OAuth processing:', error);
          // Reset the flag so user can retry
          processedOAuthCodeRef.current = false;
        } finally {
          // Clean URL after processing (success or failure)
          window.history.replaceState({}, document.title, window.location.pathname);
          
          // Ensure we're on the dashboard business view
          setCurrentPage('dashboard');
          setDashboardView('business');
        }
      } else if (code && user && organization) {
        // Code present but conditions not met yet (still loading)
        console.log('OAuth code detected but waiting for data to load:', {
          hasUser: !!user,
          hasOrganization: !!organization,
          businessCount: businesses.length,
          dashboardLoading,
          alreadyProcessed: processedOAuthCodeRef.current
        });
        
        // Redirect to dashboard to show loading state
        setCurrentPage('dashboard');
        setDashboardView('business');
      }
    };
    
    handleInstagramCallback();
  }, [user, organization, businesses, currentBusiness, dashboardLoading, processInstagramCode, setCurrentBusiness]);

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
    // Check if there's an OAuth code being processed
    const urlParams = new URLSearchParams(window.location.search);
    const hasOAuthCode = urlParams.get('code');
    
    // Only auto-redirect if no OAuth code is present (to avoid interfering with OAuth processing)
    if (user && currentPage === 'home' && !hasOAuthCode) {
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
      <div>
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
       <div>
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
       <div>
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