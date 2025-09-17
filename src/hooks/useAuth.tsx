import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'citizen' | 'department' | 'worker' | 'municipal' | 'state';

interface User {
  id: string;
  mobile: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (mobile: string, otp: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy credentials for testing
const DUMMY_CREDENTIALS = {
  '1234567890': { otp: '123456', role: 'citizen' as UserRole, name: 'John Citizen' },
  '2345678901': { otp: '234567', role: 'department' as UserRole, name: 'Sarah Department Officer' },
  '3456789012': { otp: '345678', role: 'worker' as UserRole, name: 'Mike Field Worker' },
  '4567890123': { otp: '456789', role: 'municipal' as UserRole, name: 'David Municipal Authority' },
  '5678901234': { otp: '567890', role: 'state' as UserRole, name: 'Lisa State Official' },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (mobile: string, otp: string) => {
    // Check dummy credentials
    const credential = DUMMY_CREDENTIALS[mobile as keyof typeof DUMMY_CREDENTIALS];
    
    if (!credential) {
      return { success: false, error: 'Mobile number not found in system' };
    }
    
    if (credential.otp !== otp) {
      return { success: false, error: 'Invalid OTP' };
    }

    const newUser: User = {
      id: `user-${mobile}`,
      mobile,
      role: credential.role,
      name: credential.name,
    };
    
    setUser(newUser);
    return { success: true, role: credential.role };
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};