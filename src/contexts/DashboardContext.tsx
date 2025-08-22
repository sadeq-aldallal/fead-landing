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
        .single();

      if (orgError && orgError.code !== 'PGRST116') {
        throw orgError;
      }

      let businesses: Business[] = [];
      if (orgData) {
        // Fetch businesses
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('organization_id', orgData.id)
          .order('created_at', { ascending: false });

        if (businessError) {
          throw businessError;
        }

        businesses = businessData || [];
      }

      setDashboardState(prev => ({
        ...prev,
        organization: orgData,
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
    try {
      const { data: businessData, error } = await supabase
        .from('businesses')
        .insert([{ name, organization_id: organizationId }])
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
    fetchOrganizationData
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};