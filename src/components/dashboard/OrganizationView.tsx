import React, { useState } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { InstagramModal } from '../modals/InstagramModal';
import { BusinessModal } from '../modals/BusinessModal';
import { Button } from '../ui/Button';

export const OrganizationView: React.FC = () => {
  const { organization, businesses, setCurrentBusiness } = useDashboard();
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const handleConnectInstagram = (business) => {
    setSelectedBusiness(business);
    setCurrentBusiness(business);
    setShowInstagramModal(true);
  };

  const handleInstagramConnect = () => {
    const clientId = '1292743865568326';
    const redirectUri = 'https://fead.app/';
    const scope = 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights';
    
    const authUrl = `https://www.instagram.com/oauth/authorize?force_reauth=false&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    
    window.location.href = authUrl;
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
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
          >
            <Plus size={20} />
            <span>Add Business</span>
          </Button>
        )}
      </div>

      {/* Organization Details */}
      <div className="business-card">
        <div className="business-card-header">
          <h2 className="business-card-title">Organization Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Organization Name</label>
            <p className="text-white">{organization.name}</p>
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <p className="text-white">{organization.phone}</p>
          </div>
          <div>
            <label className="form-label">Email</label>
            <p className="text-white">{organization.email}</p>
          </div>
          <div>
            <label className="form-label">Country</label>
            <p className="text-white">{organization.country}</p>
          </div>
        </div>
      </div>

      {/* Businesses Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Businesses</h2>
        
        {businesses.length === 0 ? (
          /* No businesses - Center the create button */
          <div className="flex justify-center">
            <button
              onClick={() => setShowBusinessModal(true)}
              className="create-business-btn"
            >
              <Plus size={48} />
              <h3 className="text-xl font-semibold mb-2">Create Your First Business</h3>
              <p className="text-sm">Get started by adding a business to your organization</p>
            </button>
          </div>
        ) : (
          /* Has businesses - Show grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <div key={business.id} className="business-card">
                <div className="business-card-header">
                  <h3 className="business-card-title">{business.name}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-white/70 text-sm">
                    Created: {new Date(business.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-white/70 text-sm capitalize">
                    Type: {business.type}
                  </p>
                  {business.instagram_username && (
                    <p className="text-green-400 text-sm">
                      Instagram: @{business.instagram_username}
                    </p>
                  )}
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      business.instagram_status === 'connected' ? 'bg-green-400' :
                      business.instagram_status === 'connecting' ? 'bg-yellow-400' :
                      business.instagram_status === 'error' ? 'bg-red-400' :
                      'bg-gray-400'
                    }`}></div>
                    <span className={`text-xs ${
                      business.instagram_status === 'connected' ? 'status-connected' :
                      business.instagram_status === 'connecting' ? 'status-connecting' :
                      business.instagram_status === 'error' ? 'status-error' :
                      'status-disconnected'
                    }`}>
                      {business.instagram_status === 'connected' ? 'Connected' :
                       business.instagram_status === 'connecting' ? 'Connecting...' :
                       business.instagram_status === 'error' ? 'Connection Error' :
                       'Not Connected'}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => handleConnectInstagram(business)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    Connect
                  </Button>
                </div>
              </div>
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
    </div>
  );
};