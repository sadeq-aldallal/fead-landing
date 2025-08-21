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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              <div className="flex space-x-4">
                <a href="#" className="text-white/60 hover:text-purple-400 transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/60 hover:text-purple-400 transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/60 hover:text-purple-400 transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
                  <a href="#features" className={`text-white/70 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('nav.features')}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className={`text-white/70 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('nav.pricing')}
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className={`text-white/70 hover:text-white transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
                  >
                    {t('footer.contact')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className={`text-white font-semibold mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                Contact Info
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white/70">
                  <Mail size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span>support@fead.app</span>
                </li>
                <li className="flex items-center text-white/70">
                  <Phone size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center text-white/70">
                  <MapPin size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span>San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
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