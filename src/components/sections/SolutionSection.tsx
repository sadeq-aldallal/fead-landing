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
    <section id="features" className="dark-gradient-bg py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/fead.app_logo.png" 
              alt="fead.app" 
              className="h-8 w-auto"
            />
          </div>
          
          <h2 className={`section-title mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('solution.title')}
          </h2>
          <p className={`subtitle max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('solution.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="feature-card group hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="flex flex-col items-center mb-6">
                  <div className="p-4 rounded-lg glass-card mb-4">
                    <Icon className="h-8 w-8 text-green-300/90" />
                  </div>
                  <h3 className={`text-xl font-bold text-white ${isRTL ? 'font-arabic' : ''}`}>
                    {solution.title}
                  </h3>
                </div>
                <p className={`text-white/80 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};