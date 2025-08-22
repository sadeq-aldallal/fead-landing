import React, { useState } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { BusinessModal } from '../modals/BusinessModal';
import { Button } from '../ui/Button';

export const OrganizationView: React.FC = () => {
  const { organization, businesses } = useDashboard();
  const [showBusinessModal, setShowBusinessModal] = useState(false);

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
            className="flex items-center space-x-2"
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
                  {business.photo_url && (
                    <img
                      src={business.photo_url}
                      alt={business.name}
                      className="business-card-photo"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-white/70 text-sm">
                    Created: {new Date(business.created_at).toLocaleDateString()}
                  </p>
                  {business.instagram_username && (
                    <p className="text-green-400 text-sm">
                      Instagram: @{business.instagram_username}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Manage Business
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
    </div>
  );
};