
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Service } from '@/types/service';
import { initialServices } from '@/lib/services-data';

interface ServiceContextType {
  services: Service[];
  loading: boolean;
  getServiceBySlug: (slug: string) => Service | null;
  addService: (service: Service) => void;
  updateService: (slug: string, service: Service) => void;
  deleteService: (slug: string) => void;
  slugExists: (slug: string) => boolean;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const SERVICES_STORAGE_KEY = 'services';

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const syncServices = useCallback(() => {
    try {
        const storedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
        if (storedServices) {
            setServices(JSON.parse(storedServices));
        } else {
            localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(initialServices));
            setServices(initialServices);
        }
    } catch (e) {
        console.error("Failed to parse services from localStorage", e);
        setServices(initialServices);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncServices();
  }, [syncServices]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === SERVICES_STORAGE_KEY) {
        syncServices();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncServices]);

  const getServiceBySlug = (slug: string): Service | null => {
    return services.find(s => s.slug === slug) || null;
  };

  const addService = (service: Service) => {
    const updatedServices = [service, ...services];
    setServices(updatedServices);
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updatedServices));
  };

  const updateService = (slug: string, serviceData: Service) => {
    const updatedServices = services.map(s => (s.slug === slug ? serviceData : s));
    setServices(updatedServices);
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updatedServices));
  };

  const deleteService = (slug: string) => {
    const updatedServices = services.filter(s => s.slug !== slug);
    setServices(updatedServices);
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updatedServices));
  };
  
  const slugExists = (slug: string): boolean => {
      return services.some(s => s.slug === slug);
  };

  return (
    <ServiceContext.Provider value={{ services, loading, getServiceBySlug, addService, updateService, deleteService, slugExists }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};
