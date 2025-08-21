import React, { useState } from 'react';
import { X, Mail, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { t, isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className={`text-2xl font-bold text-white mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
            {t('contact.title')}
          </h2>
          <p className={`text-white/70 ${isRTL ? 'font-arabic text-right' : ''}`}>
            {isRTL ? 'نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك قريباً.' : 'We\'re here to help. Send us a message and we\'ll respond soon.'}
          </p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-400" />
            </div>
            <p className={`text-green-400 text-lg font-semibold ${isRTL ? 'font-arabic' : ''}`}>
              {t('contact.success')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-white/60`} size={20} />
              <Input
                label={t('contact.name')}
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={isRTL ? 'pr-10' : 'pl-10'}
                placeholder={isRTL ? 'أحمد محمد' : 'John Doe'}
                required
              />
            </div>

            <div className="relative">
              <Mail className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-white/60`} size={20} />
              <Input
                label={t('contact.email')}
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={isRTL ? 'pr-10' : 'pl-10'}
                placeholder={isRTL ? 'ahmed@example.com' : 'john@example.com'}
                required
              />
            </div>

            <div className="relative">
              <MessageSquare className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-white/60`} size={20} />
              <div>
                <label className={`block text-sm font-medium text-white/70 mb-1 ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                  {t('contact.message')}
                </label>
                <textarea
                  className={`w-full ${isRTL ? 'pr-10' : 'pl-10'} py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 ${isRTL ? 'text-right font-arabic' : 'text-left'}`}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  required
                />
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full btn-primary">
              {loading ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : t('contact.send')}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};