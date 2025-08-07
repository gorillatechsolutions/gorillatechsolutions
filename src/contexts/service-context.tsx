
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Service } from '@/types/service';

interface ServiceContextType {
  services: Service[];
  loading: boolean;
  getServiceBySlug: (slug: string) => Service | null;
  addService: (service: Service) => Promise<void>;
  updateService: (slug: string, service: Partial<Service>) => Promise<void>;
  deleteService: (slug: string) => Promise<void>;
  slugExists: (slug: string) => boolean;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data.services || []);
      } else {
        console.error('Failed to fetch services:', response.statusText);
        setServices([]);
      }
    } catch (error) {
      console.error('An error occurred while fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const getServiceBySlug = (slug: string): Service | null => {
    return services.find(s => s.slug === slug) || null;
  };

  const addService = async (service: Service) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });
      if (response.ok) {
        fetchServices(); // Refetch to get the latest list
      } else {
        throw new Error('Failed to add service');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  };

  const updateService = async (slug: string, serviceData: Partial<Service>) => {
    try {
        const response = await fetch('/api/services', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...serviceData, slug }),
        });

        if (response.ok) {
            fetchServices();
        } else {
            throw new Error('Failed to update service');
        }
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
  };

  const deleteService = async (slug: string) => {
     try {
        const response = await fetch('/api/services', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slugs: [slug] }),
        });

        if (response.ok) {
            fetchServices();
        } else {
            throw new Error('Failed to delete service');
        }
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error;
    }
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
