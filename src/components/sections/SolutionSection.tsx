import React from 'react';
import { FileText, MessageCircle, Target, BarChart3, Cog, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const SolutionSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const solutions = [
    {
      icon: FileText,
      title: 'Intelligent Document Processing',
      description: 'Automatically categorize, extract, and organize information from any document type with 99.9% accuracy.',
    },
    {
      icon: MessageCircle,
      title: 'Smart Customer Communication Hub',
      description: 'Centralize all customer interactions across multiple channels in one intelligent platform with AI-powered responses.',
    },
    {
      icon: Target,
      title: 'Automated Lead Management System',
      description: 'Intelligent lead scoring and nurturing system that identifies prospects and delivers personalized follow-ups automatically.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Business Intelligence Dashboard',
      description: 'Transform raw data into actionable insights with real-time visibility into business performance and trends.',
    },
    {
      icon: Cog,
      title: 'Intelligent Process Automation',
      description: 'Automate repetitive tasks across your organization with smart workflow engines that handle routine work efficiently.',
    },
    {
      icon: Users,
      title: 'AI-Powered Workforce Optimization',
      description: 'Replace manual processes with intelligent automation that works 24/7, freeing your team for high-value activities.',
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
                    <Icon className="h-8 w-8 text-green-300/70" />
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