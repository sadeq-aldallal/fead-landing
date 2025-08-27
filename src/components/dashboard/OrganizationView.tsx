import React, { useState } from 'react';
import { Plus, Building2, Settings } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { InstagramModal } from '../modals/InstagramModal';
import { BusinessModal } from '../modals/BusinessModal';
import { BusinessManagementModal } from '../modals/BusinessManagementModal';
import { Button } from '../ui/Button';
import { Business } from '../../types/dashboard';
import { redirectToInstagramAuth } from '../../utils/instagramAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{organization.name}</h1>
          <p className="text-white/70">Manage your businesses and settings</p>
        </div>
        {businesses.length > 0 && (
          <Button
            onClick={() => setShowBusinessModal(true)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Plus size={20} />
            <span className="hidden md:inline">Add Business</span>
          </Button>
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
        <h2 className="text-2xl font-bold text-white mb-6">Businesses</h2>
        
        {businesses.length === 0 ? (
          /* No businesses - Center the create section */
          <div className="flex justify-center">
            <div className="create-business-container">
              <button
                onClick={() => setShowBusinessModal(true)}
                className="create-business-plus-btn"
                title="Create Your First Business"
              >
                <Plus size={48} />
              </button>
              <h3 className="text-xl font-semibold mb-2 text-center">Create Your First Business</h3>
              <p className="text-sm text-center">Get started by adding a business to your organization</p>
            </div>
          </div>
        ) : (
          /* Has businesses - Show grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <Card key={business.id} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 size={20} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{business.name}</CardTitle>
                        <CardDescription>{business.type}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        business.instagram_status === 'connected' ? 'default' :
                        business.instagram_status === 'connecting' ? 'secondary' :
                        business.instagram_status === 'error' ? 'destructive' :
                        'outline'
                      }>
                        {business.instagram_status === 'connected' ? 'Live' :
                         business.instagram_status === 'connecting' ? 'Syncing' :
                         business.instagram_status === 'error' ? 'Issue' :
                         'Setup'}
                      </Badge>
                      <Button
                        onClick={() => handleManageBusiness(business)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Settings size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
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