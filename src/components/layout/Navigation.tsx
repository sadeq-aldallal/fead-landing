import React, { useState } from 'react';
import { Menu, X, User, LogOut, LayoutDashboard, FileText, Home } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavigationProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  onDashboardClick?: () => void;
  onProfileClick?: () => void;
  onHomeClick?: () => void;
  onDocsClick?: () => void;
  currentPage: 'home' | 'dashboard' | 'profile' | 'docs';
}

export const Navigation: React.FC<NavigationProps> = ({ 
  onLoginClick, 
  onSignupClick, 
  onDashboardClick, 
  onProfileClick, 
  onHomeClick,
  onDocsClick,
  currentPage 
}) => {
  const { t, currentLanguage, setLanguage, isRTL } = useLanguage();
  const { user, signOut } = useAuth();
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
              <img 
                src="/fead.app_logo.png" 
                alt="fead.app" 
                className="h-10 w-auto md:h-12"
              />
            </div>

            {/* Center Navigation Links - Only show on home page */}
            {!isDashboard && (
              <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
                <a
                  href="/#home"
                  className={`nav-item text-white/80 hover:text-[var(--brand-green)] transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t('nav.home')}
                </a>
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
                  href="/#contact"
                  className={`nav-item text-white/80 hover:text-[var(--brand-green)] transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t('nav.contact')}
                </a>
                <button
                  onClick={onDocsClick}
                  className={`nav-item text-white/80 hover:text-[var(--brand-green)] transition-colors duration-200 ${isRTL ? 'font-arabic' : ''} ${currentPage === 'docs' ? 'text-[var(--brand-green)]' : ''}`}
                >
                  Docs
                </button>
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
                    Request Demo
                  </Button>
                </>
              )}
              
              {!isDashboard && user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary text-sm font-medium">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Manage your account
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDashboardClick?.()}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>{t('nav.dashboard')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('nav.logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile Hamburger Button - Only visible on mobile */}
            <div className="md:hidden mr-4">
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
          <div className={`mobile-menu-content fixed top-16 left-0 right-0 bg-white/8 backdrop-blur-sm border border-white/15 mx-4 mt-4 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="p-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-4">
                {!isDashboard && (
                  <>
                    <a
                      href="/#home"
                      onClick={closeMobileMenu}
                      className={`mobile-nav-item block text-lg font-medium text-white/90 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {t('nav.home')}
                    </a>
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
                      href="/#contact"
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
                    <div className="mobile-login-message bg-white/8 backdrop-blur-sm border border-yellow-500/30 p-4 rounded-lg">
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