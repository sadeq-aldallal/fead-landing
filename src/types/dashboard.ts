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
  photo_url?: string;
  organization_id: string;
  instagram_code?: string;
  instagram_username?: string;
  instagram_account_id?: string;
  instagram_profile_photo?: string;
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