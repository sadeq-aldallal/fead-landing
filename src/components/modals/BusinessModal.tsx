import React, { useState } from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/Input';
import { AccessibleForm, FormInstructions } from '../ui/accessible-form';
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
      <DialogContent className="sm:max-w-md max-w-[95vw] mx-4">
        <DialogHeader>
          <DialogTitle>Create Business</DialogTitle>
          <DialogDescription>
            Add a new business to your organization
          </DialogDescription>
        </DialogHeader>

        <FormInstructions 
          instructions={[
            "Business name will be visible to your customers",
            "You can change the business type later if needed",
            "All fields marked with * are required"
          ]}
        />

        <AccessibleForm
          title=""
          description=""
          errorSummary={error ? [error] : []}
          onSubmit={handleSubmit}
        >
          <Input
            label="Business Name"
            id="business-name"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter business name"
            required
            disabled={loading}
            autoFocus
            autoComplete="organization"
            enterKeyHint="next"
            inputMode="text"
            helpText="This name will appear on your business profile and communications"
            screenReaderInstructions="Enter a descriptive name for your business. This will be shown to customers and used for identification."
          />

          <div className="space-y-3 sm:space-y-2">
            <Label htmlFor="business-type">
              Business Type *
            </Label>
            <Select
              value={businessType}
              onValueChange={(value: 'retail' | 'service') => setBusinessType(value)}
              disabled={loading}
            >
              <SelectTrigger id="business-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="w-full">
                    <div className="w-full">
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 sm:pt-2">
            <Button
              type="submit"
              loading={loading}
              loadingText="Creating..."
              className="w-full"
              size="lg"
            >
              Create Business
            </Button>
          </div>
        </AccessibleForm>
      </DialogContent>
    </Dialog>
  );
};