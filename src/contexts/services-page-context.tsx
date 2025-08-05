
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ServicesPageContent } from '@/types/services-page';

const defaultServicesPageContent: ServicesPageContent = {
    metaTitle: "Our Services | Gorilla Tech Solutions",
    metaDescription: "Explore our comprehensive suite of digital marketing services, including SEO, PPC, content marketing, and more, all designed to drive growth.",
    metaKeywords: "digital marketing services, seo company, ppc management, content creation services",
    metaOgImage: "https://placehold.co/1200x630.png",
    heroTitle: "Our Digital Marketing Services",
    heroSubtitle: "A comprehensive suite of digital marketing services designed to elevate your brand and accelerate growth.",
};

interface ServicesPageContextType {
  content: ServicesPageContent;
  loading: boolean;
  updateContent: (newContent: Partial<ServicesPageContent>) => void;
}

const ServicesPageContext = createContext<ServicesPageContextType | undefined>(undefined);

const SERVICES_PAGE_STORAGE_KEY = 'servicesPageContent';

export const ServicesPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ServicesPageContent>(defaultServicesPageContent);
  const [loading, setLoading] = useState(true);

  const syncContent = useCallback(() => {
    try {
      const storedContent = localStorage.getItem(SERVICES_PAGE_STORAGE_KEY);
      if (storedContent) {
        const parsed = JSON.parse(storedContent);
        const withDefaults = { ...defaultServicesPageContent, ...parsed };
        setContent(withDefaults);
      } else {
        localStorage.setItem(SERVICES_PAGE_STORAGE_KEY, JSON.stringify(defaultServicesPageContent));
        setContent(defaultServicesPageContent);
      }
    } catch (e) {
      console.error("Failed to parse services page content from localStorage", e);
      setContent(defaultServicesPageContent);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncContent();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === SERVICES_PAGE_STORAGE_KEY) {
        syncContent();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncContent]);

  const updateContent = (newContent: Partial<ServicesPageContent>) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, ...newContent };
      localStorage.setItem(SERVICES_PAGE_STORAGE_KEY, JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  return (
    <ServicesPageContext.Provider value={{ content, loading, updateContent }}>
      {children}
    </ServicesPageContext.Provider>
  );
};

export const useServicesPage = (): ServicesPageContextType => {
  const context = useContext(ServicesPageContext);
  if (context === undefined) {
    throw new Error('useServicesPage must be used within a ServicesPageProvider');
  }
  return context;
};
