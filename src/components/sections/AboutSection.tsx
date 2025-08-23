import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <h2 className={`section-title mb-8 ${isRTL ? 'font-arabic' : ''}`}>
          {t('about.title')}
        </h2>
        
        <p className={`subtitle max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
          {t('about.subtitle')}
        </p>
      </div>
    </section>
  );
};