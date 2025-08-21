import React, { useState } from 'react';
import { Mail, Phone, MapPin, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    setShowContactModal(false);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <footer id="contact" className="dark-gradient-bg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
              <img 
                src="/fead.app_logo.png" 
                alt="fead.app" 
                className="h-10 w-auto md:h-12"
              />
              </div>
              <p className={`text-white/70 mb-4 max-w-md ${isRTL ? 'font-arabic text-right' : ''}`}>
                Automate your Instagram customer support with intelligent AI agents that work 24/7.
              </p>
              <div className="flex space-x-3">
                {/* Facebook */}
                <a href="#" className="text-white/60 hover:text-purple-400 transition-colors duration-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/fead.app/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-purple-400 transition-colors duration-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-white font-semibold mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className={`text-white/70 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('nav.home')}
                  </a>
                </li>
                <li>
                  <a href="#challenges" className={`text-white/70 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('nav.challenges')}
                  </a>
                </li>
                <li>
                  <a href="#features" className={`text-white/70 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('nav.features')}
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className={`text-white/70 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                  >
                    Contact us
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className={`text-white font-semibold mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                Get In Touch
              </h3>
              <div className="space-y-3">
                <p className={`text-white/70 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  Have questions or need support?
                </p>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className={`flex items-center text-green-400 hover:text-green-300 transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                >
                  <Mail size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span>Use our contact form</span>
                </button>
                <p className={`text-white/60 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                  We'll respond within 24 hours
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className={`text-white/60 text-sm ${isRTL ? 'font-arabic' : ''}`}>
              © 2025 fead.app. {t('footer.rights')}.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className={`text-white/60 hover:text-white text-sm transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.privacy')}
              </a>
              <a href="#" className={`text-white/60 hover:text-white text-sm transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold text-white ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.contact')}
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <Input
                label="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
              />
              <div>
                <label className={`block text-sm font-medium text-white/70 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  Message
                </label>
                <textarea
                  className={`w-full px-3 py-2 glass-card border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full btn-primary">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};