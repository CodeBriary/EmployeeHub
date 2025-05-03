import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { employees, getEmployeeById } from '../data/employeeData';

// Types
export interface User {
  username: string;
  role: 'admin' | 'employee';
  name: string;
  employeeId?: number;
  email?: string;
  jobTitle?: string;
  division?: string;
  salary?: number;
  hireDate?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication function
const authenticateUser = (username: string, password: string): User | null => {
  // For demo purposes, we'll use Snoopy's data
  const snoopy = employees.find(emp => emp.email.toLowerCase() === username.toLowerCase());
  
  if (snoopy && password === 'password') { // In real app, use proper password hashing
    return {
      username: snoopy.email,
      role: 'employee',
      name: `${snoopy.Fname} ${snoopy.Lname}`,
      employeeId: snoopy.empid,
      email: snoopy.email,
      jobTitle: snoopy.jobTitle,
      division: snoopy.division,
      salary: snoopy.Salary,
      hireDate: snoopy.HireDate
    };
  }
  
  // Admin login (hardcoded for demo)
  if (username === 'admin@example.com' && password === 'admin123') {
    return {
      username: 'admin@example.com',
      role: 'admin',
      name: 'System Administrator'
    };
  }
  
  return null;
};

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Check localStorage for existing user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user data', e);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  // Computed properties
  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';
  
  // Auth methods
  const login = (username: string, password: string) => {
    const userData = authenticateUser(username, password);
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid credentials');
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const value = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 