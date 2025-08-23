import React, { useState } from 'react';
import { X, User, Mail, Trash2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { authHelpers } from '../../lib/supabase';

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data, error } = await authHelpers.updateProfile({
        full_name: formData.name,
        email: formData.email
      });

      if (error) {
        setError(error.message || 'Failed to update profile');
        return;
      }

      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE MY ACCOUNT') {
      setError('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await authHelpers.deleteAccount();
      
      if (error) {
        console.error('Account deletion failed:', error);
        
        if (error.critical) {
          setError(`${error.message}\n\nThis affects app compliance. Please contact support immediately.`);
        } else {
          setError(error.message || 'Failed to delete account. Please try again or contact support.');
        }
        
        setLoading(false);
        return;
      }

      // Account deleted successfully - compliance requirement met
      console.log('Account deletion successful - user being redirected');
      
      // Show brief success message before redirect
      setSuccess('Account deleted successfully. Redirecting...');
      
      setTimeout(() => {
        // Force reload to ensure clean state and redirect to landing page
        window.location.href = '/';
      }, 1500);
      
    } catch (err) {
      console.error('Unexpected error during account deletion:', err);
      setError('An unexpected error occurred. Please contact support to ensure your account is properly deleted for compliance.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Account Settings</h2>
          <button
            onClick={onClose}
            className="modal-close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
              <p>{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              <p style={{ whiteSpace: 'pre-line' }}>{error}</p>
            </div>
          )}

          {!showDeleteConfirm ? (
            <>
              {/* Profile Update Form */}
              <form onSubmit={handleUpdateProfile} className="form-section">
                <div className="form-group">
                  <label className="form-label">
                    <User size={16} className="inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Mail size={16} className="inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>

              {/* Danger Zone */}
              <div className="danger-zone">
                <h3 className="danger-title">
                  <AlertTriangle size={18} className="mr-2" />
                  Danger Zone
                </h3>
                <p className="danger-description">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700 text-white border-red-600 shadow-lg hover:shadow-xl px-3 py-1.5 text-sm w-full"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Account
                </button>
              </div>
            </>
          ) : (
            /* Delete Confirmation */
            <div className="delete-confirmation">
              <div className="text-center mb-6">
                <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
                <h3 className="modal-subtitle">Delete Account</h3>
                <p className="danger-description">
                  This will permanently delete your account and all associated data (organization, businesses) from our system. 
                  You will be signed out immediately. This action cannot be undone.
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Type "DELETE MY ACCOUNT" to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="form-input"
                  placeholder="DELETE MY ACCOUNT"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText('');
                    setError('');
                  }}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading || deleteConfirmText !== 'DELETE MY ACCOUNT'}
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700 text-white border-red-600 shadow-lg hover:shadow-xl px-3 py-1.5 text-sm flex-1"
                >
                  {loading ? 'Deleting...' : 'Delete Forever'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};