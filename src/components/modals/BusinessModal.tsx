import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { Button } from '../ui/Button';

interface BusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessModal: React.FC<BusinessModalProps> = ({ isOpen, onClose }) => {
  const { organization, createBusiness } = useDashboard();
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<'retail' | 'service'>('service');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const businessTypes = [
    { 
      value: 'retail' as const, 
      label: 'Retail', 
      description: 'The core business is selling products' 
    },
    { 
      value: 'service' as const, 
      label: 'Service', 
      description:  'Barber, Trainer, Renting a place' 
    }
  ];

  const selectedType = businessTypes.find(type => type.value === businessType);

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

    const { error: createError } = await createBusiness(businessName.trim(), organization.id, businessType);
    
    if (createError) {
      setError(createError.message || 'Failed to create business');
    } else {
      setBusinessName('');
      setBusinessType('service');
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

          <div className="form-group">
            <label className="form-label">
              Business Type *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="form-input flex items-center justify-between w-full"
                disabled={loading}
              >
                <div className="flex flex-col items-start">
                  <span className="text-white">{selectedType?.label}</span>
                  <span className="text-white/60 text-sm">{selectedType?.description}</span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-white/60 transition-transform duration-200 ${showTypeDropdown ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {showTypeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg max-h-60 overflow-y-auto z-10">
                  {businessTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        setBusinessType(type.value);
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-700 flex flex-col space-y-1 transition-colors duration-200 ${
                        businessType === type.value ? 'bg-gray-700' : ''
                      }`}
                    >
                      <span className="text-white font-medium">{type.label}</span>
                      <span className="text-white/70 text-sm">{type.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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