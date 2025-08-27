import React, { useState } from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Business</DialogTitle>
          <DialogDescription>
            Add a new business to your organization
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">
              Business Name *
            </Label>
            <Input
              id="business-name"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter business name"
              required
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-type">
              Business Type *
            </Label>
            <Select
              value={businessType}
              onValueChange={(value: 'retail' | 'service') => setBusinessType(value)}
              disabled={loading}
            >
              <SelectTrigger id="business-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
      </DialogContent>
    </Dialog>
  );
};