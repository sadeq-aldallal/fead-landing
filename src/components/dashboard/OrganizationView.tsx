import React, { useState } from 'react';
import { Plus, Building2, Settings } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { InstagramModal } from '../modals/InstagramModal';
import { BusinessModal } from '../modals/BusinessModal';
import { BusinessManagementModal } from '../modals/BusinessManagementModal';
import { Button } from '@/components/ui/button';
import { Business } from '../../types/dashboard';
import { redirectToInstagramAuth } from '../../utils/instagramAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { ActionMenu } from '@/components/ui/action-menu';

export const OrganizationView: React.FC = () => {
  const { organization, businesses, setCurrentBusiness } = useDashboard();
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [showManagementModal, setShowManagementModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const handleConnectInstagram = (business) => {
    setSelectedBusiness(business);
    setCurrentBusiness(business);
    setShowInstagramModal(true);
  };

  const handleManageBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setCurrentBusiness(business);
    setShowManagementModal(true);
  };

  const handleInstagramConnect = () => {
    redirectToInstagramAuth();
  };

  if (!organization) {
    return (
      <div className="text-center py-12">
        <div className="text-white/60 mb-4">
          <Building2 size={48} className="mx-auto mb-4" />
          <p>No organization found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Organization Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{organization.name}</h1>
          <p className="text-muted-foreground">Manage your businesses and settings</p>
        </div>
        {businesses.length > 0 && (
          <div className="flex-shrink-0">
            <Button
              onClick={() => setShowBusinessModal(true)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Plus size={20} />
              <span className="hidden md:inline">Add Business</span>
            </Button>
          </div>
        )}
      </div>

      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Organization Name</label>
              <p className="text-foreground mt-1">{organization.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
              <p className="text-foreground mt-1">{organization.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-foreground mt-1">{organization.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Country</label>
              <p className="text-foreground mt-1">{organization.country}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Businesses Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Businesses</h2>
        
        {businesses.length === 0 ? (
          /* No businesses - Center the create section */
          <div className="flex justify-center">
            <Card className="p-8 text-center max-w-md">
              <CardContent className="flex flex-col items-center space-y-4">
                <Button
                  onClick={() => setShowBusinessModal(true)}
                  size="lg"
                  className="w-20 h-20 rounded-full"
                  title="Create Your First Business"
                >
                  <Plus size={32} />
                </Button>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Create Your First Business</h3>
                  <p className="text-sm text-muted-foreground">Get started by adding a business to your organization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Has businesses - Show grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <Card key={business.id} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 size={20} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{business.name}</CardTitle>
                        <CardDescription>{business.type}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <StatusBadge
                        variant={
                          business.instagram_status === 'connected' ? 'connected' :
                          business.instagram_status === 'connecting' ? 'connecting' :
                          business.instagram_status === 'error' ? 'error' :
                          'setup'
                        }
                        pulse={business.instagram_status === 'connecting'}
                      >
                        {business.instagram_status === 'connected' ? 'Live' :
                         business.instagram_status === 'connecting' ? 'Syncing' :
                         business.instagram_status === 'error' ? 'Issue' :
                         'Setup'}
                      </StatusBadge>
                      <ActionMenu
                        items={[
                          {
                            label: 'Manage Business',
                            onClick: () => handleManageBusiness(business),
                            icon: <Settings size={14} />
                          },
                          {
                            label: 'Connect Instagram',
                            onClick: () => handleConnectInstagram(business),
                            disabled: business.instagram_status === 'connected'
                          }
                        ]}
                      />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Since</p>
                      <p className="font-medium">{new Date(business.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    {business.instagram_username && (
                      <div>
                        <p className="text-muted-foreground">Instagram</p>
                        <p className="font-medium">@{business.instagram_username}</p>
                      </div>
                    )}
                  </div>
                </CardContent>

                {business.instagram_status !== 'connected' && (
                  <CardFooter>
                    <Button
                      onClick={() => handleConnectInstagram(business)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Connect Instagram
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <BusinessModal
        isOpen={showBusinessModal}
        onClose={() => setShowBusinessModal(false)}
      />

      <InstagramModal
        isOpen={showInstagramModal}
        onClose={() => setShowInstagramModal(false)}
        onConnect={handleInstagramConnect}
      />

      {selectedBusiness && (
        <BusinessManagementModal
          isOpen={showManagementModal}
          onClose={() => setShowManagementModal(false)}
          business={selectedBusiness}
        />
      )}
    </div>
  );
};