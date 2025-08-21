import { createClient } from '@supabase/supabase-js'

// Get environment variables and validate them
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

// For development, use mock values if environment variables are not set
const defaultUrl = 'https://mock-project.supabase.co'
const defaultKey = 'mock-anon-key'

// Use provided values or fallback to defaults
const finalUrl = supabaseUrl && supabaseUrl !== 'https://your-project-ref.supabase.co' ? supabaseUrl : defaultUrl
const finalKey = supabaseAnonKey && supabaseAnonKey !== 'your-anon-public-key-here' ? supabaseAnonKey : defaultKey

// Only show warning if using mock values
if (finalUrl === defaultUrl || finalKey === defaultKey) {
  console.warn('⚠️  Using mock Supabase credentials. Authentication will not work.')
  console.warn('📝 To enable authentication:')
  console.warn('   1. Create a Supabase project at https://supabase.com')
  console.warn('   2. Get your Project URL and anon key from Settings > API')
  console.warn('   3. Update your .env.local file with real credentials')
  console.warn('   4. Restart your development server')
}

console.log('Supabase client initialized with URL:', finalUrl.substring(0, 30) + '...')

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
})

// Auth helper functions
export const authHelpers = {
  signUp: async (email: string, password: string, userData?: any) => {
    if (finalUrl === defaultUrl) {
      return { data: null, error: { message: 'Authentication disabled: Please configure Supabase credentials' } }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: userData
      }
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    if (finalUrl === defaultUrl) {
      return { data: null, error: { message: 'Authentication disabled: Please configure Supabase credentials' } }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    if (finalUrl === defaultUrl) {
      return { error: null }
    }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  resetPassword: async (email: string) => {
    if (finalUrl === defaultUrl) {
      return { data: null, error: { message: 'Authentication disabled: Please configure Supabase credentials' } }
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    return { data, error }
  },

  updatePassword: async (password: string) => {
    if (finalUrl === defaultUrl) {
      return { data: null, error: { message: 'Authentication disabled: Please configure Supabase credentials' } }
    }
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    return { data, error }
  },

  getCurrentUser: async () => {
    if (finalUrl === defaultUrl) {
      return { user: null, error: null }
    }
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  getSession: async () => {
    if (finalUrl === defaultUrl) {
      return { session: null, error: null }
    }
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}