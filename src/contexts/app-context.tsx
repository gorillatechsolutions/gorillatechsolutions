
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { App } from '@/types/app';
import { apps as demoApps } from '@/lib/apps-data';

interface AppContextType {
  apps: App[];
  loading: boolean;
  getAppBySlug: (slug: string) => App | null;
  addApp: (app: App) => void;
  updateApp: (slug: string, app: App) => void;
  deleteApp: (slug: string) => void;
  slugExists: (slug: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const APPS_STORAGE_KEY = 'apps';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  const syncApps = useCallback(() => {
    try {
        const storedApps = localStorage.getItem(APPS_STORAGE_KEY);
        if (storedApps) {
            setApps(JSON.parse(storedApps));
        } else {
            localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(demoApps));
            setApps(demoApps);
        }
    } catch (e) {
        console.error("Failed to parse apps from localStorage", e);
        setApps(demoApps);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncApps();
  }, [syncApps]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === APPS_STORAGE_KEY) {
        syncApps();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncApps]);

  const getAppBySlug = (slug: string): App | null => {
    return apps.find(p => p.slug === slug) || null;
  };

  const addApp = (app: App) => {
    const updatedApps = [app, ...apps];
    setApps(updatedApps);
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updatedApps));
  };

  const updateApp = (slug: string, appData: App) => {
    const updatedApps = apps.map(p => (p.slug === slug ? appData : p));
    setApps(updatedApps);
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updatedApps));
  };

  const deleteApp = (slug: string) => {
    const updatedApps = apps.filter(p => p.slug !== slug);
    setApps(updatedApps);
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updatedApps));
  };
  
  const slugExists = (slug: string): boolean => {
      return apps.some(p => p.slug === slug);
  };

  return (
    <AppContext.Provider value={{ apps, loading, getAppBySlug, addApp, updateApp, deleteApp, slugExists }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
};
