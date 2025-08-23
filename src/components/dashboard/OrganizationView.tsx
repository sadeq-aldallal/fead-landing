import React, { useState } from 'react';
import { Plus, Building2, Settings } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { InstagramModal } from '../modals/InstagramModal';
import { BusinessModal } from '../modals/BusinessModal';
import { BusinessManagementModal } from '../modals/BusinessManagementModal';
import { Button } from '../ui/Button';
import { Business } from '../../types/dashboard';

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
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Plus size={20} />
            <span className="hidden md:inline">Add Business</span>
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
              <div key={business.id} className={`business-card premium-card ${
                business.instagram_status === 'connected' ? 'connected' : 'disconnected'
              }`}>
                <div className="card-header-modern">
                  <div className="business-avatar">
                    <Building2 size={24} className="text-brand-green" />
                  </div>
                  <div className="business-info">
                    <div className="name-status-row">
                      <h3 className="business-name">{business.name}</h3>
                      <div className={`status-badge ${
                        business.instagram_status === 'connected' ? 'connected' :
                        business.instagram_status === 'connecting' ? 'connecting' :
                        business.instagram_status === 'error' ? 'error' :
                        'disconnected'
                      }`}>
                        <div className="status-dot-mini"></div>
                        <span className="status-label">
                          {business.instagram_status === 'connected' ? 'Live' :
                           business.instagram_status === 'connecting' ? 'Syncing' :
                           business.instagram_status === 'error' ? 'Issue' :
                           'Setup'}
                        </span>
                      </div>
                    </div>
                    <span className="business-type">{business.type}</span>
                  </div>
                  <button
                    onClick={() => handleManageBusiness(business)}
                    className="settings-btn"
                    title="Manage Business"
                  >
                    <Settings size={16} />
                  </button>
                </div>
                
                <div className="card-body">
                  <div className="business-stats">
                    <div className="stat-item">
                      <span className="stat-label">Since</span>
                      <span className="stat-value">{new Date(business.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                    {business.instagram_username && (
                      <div className="stat-item">
                        <span className="stat-label">Instagram</span>
                        <span className="stat-value">@{business.instagram_username}</span>
                      </div>
                    )}
                  </div>
                  
                </div>

                {business.instagram_status !== 'connected' && (
                  <div className="card-footer">
                    <button
                      onClick={() => handleConnectInstagram(business)}
                      className="connect-btn-mini"
                    >
                      Connect
                    </button>
                  </div>
                )}
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