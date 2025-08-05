
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
  avatar?: string;
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
  updateUser: (originalEmail: string, userData: Partial<User>) => void;
  getUserByEmail: (email: string) => User | null;
  updateAvatarsByRole: (roles: UserRole[], avatarUrl: string) => void;
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
    address: '123 Admin Way, Suite 100, Capital City, USA 12345',
    avatar: 'https://i.ibb.co/1mgpC4j/g-logo.png',
  },
  {
    name: 'Jane Doe',
    username: 'jane.doe',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    phone: '234-567-8901',
    address: '456 User St, Apt 2B, Townsville, USA 67890',
    avatar: 'https://i.ibb.co/1mgpC4j/g-logo.png',
  },
  {
    name: 'John Smith',
    username: 'john.smith',
    email: 'john@example.com',
    password: 'password123',
    role: 'premium',
    phone: '345-678-9012',
    address: '789 Premium Blvd, Penthouse, Metropolis, USA 11223',
    avatar: 'https://i.ibb.co/1mgpC4j/g-logo.png',
  },
  {
    name: 'Alice Johnson',
    username: 'alice.j',
    email: 'alice@example.com',
    password: 'password123',
    role: 'gold',
    phone: '456-789-0123',
    address: '101 Gold Cir, Gold City, USA 44556',
    avatar: 'https://i.ibb.co/1mgpC4j/g-logo.png',
  },
  {
    name: 'Bob Williams',
    username: 'bobbyw',
    email: 'bob@example.com',
    password: 'password123',
    role: 'platinum',
    phone: '567-890-1234',
    address: '210 Platinum Rd, Platinum Heights, USA 77889',
    avatar: 'https://i.ibb.co/1mgpC4j/g-logo.png',
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
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncState();

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


  const login = (identifier: string, password) => {
    const userToLogin = users.find(
      (u) =>
        (u.email.toLowerCase() === identifier.toLowerCase() ||
          u.username.toLowerCase() === identifier.toLowerCase()) &&
        u.password === password
    );

    if (userToLogin) {
      const { password, ...userWithoutPassword } = userToLogin;
      setUser(userWithoutPassword);
      localStorage.setItem(
        CURRENT_USER_STORAGE_KEY,
        JSON.stringify(userWithoutPassword)
      );
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
    const newUser: User = { name, username, email, password, role: 'user', address: '', phone: '', avatar: 'https://i.ibb.co/1mgpC4j/g-logo.png' };
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

  const updateUser = (originalEmail: string, userData: Partial<User>) => {
    let updatedCurrentUserInList: User | undefined;
    const updatedUsers = users.map(u => {
      if (u.email === originalEmail) {
        const { password, ...rest } = userData;
        const newUserData = { ...u, ...rest };
        if (password) {
          newUserData.password = password;
        }
        updatedCurrentUserInList = newUserData;
        return newUserData;
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    if (user && user.email === originalEmail && updatedCurrentUserInList) {
        const { password, ...userWithoutPassword } = updatedCurrentUserInList;
        setUser(userWithoutPassword);
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    }
  };

  const updateAvatarsByRole = (roles: UserRole[], avatarUrl: string) => {
    const updatedUsers = users.map(u => {
      if (roles.includes(u.role)) {
        return { ...u, avatar: avatarUrl };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    // Also update current user if their role was affected
    if (user && roles.includes(user.role)) {
      const updatedCurrentUser = { ...user, avatar: avatarUrl };
      setUser(updatedCurrentUser);
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(updatedCurrentUser));
    }
  };

  const getUserByEmail = (email: string) => {
      return users.find(u => u.email === email) || null;
  };


  return (
    <AuthContext.Provider value={{ user, users, loading, login, logout, signup, emailExists, usernameExists, deleteUsers, addUser, updateUser, getUserByEmail, updateAvatarsByRole }}>
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
