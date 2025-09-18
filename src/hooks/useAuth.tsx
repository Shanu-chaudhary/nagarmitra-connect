import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'citizen' | 'department' | 'worker' | 'municipal' | 'state';

export type DepartmentKey = 'roads' | 'sanitation' | 'water' | 'municipal' | 'state';

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
  loginDepartment: (department: DepartmentKey, userId: string, password: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
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

// Dummy department login credentials
const DEPARTMENT_CREDENTIALS: Record<DepartmentKey, { userId: string; password: string; name: string; route: string; role: UserRole }> = {
  roads: { userId: 'roads.officer', password: 'roads@123', name: 'Sarah (Roads & Infra)', route: '/department', role: 'department' },
  sanitation: { userId: 'sanitation.officer', password: 'san@123', name: 'Anil (Health & Sanitation)', route: '/department/health', role: 'department' },
  water: { userId: 'water.officer', password: 'water@123', name: 'Neeraj (Water Department)', route: '/department/water', role: 'department' },
  municipal: { userId: 'municipal.admin', password: 'muni@123', name: 'Municipal Admin', route: '/municipal', role: 'municipal' },
  state: { userId: 'state.admin', password: 'state@123', name: 'State Admin', route: '/state', role: 'state' },
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

  const loginDepartment = async (department: DepartmentKey, userId: string, password: string) => {
    const creds = DEPARTMENT_CREDENTIALS[department];
    if (!creds) {
      return { success: false, error: 'Unknown department' };
    }
    if (creds.userId !== userId || creds.password !== password) {
      return { success: false, error: 'Invalid department credentials' };
    }
    const newUser: User = {
      id: `dept-${department}-${userId}`,
      mobile: '',
      role: creds.role,
      name: creds.name,
    };
    setUser(newUser);
    return { success: true, role: creds.role };
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loginDepartment,
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