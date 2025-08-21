import React from 'react';
import { TrendingDown, Clock, Zap, Brain, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const SolutionSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const solutions = [
    {
      icon: TrendingDown,
      title: 'Intelligent Document Processing',
      subtitle: 'Eliminate Document Management Chaos',
      description: 'Our AI-powered document processing system automatically categorizes, extracts, and organizes information from any document type. Say goodbye to lost files and manual sorting - our solution ensures 99.9% accuracy in document handling while reducing processing time by 80%.',
    },
    {
      icon: Clock,
      title: 'Smart Customer Communication Hub',
      subtitle: 'End Communication Breakdowns Forever',
      description: 'Centralize all customer interactions across email, chat, phone, and social media in one intelligent platform. Our AI ensures no message goes unanswered and maintains consistent, professional communication that builds stronger customer relationships.',
    },
    {
      icon: Zap,
      title: 'Automated Lead Management System',
      subtitle: 'Never Miss Another Opportunity',
      description: 'Our intelligent lead scoring and nurturing system automatically identifies high-value prospects, tracks their journey, and delivers personalized follow-ups at the perfect moment. Increase your conversion rates by 300% while reducing manual lead management by 90%.',
    },
    {
      icon: Brain,
      title: 'Real-Time Business Intelligence Dashboard',
      subtitle: 'Make Data-Driven Decisions Instantly',
      description: 'Transform raw data into actionable insights with our AI-powered analytics platform. Get real-time visibility into your business performance, identify trends before your competitors, and make informed decisions that drive growth.',
    },
    {
      icon: Users,
      title: 'Intelligent Process Automation',
      subtitle: 'Streamline Every Business Operation',
      description: 'Automate repetitive tasks across your entire organization with our smart workflow engine. From invoice processing to customer onboarding, our AI handles routine work so your team can focus on strategic initiatives that grow your business.',
    },
    {
      icon: Users,
      title: 'AI-Powered Workforce Optimization',
      subtitle: 'Eliminate Manual Work Inefficiency',
      description: 'Replace time-consuming manual processes with intelligent automation that works 24/7 with perfect accuracy. Our AI agents handle routine tasks, data entry, and administrative work, freeing your team to focus on high-value activities that drive revenue and innovation.',
    },
  ];

  return (
    <section id="features" className="dark-gradient-bg py-20 relative">
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
                className="feature-card group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg glass-card ${isRTL ? 'ml-4' : 'mr-4'}`}>
                    <Icon className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className={`text-xl font-bold text-white ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {solution.title}
                  </h3>
                </div>
                <p className={`text-white/80 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Before vs After Comparison */}
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Transform Your Business Results</h3>
            <p className="text-white/70">See the dramatic improvement with fead.app AI agents</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <div className="glass-card p-6 border-red-500/30">
              <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Before: Manual Support
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Monthly Cost:</span>
                  <span className="font-bold text-red-400">$15,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Availability:</span>
                  <span className="font-bold text-red-400">8-16 hours/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Response Time:</span>
                  <span className="font-bold text-red-400">5-30 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Missed Messages:</span>
                  <span className="font-bold text-red-400">40%</span>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="glass-card p-6 border-green-500/30">
              <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                After: fead.app AI
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Monthly Cost:</span>
                  <span className="font-bold text-green-400">$1,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Availability:</span>
                  <span className="font-bold text-green-400">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Response Time:</span>
                  <span className="font-bold text-green-400">&lt;1 second</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Missed Messages:</span>
                  <span className="font-bold text-green-400">0%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="mt-8 text-center glass-card p-6 border-purple-500/30">
            <h4 className="text-xl font-bold text-white mb-2">Your Potential Savings</h4>
            <div className="text-3xl font-bold text-purple-400 mb-2">$13,500 <span className="text-lg font-normal text-white/70">per month</span></div>
            <div className="text-purple-300">$162,000 saved annually with fead.app</div>
          </div>
        </div>
      </div>
    </section>
  );
};