import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

interface NavigationProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  onDashboardClick?: () => void;
  onProfileClick?: () => void;
  onHomeClick?: () => void;
  currentPage: 'home' | 'dashboard' | 'profile';
}

export const Navigation: React.FC<NavigationProps> = ({ 
  onLoginClick, 
  onSignupClick, 
  onDashboardClick, 
  onProfileClick, 
  onHomeClick,
  currentPage 
}) => {
  const { t, currentLanguage, setLanguage, isRTL } = useLanguage();
  const { user, signOut } = useAuth();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as const, name: 'العربية', flag: '🇸🇦' },
  ];

  const handleLanguageChange = (langCode: 'en' | 'ar') => {
    const newLang = languages.find(l => l.code === langCode);
    if (newLang) {
      setLanguage(newLang);
    }
    setShowLanguageDropdown(false);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    signOut();
    setShowUserDropdown(false);
    onHomeClick?.();
  };

  const isDashboard = currentPage === 'dashboard';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDashboard ? 'dashboard-nav' : 'glass-nav'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Left side */}
            <div className="flex items-center">
              <button onClick={onHomeClick} className="flex items-center">
                <img 
                  src="/fead.app_logo.png" 
                  alt="fead.app" 
                  className="h-10 w-auto md:h-12"
                />
              </button>
            </div>

            {/* Center Navigation Links - Only show on home page */}
            {!isDashboard && (
              <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
                <a
                  href="#challenges"
                  className={`nav-item text-white/80 hover:text-[var(--brand-green)] transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t('nav.challenges')}
                </a>
                <a
                  href="#features"
                  className={`nav-item text-white/80 hover:text-[var(--brand-green)] transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t('nav.features')}
                </a>
                <a
                  href="#contact"
                  className={`nav-item text-white/80 hover:text-[var(--brand-green)] transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t('nav.contact')}
                </a>
              </div>
            )}

            {/* Right side - Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!isDashboard && !user && (
                <>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={onLoginClick}
                    className={`${isRTL ? 'font-arabic' : ''}`}
                  >
                    {t('nav.login')}
                  </Button>
                  <Button 
                    onClick={onSignupClick}
                    size="md"
                    className={`btn-primary ${isRTL ? 'font-arabic' : ''}`}
                  >
                    {t('nav.signup')}
                  </Button>
                </>
              )}
              
              {!isDashboard && user && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 text-white hover:bg-white/10 transition-colors duration-200 rounded-lg glass-card"
                  >
                    <div className="w-8 h-8 bg-[var(--brand-green)]/20 rounded-full flex items-center justify-center">
                      <span className="text-[var(--brand-green)] text-sm font-medium">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </button>
                  
                  {showUserDropdown && (
                    <div className={`absolute top-full mt-2 dropdown-menu z-50 ${isRTL ? 'left-0' : 'right-0'} min-w-48`}>
                      <button
                        onClick={() => {
                          onDashboardClick?.();
                          setShowUserDropdown(false);
                        }}
                        className="dropdown-menu-item text-left w-full"
                      >
                        {t('nav.dashboard')}
                      </button>
                      <hr className="border-white/10 my-1" />
                      <button
                        onClick={handleLogout}
                        className="dropdown-menu-item text-left w-full text-red-400"
                      >
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button - Only visible on mobile */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-button p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Only visible when menu is open */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-40 md:hidden">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>
          
          {/* Mobile menu content */}
          <div className={`mobile-menu-content fixed top-16 left-0 right-0 glass-card mx-4 mt-4 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="p-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-4">
                {!isDashboard && (
                  <>
                    <a
                      href="#challenges"
                      onClick={closeMobileMenu}
                      className={`mobile-nav-item block text-lg font-medium text-white/90 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {t('nav.challenges')}
                    </a>
                    <a
                      href="#features"
                      onClick={closeMobileMenu}
                      className={`mobile-nav-item block text-lg font-medium text-white/90 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {t('nav.features')}
                    </a>
                    <a
                      href="#contact"
                      onClick={closeMobileMenu}
                      className={`mobile-nav-item block text-lg font-medium text-white/90 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {t('nav.contact')}
                    </a>
                  </>
                )}
              </div>


              {/* Login Message */}
              <div className="border-t border-white/10 pt-4">
                {!user ? (
                  !isDashboard && (
                    <div className="mobile-login-message glass-card p-4 rounded-lg border border-yellow-500/30">
                      <p className={`text-sm text-yellow-300 text-center ${isRTL ? 'font-arabic' : ''}`}>
                        {t('mobile.loginMessage')}
                      </p>
                    </div>
                  )
                ) : (
                  <div className="space-y-2">
                    {!isDashboard && (
                      <button
                        onClick={() => {
                          onDashboardClick?.();
                          closeMobileMenu();
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                      >
                        {t('nav.dashboard')}
                      </button>
                    )}
                    {isDashboard && (
                      <button
                        onClick={() => {
                          onProfileClick?.();
                          closeMobileMenu();
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                      >
                        Profile
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors duration-200"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};