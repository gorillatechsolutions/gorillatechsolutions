
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { HomePageContent } from '@/types/home-page';

const defaultHomePageContent: HomePageContent = {
    heroTitle: "Elevate Your Digital Marketing",
    heroSubtitle: "Gorilla Tech Solutions drives growth with data-driven digital marketing strategies that convert. Let's build your brand's future, together.",
};

interface HomePageContextType {
  content: HomePageContent;
  loading: boolean;
  updateContent: (newContent: Partial<HomePageContent>) => void;
}

const HomePageContext = createContext<HomePageContextType | undefined>(undefined);

const HOME_PAGE_STORAGE_KEY = 'homePageContent';

export const HomePageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<HomePageContent>(defaultHomePageContent);
  const [loading, setLoading] = useState(true);

  const syncContent = useCallback(() => {
    try {
      const storedContent = localStorage.getItem(HOME_PAGE_STORAGE_KEY);
      if (storedContent) {
        const parsed = JSON.parse(storedContent);
        const withDefaults = { ...defaultHomePageContent, ...parsed };
        setContent(withDefaults);
      } else {
        localStorage.setItem(HOME_PAGE_STORAGE_KEY, JSON.stringify(defaultHomePageContent));
        setContent(defaultHomePageContent);
      }
    } catch (e) {
      console.error("Failed to parse home page content from localStorage", e);
      setContent(defaultHomePageContent);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncContent();
  }, [syncContent]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === HOME_PAGE_STORAGE_KEY) {
        syncContent();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncContent]);

  const updateContent = (newContent: Partial<HomePageContent>) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, ...newContent };
      localStorage.setItem(HOME_PAGE_STORAGE_KEY, JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  return (
    <HomePageContext.Provider value={{ content, loading, updateContent }}>
      {children}
    </HomePageContext.Provider>
  );
};

export const useHomePage = (): HomePageContextType => {
  const context = useContext(HomePageContext);
  if (context === undefined) {
    throw new Error('useHomePage must be used within a HomePageProvider');
  }
  return context;
};
