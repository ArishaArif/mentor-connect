import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  socialLogin: (provider: 'google' | 'linkedin') => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      role: 'student',
      emailVerified: true,
      createdAt: new Date(),
      profileCompleted: false,
    });
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      role,
      emailVerified: false,
      createdAt: new Date(),
      profileCompleted: false,
    });
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const socialLogin = useCallback(async (provider: 'google' | 'linkedin') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser({
      id: '1',
      email: `user@${provider}.com`,
      role: 'student',
      emailVerified: true,
      createdAt: new Date(),
      profileCompleted: false,
    });
    setIsLoading(false);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  }, []);

  const verifyEmail = useCallback(async (token: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (user) {
      setUser({ ...user, emailVerified: true });
    }
    setIsLoading(false);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        socialLogin,
        resetPassword,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
