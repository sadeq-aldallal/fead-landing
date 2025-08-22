import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { Organization, Business, DashboardState } from '../types/dashboard';

interface DashboardContextType extends DashboardState {
  createOrganization: (data: Omit<Organization, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<{ error: any }>;
  createBusiness: (name: string, organizationId: string) => Promise<{ error: any }>;
  updateBusiness: (id: string, data: Partial<Business>) => Promise<{ error: any }>;
  refreshBusinessData: (businessId: string) => Promise<{ error: any }>;
  setCurrentBusiness: (business: Business | null) => void;
  fetchOrganizationData: () => Promise<void>;
  processInstagramCode: (code: string, businessId: string) => Promise<{ error: any }>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    organization: null,
    businesses: [],
    currentBusiness: null,
    loading: true,
    error: null
  });

  const fetchOrganizationData = async () => {
    if (!user) return;

    try {
      setDashboardState(prev => ({ ...prev, loading: true, error: null }));

      // Fetch organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('user_id', user.id)
        .limit(1);

      if (orgError) {
        throw orgError;
      }

      const organization = orgData && orgData.length > 0 ? orgData[0] : null;

      let businesses: Business[] = [];
      if (organization) {
        // Fetch businesses
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('org_id', organization.id)
          .order('created_at', { ascending: false });

        if (businessError) {
          throw businessError;
        }

        businesses = businessData || [];
      }

      setDashboardState(prev => ({
        ...prev,
        organization,
        businesses,
        loading: false
      }));
    } catch (error: any) {
      console.error('Error fetching organization data:', error);
      setDashboardState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
    }
  };

  const createOrganization = async (data: Omit<Organization, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: { message: 'User not authenticated' } };

    try {
      const { data: orgData, error } = await supabase
        .from('organizations')
        .insert([{ ...data, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setDashboardState(prev => ({
        ...prev,
        organization: orgData
      }));

      return { error: null };
    } catch (error: any) {
      console.error('Error creating organization:', error);
      return { error };
    }
  };

  const createBusiness = async (name: string, organizationId: string) => {
    if (!user) return { error: { message: 'User not authenticated' } };

    try {
      const { data: businessData, error } = await supabase
        .from('businesses')
        .insert([{ 
          name, 
          org_id: organizationId, 
          user_id: user.id,
          permissions: {},
          instagram_status: 'disconnected'
        }])
        .select()
        .single();

      if (error) throw error;

      setDashboardState(prev => ({
        ...prev,
        businesses: [businessData, ...prev.businesses]
      }));

      return { error: null };
    } catch (error: any) {
      console.error('Error creating business:', error);
      return { error };
    }
  };

  const updateBusiness = async (id: string, data: Partial<Business>) => {
    try {
      const { data: businessData, error } = await supabase
        .from('businesses')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setDashboardState(prev => ({
        ...prev,
        businesses: prev.businesses.map(b => b.id === id ? businessData : b),
        currentBusiness: prev.currentBusiness?.id === id ? businessData : prev.currentBusiness
      }));

      return { error: null };
    } catch (error: any) {
      console.error('Error updating business:', error);
      return { error };
    }
  };

  const getCurrentBusiness = async () => {
    if (!dashboardState.currentBusiness) return null;
    
    try {
      const { data: businessData, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', dashboardState.currentBusiness.id)
        .single();

      if (error) throw error;
      return businessData;
    } catch (error) {
      console.error('Error getting current business:', error);
      return null;
    }
  };

  const refreshBusinessData = async (businessId: string) => {
    try {
      const { data: businessData, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      if (error) throw error;

      setDashboardState(prev => ({
        ...prev,
        businesses: prev.businesses.map(b => b.id === businessId ? businessData : b),
        currentBusiness: prev.currentBusiness?.id === businessId ? businessData : prev.currentBusiness
      }));

      return { error: null };
    } catch (error: any) {
      console.error('Error refreshing business data:', error);
      return { error };
    }
  };

  const processInstagramCode = async (code: string, businessId: string) => {
    try {
      console.log('DashboardContext: Processing Instagram OAuth callback:', {
        code: code,
        businessId,
        businessName: dashboardState.businesses.find(b => b.id === businessId)?.name
      });

      // Update business status to connecting
      await updateBusiness(businessId, { instagram_status: 'connecting' });
      
      console.log('DashboardContext: Sending code to n8n webhook...');
      
      // Send code directly to N8N webhook
      const webhookResponse = await fetch('https://fead.app.n8n.cloud/webhook-test/fb9e4641-dc87-4d30-af15-e7b775482125', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          code,
          business_id: businessId,
          business_name: dashboardState.businesses.find(b => b.id === businessId)?.name
        })
      });

      console.log('DashboardContext: Webhook response status:', webhookResponse.status);
      
      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text();
        console.error('DashboardContext: Webhook error response:', errorText);
        throw new Error(`Webhook request failed: ${webhookResponse.status} - ${errorText}. Make sure your n8n workflow is ACTIVE (not in test mode).`);
      }

      const webhookResult = await webhookResponse.json();
      console.log('DashboardContext: Webhook result:', webhookResult);

      // Check for success in the response
      if (!webhookResult.success && webhookResult.status !== 'created') {
        throw new Error(`Unexpected webhook response: ${JSON.stringify(webhookResult)}. Check if n8n workflow is active.`);
      }

      // Poll for connection status
      const maxAttempts = 30;
      let attempts = 0;
      
      while (attempts < maxAttempts) {
        attempts++;
        console.log(`DashboardContext: Polling attempt ${attempts}/${maxAttempts}`);
        
        // Refresh business data
        await refreshBusinessData(businessId);
        
        // Get the updated business from state
        const updatedBusiness = dashboardState.businesses.find(b => b.id === businessId);
        
        if (updatedBusiness?.instagram_status === 'connected' && updatedBusiness?.instagram_username) {
          console.log('DashboardContext: Instagram connection successful!');
          break;
        }
        
        if (attempts < maxAttempts) {
          console.log('DashboardContext: Connection not ready, continuing to poll...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          console.log('DashboardContext: Polling timeout reached');
          // Update business status to error on timeout
          await updateBusiness(businessId, { instagram_status: 'error' });
        }
      }

      return { error: null };
    } catch (error: any) {
      console.error('DashboardContext: Error processing Instagram code:', error);
      // Update business status to error on failure
      await updateBusiness(businessId, { instagram_status: 'error' });
      return { error };
    }
  };

  const setCurrentBusiness = (business: Business | null) => {
    setDashboardState(prev => ({
      ...prev,
      currentBusiness: business
    }));
  };

  useEffect(() => {
    if (user) {
      fetchOrganizationData();
    } else {
      setDashboardState({
        organization: null,
        businesses: [],
        currentBusiness: null,
        loading: false,
        error: null
      });
    }
  }, [user]);

  const value: DashboardContextType = {
    ...dashboardState,
    createOrganization,
    createBusiness,
    updateBusiness,
    refreshBusinessData,
    setCurrentBusiness,
    fetchOrganizationData,
    processInstagramCode
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};