import React, { useState } from 'react';
import { Building2, Users, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboard } from '../../contexts/DashboardContext';
import { Navigation } from '../layout/Navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: 'organization' | 'business';
  onViewChange: (view: 'organization' | 'business') => void;
  breadcrumbs?: Array<{ label: string; href?: string; current?: boolean }>;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentView,
  onViewChange,
  breadcrumbs = []
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { organization, currentBusiness } = useDashboard();

  const sidebarItems = [
    {
      id: 'organization',
      label: 'Organization',
      icon: Users,
      active: currentView === 'organization'
    },
    {
      id: 'business',
      label: 'Business',
      icon: Building2,
      active: currentView === 'business',
      disabled: !organization
    }
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="dashboard-layout">
      {/* Header */}
      <Navigation 
        onLoginClick={() => {}}
        onSignupClick={() => {}}
        onDashboardClick={() => {}}
        onProfileClick={() => {}}
        onHomeClick={() => {}}
        currentPage="dashboard"
      />

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img 
            src="/fead.app_logo.png" 
            alt="fead.app" 
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => !item.disabled && onViewChange(item.id as 'organization' | 'business')}
                className={`sidebar-nav-item ${item.active ? 'active' : ''} ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={item.disabled}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-4">
        {/* Organization Info */}
        {organization && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-white text-sm font-medium mb-2">Current Organization</h3>
            <p className="text-white/80 text-sm">{organization.name}</p>
            {currentBusiness && (
              <p className="text-green-400 text-xs mt-1">Business: {currentBusiness.name}</p>
            )}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="sidebar-nav-item text-red-400 hover:bg-red-400/10 w-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="breadcrumb-item">
                  {crumb.href && !crumb.current ? (
                    <a href={crumb.href} className="breadcrumb-link">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className={crumb.current ? 'breadcrumb-current' : 'breadcrumb-link'}>
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Content */}
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};