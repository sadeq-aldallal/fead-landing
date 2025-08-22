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
    <section id="challenges" className="section-gradient-1 section-tight relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`section-title mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('pain.title')}
          </h2>
          <p className={`subtitle max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('pain.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="challenge-card group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg glass-card ${isRTL ? 'ml-4' : 'mr-4'}`}>
                    <Icon className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className={`text-xl font-bold text-white ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {point.title}
                  </h3>
                </div>
                <p className={`text-white/80 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};