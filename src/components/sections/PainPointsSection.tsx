import React from 'react';
import { DollarSign, Clock, Zap, MessageSquare, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const PainPointsSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const painPoints = [
    {
      icon: DollarSign,
      title: t('pain.cost.title'),
      description: t('pain.cost.desc'),
    },
    {
      icon: Clock,
      title: t('pain.availability.title'),
      description: t('pain.availability.desc'),
    },
    {
      icon: Zap,
      title: t('pain.speed.title'),
      description: t('pain.speed.desc'),
    },
    {
      icon: MessageSquare,
      title: t('pain.context.title'),
      description: t('pain.context.desc'),
    },
    {
      icon: Calendar,
      title: t('pain.coverage.title'),
      description: t('pain.coverage.desc'),
    },
    {
      icon: Users,
      title: t('pain.manual.title'),
      description: t('pain.manual.desc'),
    },
  ];

  return (
    <section id="challenges" className="pt-8 pb-20 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`section-title mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('pain.title')}
          </h2>
          <p className={`subtitle max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('pain.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="challenge-card-new group relative"
              >
                {/* Background Watermark Icon */}
                <div className="card-watermark-icon">
                  <Icon className="watermark-icon" />
                </div>
                
                {/* Content */}
                <div className="card-content">
                  <h3 className={`card-title-big ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {point.title}
                  </h3>
                  <p className={`card-description-big ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {point.description}
                  </p>
                </div>
                
                {/* Hover Effect Elements */}
                <div className="card-hover-line"></div>
                <div className="card-gradient-overlay"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};