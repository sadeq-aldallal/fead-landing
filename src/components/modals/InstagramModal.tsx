import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

export const InstagramModal: React.FC<InstagramModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [confirmedProfessional, setConfirmedProfessional] = useState(false);

  const handleConnect = () => {
    if (acceptedTerms && confirmedProfessional) {
      console.log('Instagram connection initiated');
      onConnect();
    }
  };

  const canConnect = acceptedTerms && confirmedProfessional;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          onClick={onClose}
          className="modal-close"
        >
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Connect Instagram Account</h2>
          <p className="modal-subtitle">
            Please review and accept the following requirements before connecting your Instagram account
          </p>
        </div>

        <div className="space-y-6">
          {/* Legal Compliance Checkbox */}
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="checkbox-input"
            />
            <label htmlFor="terms" className="checkbox-label">
              I accept the{' '}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              ,{' '}
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>
              , and{' '}
              <a href="/account-deletion-policy" target="_blank" rel="noopener noreferrer">
                Account Deletion Policy
              </a>
            </label>
          </div>

          {/* Professional Account Checkbox */}
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="professional"
              checked={confirmedProfessional}
              onChange={(e) => setConfirmedProfessional(e.target.checked)}
              className="checkbox-input"
            />
            <label htmlFor="professional" className="checkbox-label">
              I confirm my Instagram account is a professional account (Business or Creator).{' '}
              <a 
                href="https://help.instagram.com/502981923235522" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                Learn how to convert to professional account
                <ExternalLink size={14} className="ml-1" />
              </a>
            </label>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h3 className="text-yellow-400 font-medium mb-2">Important Notice</h3>
            <p className="text-yellow-300 text-sm">
              Your Instagram account must be a Business or Creator account to use our services. 
              Personal accounts are not supported by Instagram's Business API.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConnect}
              disabled={!canConnect}
              className={`flex-1 ${!canConnect ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Connect Instagram
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};