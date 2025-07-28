
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'user' | 'premium' | 'gold' | 'platinum';

export type User = {
  name: string;
  username: string;
  email: string;
  password?: string;
  phone?: string;
  role: UserRole;
  address?: string;
};

interface AuthContextType {
  user: User | null;
  users: User[];
  loading: boolean;
  login: (identifier: string, password: string) => User | null;
  logout: () => void;
  signup: (name: string, username: string, email: string, password: string) => void;
  emailExists: (email: string) => boolean;
  usernameExists: (username: string) => boolean;
  deleteUsers: (emails: string[]) => void;
  addUser: (user: User) => void;
  updateUser: (email: string, userData: Partial<User>) => void;
  getUserByEmail: (email: string) => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'users';
const CURRENT_USER_STORAGE_KEY = 'user';

const defaultUsers: User[] = [
  {
    name: 'Admin User',
    username: 'admin',
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin',
    phone: '123-456-7890',
    address: '123 Admin Way, Suite 100, Capital City, USA 12345'
  },
  {
    name: 'Jane Doe',
    username: 'jane.doe',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    phone: '234-567-8901',
    address: '456 User St, Apt 2B, Townsville, USA 67890'
  },
  {
    name: 'John Smith',
    username: 'john.smith',
    email: 'john@example.com',
    password: 'password123',
    role: 'premium',
    phone: '345-678-9012',
    address: '789 Premium Blvd, Penthouse, Metropolis, USA 11223'
  },
  {
    name: 'Alice Johnson',
    username: 'alice.j',
    email: 'alice@example.com',
    password: 'password123',
    role: 'gold',
    phone: '456-789-0123',
    address: '101 Gold Cir, Gold City, USA 44556'
  },
  {
    name: 'Bob Williams',
    username: 'bobbyw',
    email: 'bob@example.com',
    password: 'password123',
    role: 'platinum',
    phone: '567-890-1234',
    address: '210 Platinum Rd, Platinum Heights, USA 77889'
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const syncState = useCallback(() => {
    try {
      let allUsers: User[] = [];
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      
      if (storedUsers) {
        allUsers = JSON.parse(storedUsers);
      }
      
      const adminExists = allUsers.some(u => u.username === 'admin');
      if (!adminExists) {
        allUsers = defaultUsers;
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(allUsers));
      }
      
      setUsers(allUsers);
      
      const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
        console.error("Failed to parse data from localStorage", e);
        setUsers(defaultUsers);
        setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncState();
  }, [syncState]);

  // Listen for storage changes to sync across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === USERS_STORAGE_KEY || event.key === CURRENT_USER_STORAGE_KEY) {
        syncState();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncState]);


  const login = (identifier: string, password: string): User | null => {
    const userToLogin = users.find((u) => (u.email === identifier || u.username === identifier) && u.password === password);
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

  const signup = (name: string, username: string, email: string, password: string) => {
    const newUser: User = { name, username, email, password, role: 'user', address: '' };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };
  
  const emailExists = (email: string): boolean => {
      return users.some(u => u.email === email);
  }

  const usernameExists = (username: string): boolean => {
      return users.some(u => u.username === username);
  }

  const deleteUsers = (emails: string[]) => {
    const updatedUsers = users.filter(u => !emails.includes(u.email));
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  }

  const addUser = (newUser: User) => {
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
        const updatedCurrentUser = updatedUsers.find(u => u.email === email);
        if (updatedCurrentUser) {
            const { password, ...userWithoutPassword } = updatedCurrentUser;
            setUser(userWithoutPassword);
            localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
        }
    }
  };

  const getUserByEmail = (email: string) => {
      return users.find(u => u.email === email) || null;
  };


  return (
    <AuthContext.Provider value={{ user, users, loading, login, logout, signup, emailExists, usernameExists, deleteUsers, addUser, updateUser, getUserByEmail }}>
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
