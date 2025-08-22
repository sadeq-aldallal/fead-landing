import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { Button } from '../ui/Button';

interface BusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessModal: React.FC<BusinessModalProps> = ({ isOpen, onClose }) => {
  const { organization, createBusiness } = useDashboard();
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization) return;
    
    setLoading(true);
    setError('');

    if (!businessName.trim()) {
      setError('Business name is required');
      setLoading(false);
      return;
    }

    const { error: createError } = await createBusiness(businessName.trim(), organization.id);
    
    if (createError) {
      setError(createError.message || 'Failed to create business');
    } else {
      setBusinessName('');
      onClose();
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          onClick={onClose}
          className="modal-close"
          disabled={loading}
        >
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Create Business</h2>
          <p className="modal-subtitle">
            Add a new business to your organization
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label">
              Business Name *
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="form-input"
              placeholder="Enter business name"
              required
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Creating...' : 'Create Business'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};