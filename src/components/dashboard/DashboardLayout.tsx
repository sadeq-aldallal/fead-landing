import React, { useState } from 'react';
import { Users, Menu, X, Settings, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboard } from '../../contexts/DashboardContext';
import { Navigation } from '../layout/Navigation';
import { UserSettingsModal } from '../modals/UserSettingsModal';
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: 'organization' | 'business';
  onViewChange: (view: 'organization' | 'business') => void;
  onDocsClick?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentView,
  onViewChange,
  onDocsClick
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


      {/* Desktop Sidebar */}
      <aside className="dashboard-sidebar hidden md:flex">
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
              <Button
                key={item.id}
                onClick={() => !item.disabled && onViewChange(item.id as 'organization' | 'business')}
                variant={item.active ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${item.disabled ? 'opacity-50' : ''}`}
                disabled={item.disabled}
              >
                <Icon size={20} className="mr-2" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-2">
          {/* Documentation */}
          {onDocsClick && (
            <Button
              onClick={onDocsClick}
              variant="ghost"
              className="w-full justify-start"
            >
              <FileText size={20} className="mr-2" />
              <span>Documentation</span>
            </Button>
          )}

          {/* Settings */}
          <Button
            onClick={() => setShowSettingsModal(true)}
            variant="ghost"
            className="w-full justify-start"
          >
            <Settings size={20} className="mr-2" />
            <span>Settings</span>
          </Button>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut size={20} className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Sheet */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>
                <img 
                  src="/fead.app_logo.png" 
                  alt="fead.app" 
                  className="h-8 w-auto"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col h-full">
              <nav className="space-y-2 flex-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      onClick={() => {
                        if (!item.disabled) {
                          onViewChange(item.id as 'organization' | 'business');
                          setSidebarOpen(false);
                        }
                      }}
                      variant={item.active ? 'secondary' : 'ghost'}
                      className={`w-full justify-start ${item.disabled ? 'opacity-50' : ''}`}
                      disabled={item.disabled}
                    >
                      <Icon size={20} className="mr-2" />
                      <span>{item.label}</span>
                    </Button>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-2 pb-4">
                {onDocsClick && (
                  <Button
                    onClick={() => {
                      onDocsClick();
                      setSidebarOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <FileText size={20} className="mr-2" />
                    <span>Documentation</span>
                  </Button>
                )}

                <Button
                  onClick={() => {
                    setShowSettingsModal(true);
                    setSidebarOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Settings size={20} className="mr-2" />
                  <span>Settings</span>
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut size={20} className="mr-2" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">

          {/* Content */}
          {children}
        </div>
      </main>


      {/* User Settings Modal */}
      <UserSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
};