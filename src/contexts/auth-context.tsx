
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type User = {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
};

interface AuthContextType {
  user: User | null;
  users: User[];
  loading: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
  userExists: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'users';
const CURRENT_USER_STORAGE_KEY = 'user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const syncUsers = useCallback(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      const allUsers = storedUsers ? JSON.parse(storedUsers) : [];
      const adminExists = allUsers.some((u: User) => u.email === 'admin@example.com');

      if (!adminExists) {
        allUsers.push({
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'adminpassword',
          role: 'admin',
        });
      }
      setUsers(allUsers);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(allUsers));
    } catch (e) {
        console.error("Failed to parse users from localStorage", e);
        setUsers([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    syncUsers();
    try {
      const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch(e) {
        console.error("Failed to parse current user from localStorage", e);
        setUser(null);
    }
    setLoading(false);
  }, [syncUsers]);

  // Listen for storage changes to sync across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === USERS_STORAGE_KEY) {
        syncUsers();
      }
      if (event.key === CURRENT_USER_STORAGE_KEY) {
        const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
        setUser(storedUser ? JSON.parse(storedUser) : null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncUsers]);


  const login = (email: string, password: string): User | null => {
    const userToLogin = users.find((u) => u.email === email && u.password === password);
    if (userToLogin) {
      const { password, ...userWithoutPassword } = userToLogin;
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    router.push('/login');
  };

  const signup = (name: string, email: string, password: string) => {
    const newUser: User = { name, email, password, role: 'user' };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };
  
  const userExists = (email: string): boolean => {
      return users.some(u => u.email === email);
  }

  return (
    <AuthContext.Provider value={{ user, users, loading, login, logout, signup, userExists }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
