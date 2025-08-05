
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AppsPageContent } from '@/types/apps-page';

const defaultAppsPageContent: AppsPageContent = {
    metaTitle: "Our Apps | Gorilla Tech Solutions",
    metaDescription: "Discover our suite of powerful and intuitive applications designed to enhance productivity, streamline workflows, and drive business growth.",
    metaKeywords: "business apps, productivity software, mobile applications, web apps",
    metaOgImage: "https://placehold.co/1200x630.png",
    heroTitle: "Our Suite of Applications",
    heroSubtitle: "Discover powerful, intuitive, and beautifully designed applications to enhance your productivity, streamline workflows, and drive business growth.",
};

interface AppsPageContextType {
  content: AppsPageContent;
  loading: boolean;
  updateContent: (newContent: Partial<AppsPageContent>) => void;
}

const AppsPageContext = createContext<AppsPageContextType | undefined>(undefined);

const APPS_PAGE_STORAGE_KEY = 'appsPageContent';

export const AppsPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppsPageContent>(defaultAppsPageContent);
  const [loading, setLoading] = useState(true);

  const syncContent = useCallback(() => {
    try {
      const storedContent = localStorage.getItem(APPS_PAGE_STORAGE_KEY);
      if (storedContent) {
        const parsed = JSON.parse(storedContent);
        const withDefaults = { ...defaultAppsPageContent, ...parsed };
        setContent(withDefaults);
      } else {
        localStorage.setItem(APPS_PAGE_STORAGE_KEY, JSON.stringify(defaultAppsPageContent));
        setContent(defaultAppsPageContent);
      }
    } catch (e) {
      console.error("Failed to parse apps page content from localStorage", e);
      setContent(defaultAppsPageContent);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncContent();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === APPS_PAGE_STORAGE_KEY) {
        syncContent();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncContent]);

  const updateContent = (newContent: Partial<AppsPageContent>) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, ...newContent };
      localStorage.setItem(APPS_PAGE_STORAGE_KEY, JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  return (
    <AppsPageContext.Provider value={{ content, loading, updateContent }}>
      {children}
    </AppsPageContext.Provider>
  );
};

export const useAppsPage = (): AppsPageContextType => {
  const context = useContext(AppsPageContext);
  if (context === undefined) {
    throw new Error('useAppsPage must be used within a AppsPageProvider');
  }
  return context;
};
