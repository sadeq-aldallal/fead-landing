import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

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
      <div className="modal-content max-w-md" style={{ maxHeight: 'none', overflow: 'visible' }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Create Business</h2>
            <p className="modal-subtitle">
              Add a new business to your organization
            </p>
          </div>
          <button
            onClick={onClose}
            className="modal-close"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Business Name *"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter business name"
              required
              disabled={loading}
              autoFocus
              error={error && !businessName.trim() ? 'Business name is required' : undefined}
            />

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Business Type *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="w-full py-2 px-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white text-left
                    focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent
                    transition-colors duration-200 flex items-center justify-between"
                  disabled={loading}
                >
                  <div>
                    <span className="text-white text-sm">{selectedType?.label}</span>
                    <span className="text-white/60 text-xs block">{selectedType?.description}</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-white/60 transition-transform duration-200 ${showTypeDropdown ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {showTypeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg z-10">
                    {businessTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setBusinessType(type.value);
                          setShowTypeDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-700 transition-colors duration-200 ${
                          businessType === type.value ? 'bg-gray-700' : ''
                        } first:rounded-t-lg last:rounded-b-lg`}
                      >
                        <span className="text-white text-sm font-medium block">{type.label}</span>
                        <span className="text-white/70 text-xs">{type.description}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating...' : 'Create Business'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};