
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'user' | 'premium' | 'gold' | 'platinum';

export type User = {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: UserRole;
};

interface AuthContextType {
  user: User | null;
  users: User[];
  loading: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
  userExists: (email: string) => boolean;
  deleteUsers: (emails: string[]) => void;
  addUser: (user: Omit<User, 'role'> & { role: UserRole }) => void;
  updateUser: (email: string, userData: Partial<User>) => void;
  getUserByEmail: (email: string) => User | null;
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
          phone: '123-456-7890'
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

  const deleteUsers = (emails: string[]) => {
    const updatedUsers = users.filter(u => !emails.includes(u.email));
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  }

  const addUser = (newUser: Omit<User, 'role'> & { role: UserRole }) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const updateUser = (email: string, userData: Partial<User>) => {
    const updatedUsers = users.map(u => {
      if (u.email === email) {
        // If password is an empty string, don't update it
        const { password, ...rest } = userData;
        const newUserData = { ...u, ...rest };
        if (password) {
          newUserData.password = password;
        }
        return newUserData;
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    // Also update current user if they are the one being edited
    if(user && user.email === email) {
        const { password, ...userWithoutPassword } = updatedUsers.find(u => u.email === email)!;
        setUser(userWithoutPassword);
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    }
  };

  const getUserByEmail = (email: string) => {
      return users.find(u => u.email === email) || null;
  };


  return (
    <AuthContext.Provider value={{ user, users, loading, login, logout, signup, userExists, deleteUsers, addUser, updateUser, getUserByEmail }}>
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
