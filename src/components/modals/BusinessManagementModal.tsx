import React, { useState } from 'react';
import { X, Plus, Trash2, AlertTriangle, Users, Settings } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { Business } from '../../types/dashboard';
import { Button } from '../ui/Button';

interface BusinessManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: Business;
}

export const BusinessManagementModal: React.FC<BusinessManagementModalProps> = ({
  isOpen,
  onClose,
  business
}) => {
  const { updateBusiness, deleteBusiness } = useDashboard();
  const [mode, setMode] = useState<'test' | 'production'>(business.mode || 'test');
  const [testers, setTesters] = useState<string[]>(business.testers || []);
  const [newTester, setNewTester] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [disconnectLoading, setDisconnectLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleModeToggle = async (newMode: 'test' | 'production') => {
    setLoading(true);
    setError('');
    setSuccess('');

    const { error: updateError } = await updateBusiness(business.id, { mode: newMode });
    
    if (updateError) {
      setError('Failed to update mode');
    } else {
      setMode(newMode);
      setSuccess(`Mode changed to ${newMode}`);
      setTimeout(() => setSuccess(''), 3000);
    }
    
    setLoading(false);
  };

  const handleAddTester = async () => {
    if (!newTester.trim()) return;
    
    // Validate Instagram username format (basic validation)
    const username = newTester.trim().replace('@', '');
    if (!/^[a-zA-Z0-9._]{1,30}$/.test(username)) {
      setError('Invalid Instagram username format');
      return;
    }

    if (testers.includes(username)) {
      setError('This username is already added');
      return;
    }

    if (testers.length >= 7) {
      setError('Maximum 7 testers allowed in test mode');
      return;
    }

    const updatedTesters = [...testers, username];
    setLoading(true);
    setError('');

    const { error: updateError } = await updateBusiness(business.id, { testers: updatedTesters });
    
    if (updateError) {
      setError('Failed to add tester');
    } else {
      setTesters(updatedTesters);
      setNewTester('');
      setSuccess('Tester added successfully');
      setTimeout(() => setSuccess(''), 3000);
    }
    
    setLoading(false);
  };

  const handleRemoveTester = async (username: string) => {
    const updatedTesters = testers.filter(t => t !== username);
    setLoading(true);
    setError('');

    const { error: updateError } = await updateBusiness(business.id, { testers: updatedTesters });
    
    if (updateError) {
      setError('Failed to remove tester');
    } else {
      setTesters(updatedTesters);
      setSuccess('Tester removed successfully');
      setTimeout(() => setSuccess(''), 3000);
    }
    
    setLoading(false);
  };

  const handleDeleteBusiness = async () => {
    if (deleteConfirmText !== business.name) {
      setError(`Please type "${business.name}" to confirm deletion`);
      return;
    }

    setDeleteLoading(true);
    setError('');

    const { error: deleteError } = await deleteBusiness(business.id);
    
    if (deleteError) {
      setError('Failed to delete business');
      setDeleteLoading(false);
    } else {
      setSuccess('Business deleted successfully.');
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleDisconnectInstagram = async () => {
    const confirmMessage = `Are you sure you want to disconnect @${business.instagram_username}?\n\nThis will:\n• Stop all automated responses\n• Remove access to Instagram messages\n• Require reconnection to resume service\n\nThis action cannot be undone automatically.`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    setDisconnectLoading(true);
    setError('');

    try {
      // Call your n8n webhook to handle Instagram disconnection
      const disconnectResponse = await fetch('https://fead.app.n8n.cloud/webhook/instagram-disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          business_id: business.id,
          instagram_account_id: business.instagram_account_id,
          action: 'disconnect'
        })
      });

      if (!disconnectResponse.ok) {
        throw new Error('Failed to disconnect Instagram account');
      }

      // Update the business status locally
      const { error: updateError } = await updateBusiness(business.id, {
        instagram_status: 'disconnected',
        instagram_username: null,
        instagram_account_id: null,
        access_token: null,
        is_webhook_subscribed: false
      });

      if (updateError) {
        throw new Error('Failed to update business status');
      }

      setSuccess('Instagram account disconnected successfully');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError('Failed to initiate Instagram disconnection');
    } finally {
      setDisconnectLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTester();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-7xl w-full">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Manage Business</h2>
            <p className="modal-subtitle">
              Configure settings for {business.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="modal-close"
            disabled={loading || deleteLoading || disconnectLoading}
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <div className="space-y-8">
          {/* Mode Toggle Section */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Mode Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Current Mode</p>
                  <p className="text-white/70 text-sm">
                    {mode === 'test' ? 'Test Mode - Limited to 7 Instagram accounts' : 'Production Mode - Unlimited accounts'}
                  </p>
                </div>
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => handleModeToggle('test')}
                    disabled={loading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      mode === 'test'
                        ? 'text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: mode === 'test' ? '#ea580c' : undefined
                    }}
                  >
                    Test
                  </button>
                  <button
                    onClick={() => handleModeToggle('production')}
                    disabled={loading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      mode === 'production'
                        ? 'bg-green-700 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Production
                  </button>
                </div>
              </div>

              {/* Test Mode Testers Section */}
              {mode === 'test' && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center mb-4">
                    <Users className="w-4 h-4 text-blue-400 mr-2" />
                    <h4 className="text-white font-medium">Test Instagram Accounts</h4>
                    <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {testers.length}/7
                    </span>
                  </div>
                  
                  <p className="text-white/60 text-sm mb-4">
                    Add Instagram usernames that can interact with your AI agent during testing. 
                    <strong className="text-yellow-400"> Username must exactly match the Instagram username.</strong>
                  </p>

                  {/* Add Tester Input */}
                  <div className="flex space-x-2 mb-4">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">@</span>
                      <input
                        type="text"
                        value={newTester}
                        onChange={(e) => setNewTester(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="form-input pl-10 h-12"
                        placeholder="instagram_username"
                        disabled={loading || testers.length >= 7}
                      />
                    </div>
                    <Button
                      onClick={handleAddTester}
                      disabled={loading || !newTester.trim() || testers.length >= 7}
                      size="sm"
                      variant="outline"
                      className="flex items-center justify-center w-12 h-12 min-w-12 border-white/60 hover:border-white hover:bg-white/20 transition-all duration-200"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>

                  {/* Testers List */}
                  {testers.length > 0 && (
                    <div className="space-y-2">
                      {testers.map((username, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg px-3 h-12">
                          <span className="text-white">@{username}</span>
                          <button
                            onClick={() => handleRemoveTester(username)}
                            disabled={loading}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {testers.length === 0 && (
                    <div className="text-center py-8 text-white/60">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No test accounts added yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/30">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
            </div>
            
            <div className="space-y-4">
              {!showDeleteConfirm ? (
                <div>
                  <h4 className="text-white font-medium mb-2">Delete Business</h4>
                  <p className="text-white/70 text-sm mb-4">
                    This will permanently delete this business and all associated data. This action cannot be undone and there is no way to restore it.
                  </p>
                  <Button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                  >
                    Delete Business
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
                    <h4 className="text-red-400 font-medium mb-2">Permanently Delete Business</h4>
                    <p className="text-white/70 text-sm">
                      This will permanently delete <strong className="text-white">{business.name}</strong> and all associated data. 
                      This action cannot be undone and there is no way to restore it.
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Type "{business.name}" to confirm deletion
                    </label>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="form-input"
                      placeholder={business.name}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmText('');
                        setError('');
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeleteBusiness}
                      loading={deleteLoading}
                      disabled={deleteLoading || deleteConfirmText !== business.name}
                      className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex-1"
                    >
                      {deleteLoading ? 'Deleting...' : 'Delete Forever'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};