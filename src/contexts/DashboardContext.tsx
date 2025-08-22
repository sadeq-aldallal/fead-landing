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
      // Update business status to connecting
      await updateBusiness(businessId, { instagram_status: 'connecting' });

      // Clean the code (remove last 2 characters if they are #_)
      const cleanCode = code.endsWith('#_') ? code.slice(0, -2) : code;

      // Send to N8N webhook
      const response = await fetch('https://fead.app.n8n.cloud/webhook/fb9e4641-dc87-4d30-af15-e7b775482125', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: cleanCode, business_id: businessId })
      });

      if (!response.ok) {
        throw new Error(`N8N webhook failed: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Update business with Instagram data
        await updateBusiness(businessId, {
          instagram_username: result.username,
          instagram_account_id: result.account_id,
          instagram_status: 'connected'
        });
        return { error: null };
      } else {
        // Update status to error
        await updateBusiness(businessId, { instagram_status: 'error' });
        return { error: { message: result.error || 'Instagram connection failed' } };
      }
    } catch (error: any) {
      console.error('Error processing Instagram code:', error);
      // Update status to error
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