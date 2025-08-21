import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

interface NavigationProps {
  onAuthClick: () => void;
  onDashboardClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onAuthClick, onDashboardClick }) => {
  const { t, currentLanguage, setLanguage, isRTL } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
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
    logout();
  };

  return (
    <>
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Always visible */}
            <div className="flex items-center">
              <img 
                src="/fead.app_logo.png" 
                alt="fead.app" 
                className="h-10 w-auto md:h-12"
              />
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
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

            {/* Desktop Right Section - Hidden on mobile */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleLanguageDropdown}
                  className={`nav-item text-white/80 hover:text-[var(--brand-green)] transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                >
                  <span>{currentLanguage.code === 'en' ? t('language.english') : t('language.arabic')}</span>
                </button>
                
                {showLanguageDropdown && (
                  <div className={`absolute top-full mt-2 dropdown-menu z-50 ${isRTL ? 'left-0' : 'right-0'}`}>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`dropdown-menu-item text-sm ${currentLanguage.code === 'en' ? 'active' : ''}`}
                    >
                      {t('language.english')}
                    </button>
                    <button
                      onClick={() => handleLanguageChange('ar')}
                      className={`dropdown-menu-item text-sm ${currentLanguage.code === 'ar' ? 'active' : ''}`}
                    >
                      {t('language.arabic')}
                    </button>
                  </div>
                )}
              </div>
              
              {/* Login Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={onAuthClick}
                className={`ml-4 ${isRTL ? 'font-arabic mr-4 ml-0' : ''}`}
              >
                {t('nav.login')}
              </Button>
              
              {/* Sign Up / Dashboard Button */}
              {isAuthenticated ? (
                <Button 
                  onClick={onDashboardClick}
                  size="sm"
                  className={`btn-primary px-3 py-1.5 text-sm ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t('nav.dashboard')}
                </Button>
              ) : (
                <Button 
                  onClick={onAuthClick}
                  size="sm"
                  className={`btn-primary px-3 py-1.5 text-sm ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t('nav.signup')}
                </Button>
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
              </div>

              {/* Language Selection */}
              <div className="border-t border-white/10 pt-4">
                <h3 className={`text-sm font-medium text-white/60 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  Language
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleLanguageChange('en');
                      closeMobileMenu();
                    }}
                    className={`mobile-language-item block w-full text-left px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 ${
                      currentLanguage.code === 'en' ? 'bg-green-500/20 text-green-400' : ''
                    } ${isRTL ? 'text-right font-arabic' : ''}`}
                  >
                    {t('language.english')}
                  </button>
                  <button
                    onClick={() => {
                      handleLanguageChange('ar');
                      closeMobileMenu();
                    }}
                    className={`mobile-language-item block w-full text-left px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 ${
                      currentLanguage.code === 'ar' ? 'bg-green-500/20 text-green-400' : ''
                    } ${isRTL ? 'text-right font-arabic' : ''}`}
                  >
                    {t('language.arabic')}
                  </button>
                </div>
              </div>

              {/* Login Message */}
              <div className="border-t border-white/10 pt-4">
                <div className="mobile-login-message glass-card p-4 rounded-lg border border-yellow-500/30">
                  <p className={`text-sm text-yellow-300 text-center ${isRTL ? 'font-arabic' : ''}`}>
                    {t('mobile.loginMessage')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};