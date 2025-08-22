import React, { useState, useEffect } from 'react';
import { Instagram, RefreshCw, AlertCircle, CheckCircle, ExternalLink, HelpCircle, Clock, PartyPopper } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { InstagramModal } from '../modals/InstagramModal';
import { Button } from '../ui/Button';

export const BusinessView: React.FC = () => {
  const { currentBusiness, refreshBusinessData, processInstagramCode } = useDashboard();
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isProcessingConnection, setIsProcessingConnection] = useState(false);
  
  // Check if we're currently processing OAuth (business status is 'connecting')
  const isProcessingOAuth = currentBusiness?.instagram_status === 'connecting';

  const handleInstagramConnect = () => {
    const clientId = '1292743865568326';
    const redirectUri = 'https://fead.app/';
    const scope = 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights';
    
    setIsProcessingConnection(true);
    setError('');
    setSuccess('');
    
    const authUrl = `https://www.instagram.com/oauth/authorize?force_reauth=false&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    
    window.location.href = authUrl;
  };

  // Listen for successful Instagram connections
  useEffect(() => {
    if (currentBusiness?.instagram_status === 'connected' && 
        currentBusiness?.is_webhook_subscribed === true && 
        isProcessingConnection) {
      setSuccess('Hooray! Your Instagram account has successfully connected');
      setIsProcessingConnection(false);
      setError('');
    }
  }, [currentBusiness, isProcessingConnection]);

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

  const isConnected = currentBusiness.instagram_status === 'connected';
  const isConnecting = currentBusiness.instagram_status === 'connecting';
  const hasError = currentBusiness.instagram_status === 'error';
  const isPending = isProcessingOAuth || isConnecting;

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
          <div className="flex items-center">
            {success.includes('Hooray') && (
              <PartyPopper size={20} className="mr-2 text-green-400" />
            )}
            <p>{success}</p>
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

        {isConnected ? (
          /* Connected State */
          <div className="instagram-account-card">
            <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center">
              <Instagram size={40} className="text-pink-400" />
            </div>
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
        ) : isConnecting ? (
          /* Connecting State */
          <div className="instagram-connection">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center relative">
                <RefreshCw size={32} className="text-yellow-400 animate-spin" />
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-ping"></div>
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
        ) : isPending || isProcessingConnection ? (
          /* OAuth Processing State */
          <div className="instagram-connection">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center relative">
                <Clock size={32} className="text-orange-400" />
                <div className="absolute inset-0 rounded-full border-2 border-orange-400/30 animate-ping"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              {isProcessingConnection ? 'Finalizing Instagram Connection' : 'Processing OAuth Connection'}
            </h3>
            <p className="text-white/70 mb-6">
              {isProcessingConnection 
                ? 'We\'re finalizing your Instagram connection and setting up webhooks. This may take a few moments...'
                : 'We\'re processing your Instagram authorization. Please wait while we establish the connection.'}
            </p>
            <div className="flex items-center justify-center space-x-2 text-orange-400">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : hasError ? (
          /* Error State */
          <div className="instagram-connection">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle size={32} className="text-red-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Connection Failed</h3>
            <p className="text-white/70 mb-6">
              We apologize, but we couldn't connect your Instagram account. Please try again or contact support if the problem persists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowInstagramModal(true)}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              >
                <Instagram size={20} />
                <span>Try Again</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2"
              >
                <HelpCircle size={20} />
                <span>Get Help</span>
              </Button>
            </div>
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
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
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
            <label className="form-label">Status</label>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                currentBusiness.instagram_status === 'connected' ? 'bg-green-400' :
                currentBusiness.instagram_status === 'connecting' ? 'bg-yellow-400' :
                currentBusiness.instagram_status === 'error' ? 'bg-red-400' :
                'bg-gray-400'
              }`}></div>
              <span className={`text-sm ${
                currentBusiness.instagram_status === 'connected' ? 'status-connected' :
                currentBusiness.instagram_status === 'connecting' ? 'status-connecting' :
                currentBusiness.instagram_status === 'error' ? 'status-error' :
                'status-disconnected'
              }`}>
                {currentBusiness.instagram_status === 'connected' ? 'Instagram Connected' :
                 currentBusiness.instagram_status === 'connecting' ? 'Connecting to Instagram...' :
                 currentBusiness.instagram_status === 'error' ? 'Instagram Connection Error' :
                 'Instagram Not Connected'}
              </span>
            </div>
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