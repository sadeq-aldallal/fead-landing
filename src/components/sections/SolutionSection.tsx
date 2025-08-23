import React from 'react';
import { FileText, MessageCircle, Target, BarChart3, Settings, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const SolutionSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const solutions = [
    {
      icon: FileText,
      title: 'Intelligent Document Processing',
      description: 'AI-powered system that automatically processes and organizes documents with 99.9% accuracy.',
    },
    {
      icon: MessageCircle,
      title: 'Smart Customer Communication Hub',
      description: 'Centralize all customer interactions across channels with intelligent AI responses.',
    },
    {
      icon: Target,
      title: 'Automated Lead Management System',
      description: 'Smart lead scoring system that identifies prospects and delivers personalized follow-ups.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Business Intelligence Dashboard',
      description: 'Transform data into actionable insights with real-time business performance visibility.',
    },
    {
      icon: Settings,
      title: 'Intelligent Process Automation',
      description: 'Automate repetitive tasks with smart workflows that handle routine work efficiently.',
    },
    {
      icon: Users,
      title: 'AI-Powered Workforce Optimization',
      description: 'Replace manual processes with 24/7 intelligent automation for high-value focus.',
    },
  ];


  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`section-title mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('solution.title')}
          </h2>
          <p className={`subtitle max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('solution.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="solution-card-new group relative"
              >
                {/* Background Watermark Icon */}
                <div className="card-watermark-icon">
                  <Icon className="watermark-icon" />
                </div>
                
                {/* Content */}
                <div className="card-content">
                  <h3 className={`solution-card-title ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {solution.title}
                  </h3>
                  <p className={`solution-card-description ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {solution.description}
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