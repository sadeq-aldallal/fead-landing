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
    <section id="challenges" className="dark-gradient-bg py-20 relative">
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
                className="feature-card group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg glass-card ${isRTL ? 'ml-4' : 'mr-4'}`}>
                    <Icon className="h-6 w-6 text-red-400" />
                  </div>
                  <h3 className={`text-xl font-bold text-white ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {point.title}
                  <Icon className="h-6 w-6 text-green-400" />
                </div>
                <p className={`text-white/80 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
            )

        {/* Impact Stats */}
        <div className="mt-16 glass-card p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">The Real Cost of Manual Support</h3>
            <p className="text-white/70">What businesses lose every month with traditional approaches</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">$15,000+</div>
              <div className="text-white/70">Monthly staffing costs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">40%</div>
              <div className="text-white/70">Missed opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">8+ hours</div>
              <div className="text-white/70">Daily coverage gaps</div>
            </div>
          </div>
        </div>
      </div>
    }
    )
    }
    </section>
  );
};