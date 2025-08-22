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
  const { updateBusiness } = useDashboard();
  const [mode, setMode] = useState<'test' | 'production'>(business.mode || 'test');
  const [testers, setTesters] = useState<string[]>(business.testers || []);
  const [newTester, setNewTester] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [disconnectLoading, setDisconnectLoading] = useState(false);
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

    if (testers.length >= 5) {
      setError('Maximum 5 testers allowed in test mode');
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
    if (!confirm('Are you sure you want to delete this business? You will have 30 days to restore it.')) {
      return;
    }

    setDeleteLoading(true);
    setError('');

    const { error: updateError } = await updateBusiness(business.id, { 
      is_deleted: true,
      deleted_at: new Date().toISOString()
    });
    
    if (updateError) {
      setError('Failed to delete business');
      setDeleteLoading(false);
    } else {
      setSuccess('Business deleted successfully. You have 30 days to restore it.');
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
      // Store business ID for handling the redirect
      localStorage.setItem('disconnecting_business_id', business.id);
      
      // Redirect to Instagram authorization with empty scope to trigger cancellation
      const clientId = '1292743865568326';
      const redirectUri = 'https://fead.app/';
      const cancelUrl = `https://www.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=`;
      
      window.location.href = cancelUrl;
    } catch (error) {
      setError('Failed to initiate Instagram disconnection');
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
      <div className="modal-content max-w-2xl">
        <button
          onClick={onClose}
          className="modal-close"
          disabled={loading || deleteLoading || disconnectLoading}
        >
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Manage Business</h2>
          <p className="modal-subtitle">
            Configure settings for {business.name}
          </p>
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
              <Settings className="w-5 h-5 text-green-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Mode Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Current Mode</p>
                  <p className="text-white/70 text-sm">
                    {mode === 'test' ? 'Test Mode - Limited to 5 Instagram accounts' : 'Production Mode - Unlimited accounts'}
                  </p>
                </div>
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => handleModeToggle('test')}
                    disabled={loading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      mode === 'test'
                        ? 'bg-green-600 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Test
                  </button>
                  <button
                    onClick={() => handleModeToggle('production')}
                    disabled={loading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      mode === 'production'
                        ? 'bg-green-600 text-white'
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
                      {testers.length}/5
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
                        className="form-input pl-8"
                        placeholder="instagram_username"
                        disabled={loading || testers.length >= 5}
                      />
                    </div>
                    <Button
                      onClick={handleAddTester}
                      disabled={loading || !newTester.trim() || testers.length >= 5}
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Plus size={16} />
                      <span>Add</span>
                    </Button>
                  </div>

                  {/* Testers List */}
                  {testers.length > 0 && (
                    <div className="space-y-2">
                      {testers.map((username, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
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
              {/* Disconnect Instagram */}
              {business.instagram_status === 'connected' && business.instagram_username && (
                <div>
                  <h4 className="text-white font-medium mb-2">Disconnect Instagram Account</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Disconnect @{business.instagram_username} from this business. This will stop all automated responses 
                    and remove access to Instagram messages. You can reconnect later if needed.
                  </p>
                  <Button
                    onClick={handleDisconnectInstagram}
                    loading={disconnectLoading}
                    disabled={disconnectLoading}
                    className="bg-orange-600 hover:bg-orange-700 text-white border-orange-600"
                  >
                    {disconnectLoading ? 'Disconnecting...' : 'Disconnect Instagram'}
                  </Button>
                </div>
              )}

              <div>
                <h4 className="text-white font-medium mb-2">Delete Business</h4>
                <p className="text-white/70 text-sm mb-4">
                  Once you delete this business, it will be moved to trash. You will have 30 days to restore it before permanent deletion.
                </p>
                <Button
                  onClick={handleDeleteBusiness}
                  loading={deleteLoading}
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                >
                  {deleteLoading ? 'Deleting...' : 'Delete Business'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};