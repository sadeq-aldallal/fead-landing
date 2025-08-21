import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('fead_token');
    const userData = localStorage.getItem('fead_user');
    
    if (token && userData) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(userData),
        loading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('fead_token', 'mock_token');
    localStorage.setItem('fead_user', JSON.stringify(mockUser));
    
    setAuthState({
      isAuthenticated: true,
      user: mockUser,
      loading: false,
    });
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('fead_token', 'mock_token');
    localStorage.setItem('fead_user', JSON.stringify(mockUser));
    
    setAuthState({
      isAuthenticated: true,
      user: mockUser,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('fead_token');
    localStorage.removeItem('fead_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};