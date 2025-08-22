export interface Organization {
  id: string;
  name: string;
  phone: string;
  email: string;
  country: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Business {
  id: string;
  name: string;
  org_id: string;
  user_id: string;
  permissions: Record<string, any>;
  token_expire?: string;
  instagram_username?: string;
  instagram_account_id?: string;
  instagram_status: 'disconnected' | 'connecting' | 'connected' | 'error';
  created_at: string;
  updated_at: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface DashboardState {
  organization: Organization | null;
  businesses: Business[];
  currentBusiness: Business | null;
  loading: boolean;
  error: string | null;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface InstagramOAuthResponse {
  success: boolean;
  username?: string;
  account_id?: string;
  error?: string;
}