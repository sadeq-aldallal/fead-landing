import React, { useState } from 'react';
import { Users, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboard } from '../../contexts/DashboardContext';
import { Navigation } from '../layout/Navigation';
import { UserSettingsModal } from '../modals/UserSettingsModal';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: 'organization' | 'business';
  onViewChange: (view: 'organization' | 'business') => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentView,
  onViewChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { user, signOut } = useAuth();
  const { organization, currentBusiness } = useDashboard();

  const sidebarItems = [
    {
      id: 'organization',
      label: 'Organization',
      icon: Users,
      active: currentView === 'organization'
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
        {/* Settings */}
        <button
          onClick={() => setShowSettingsModal(true)}
          className="sidebar-nav-item w-full"
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>

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

      {/* User Settings Modal */}
      <UserSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
};