'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { authApi } from '../lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  setMockUser: (role: 'user' | 'admin') => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('concert_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed === 'object' && parsed.id) {
          setUser(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load user from localStorage:', error);
      localStorage.removeItem('concert_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);
      setUser(response.user);
      localStorage.setItem('concert_user', JSON.stringify(response.user));
      localStorage.setItem('token', response.access_token);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role?: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.register(name, email, password, role);
      setUser(response.user);
      localStorage.setItem('concert_user', JSON.stringify(response.user));
      localStorage.setItem('token', response.access_token);
    } finally {
      setIsLoading(false);
    }
  };

  const setMockUser = (role: 'user' | 'admin') => {
    const mockUser: User = {
      id: '99',
      email: role === 'admin' ? 'admin@example.com' : 'user@example.com',
      name: role === 'admin' ? 'Admin' : 'User',
      role,
    };
    setUser(mockUser);
    localStorage.setItem('concert_user', JSON.stringify(mockUser));
    // No real token for mock user, but we can set a dummy one if needed
    localStorage.setItem('token', 'mock_token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('concert_user');
    localStorage.removeItem('token');
  };

  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    setMockUser,
    isLoading
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}