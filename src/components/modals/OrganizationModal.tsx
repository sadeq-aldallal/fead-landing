import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Country } from '../../types/dashboard';

interface OrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
];

export const OrganizationModal: React.FC<OrganizationModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { createOrganization } = useDashboard();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: user?.email || '',
    country: ''
  });
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const selectedCountry = countries.find(c => c.code === formData.country);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.phone || !formData.country) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const { error: createError } = await createOrganization(formData);
    
    if (createError) {
      setError(createError.message || 'Failed to create organization');
    } else {
      onClose();
    }
    
    setLoading(false);
  };

  const handleCountrySelect = (country: Country) => {
    setFormData({ ...formData, country: country.code });
    setCountrySearch(country.name);
    setShowCountryDropdown(false);
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
          <h2 className="modal-title">Create Organization</h2>
          <p className="modal-subtitle">
            Set up your organization to get started with fead.app
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
              Organization Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              placeholder="Enter organization name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-input"
              placeholder="Enter phone number"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
              placeholder="Enter email address"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Country *
            </label>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={countrySearch}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    setShowCountryDropdown(true);
                  }}
                  onFocus={() => setShowCountryDropdown(true)}
                  className="form-input pr-10"
                  placeholder="Search for country"
                  disabled={loading}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              
              {selectedCountry && !showCountryDropdown && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-white/80">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                </div>
              )}

              {showCountryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg max-h-60 overflow-y-auto z-10">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-3 text-white"
                    >
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-2 text-gray-400">No countries found</div>
                  )}
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
            {loading ? 'Creating Organization...' : 'Create Organization'}
          </Button>
        </form>
      </div>
    </div>
  );
};