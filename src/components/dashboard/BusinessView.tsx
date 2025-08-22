import React, { useState, useEffect } from 'react';
import { Instagram, RefreshCw, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { InstagramModal } from '../modals/InstagramModal';
import { Button } from '../ui/Button';

export const BusinessView: React.FC = () => {
  const { currentBusiness, updateBusiness, refreshBusinessData } = useDashboard();
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check for Instagram OAuth code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code && currentBusiness) {
      handleInstagramCode(code);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [currentBusiness]);

  const handleInstagramCode = async (code: string) => {
    if (!currentBusiness) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error: updateError } = await updateBusiness(currentBusiness.id, {
        instagram_code: code
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      setSuccess('Instagram code received! Processing your account...');
      
      // Wait a moment then try to refresh data
      setTimeout(() => {
        handleRefreshInstagramData();
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to store Instagram code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstagramConnect = () => {
    const clientId = '1292743865568326';
    const redirectUri = 'https://www.fead.app/';
    const scope = 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights';
    
    const authUrl = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    
    window.location.href = authUrl;
  };

  const handleRefreshInstagramData = async () => {
    if (!currentBusiness) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error: refreshError } = await refreshBusinessData(currentBusiness.id);
      
      if (refreshError) {
        throw new Error(refreshError.message);
      }

      if (currentBusiness.instagram_username) {
        setSuccess('Instagram account data refreshed successfully!');
      } else {
        setError('Instagram account data not yet available. Please wait a moment and try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to refresh Instagram data');
    } finally {
      setLoading(false);
    }
  };

  if (!currentBusiness) {
    return (
      <div className="text-center py-12">
        <div className="text-white/60 mb-4">
          <Instagram size={48} className="mx-auto mb-4" />
          <p>Please select a business from the organization view</p>
        </div>
      </div>
    );
  }

  const hasInstagramAccount = currentBusiness.instagram_username && currentBusiness.instagram_account_id;
  const hasInstagramCode = currentBusiness.instagram_code;

  return (
    <div className="space-y-8">
      {/* Business Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{currentBusiness.name}</h1>
        <p className="text-white/70">Manage your Instagram integration and business settings</p>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="error-message flex items-center">
          <AlertCircle size={20} className="mr-2 flex-shrink-0" />
          <div>
            <p>{error}</p>
            <p className="text-sm mt-1">
              Need help? Contact our support team for assistance.
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className="success-message flex items-center">
          <CheckCircle size={20} className="mr-2 flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Instagram Integration Section */}
      <div className="business-card">
        <div className="business-card-header">
          <h2 className="business-card-title">Instagram Integration</h2>
        </div>

        {hasInstagramAccount ? (
          /* Connected State */
          <div className="instagram-account-card">
            <img
              src={currentBusiness.instagram_profile_photo || 'https://via.placeholder.com/80'}
              alt={`@${currentBusiness.instagram_username}`}
              className="instagram-profile-photo"
            />
            <div className="instagram-account-info flex-1">
              <h3>@{currentBusiness.instagram_username}</h3>
              <p>Account ID: {currentBusiness.instagram_account_id}</p>
              <p className="text-green-400 text-sm mt-2">✓ Successfully connected</p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={handleRefreshInstagramData}
                disabled={loading}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </Button>
              <Button
                onClick={() => setShowInstagramModal(true)}
                variant="outline"
                size="sm"
              >
                Reconnect
              </Button>
            </div>
          </div>
        ) : hasInstagramCode ? (
          /* Processing State */
          <div className="instagram-connection">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <RefreshCw size={32} className="text-green-400 animate-spin" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Processing Instagram Connection</h3>
            <p className="text-white/70 mb-6">
              We're setting up your Instagram account. This usually takes a few moments.
            </p>
            <Button
              onClick={handleRefreshInstagramData}
              disabled={loading}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Check Status</span>
            </Button>
          </div>
        ) : (
          /* Not Connected State */
          <div className="instagram-connection">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center">
                <Instagram size={32} className="text-pink-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Connect Your Instagram Account</h3>
            <p className="text-white/70 mb-6">
              Connect your Instagram Business or Creator account to start automating your customer support with AI.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => setShowInstagramModal(true)}
                className="flex items-center space-x-2"
              >
                <Instagram size={20} />
                <span>Connect Instagram</span>
              </Button>
              <p className="text-white/60 text-sm">
                Make sure your Instagram account is set to Business or Creator mode before connecting.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Business Settings */}
      <div className="business-card">
        <div className="business-card-header">
          <h2 className="business-card-title">Business Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="form-label">Business Name</label>
            <p className="text-white">{currentBusiness.name}</p>
          </div>
          <div>
            <label className="form-label">Created</label>
            <p className="text-white">{new Date(currentBusiness.created_at).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="form-label">Last Updated</label>
            <p className="text-white">{new Date(currentBusiness.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <InstagramModal
        isOpen={showInstagramModal}
        onClose={() => setShowInstagramModal(false)}
        onConnect={handleInstagramConnect}
      />
    </div>
  );
};