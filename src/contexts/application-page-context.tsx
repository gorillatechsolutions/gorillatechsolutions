
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ApplicationPageContent } from '@/types/application-page';

const defaultApplicationPageContent: ApplicationPageContent = {
    metaTitle: "Collab With Us | Gorilla Tech Solutions",
    metaDescription: "Join our team of innovators and help us build the future of digital marketing. We're looking for passionate individuals to grow with us.",
    metaKeywords: "digital marketing jobs, seo careers, ppc jobs, web developer jobs",
    metaOgImage: "https://placehold.co/1200x630.png",
    heroTitle: "Collab with Us",
    heroSubtitle: "Join our team of innovators and help us build the future of digital marketing. We're looking for passionate individuals to grow with us.",
};

interface ApplicationPageContextType {
  content: ApplicationPageContent;
  loading: boolean;
  updateContent: (newContent: Partial<ApplicationPageContent>) => void;
}

const ApplicationPageContext = createContext<ApplicationPageContextType | undefined>(undefined);

const APPLICATION_PAGE_STORAGE_KEY = 'applicationPageContent';

export const ApplicationPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ApplicationPageContent>(defaultApplicationPageContent);
  const [loading, setLoading] = useState(true);

  const syncContent = useCallback(() => {
    try {
      const storedContent = localStorage.getItem(APPLICATION_PAGE_STORAGE_KEY);
      if (storedContent) {
        const parsed = JSON.parse(storedContent);
        const withDefaults = { ...defaultApplicationPageContent, ...parsed };
        setContent(withDefaults);
      } else {
        localStorage.setItem(APPLICATION_PAGE_STORAGE_KEY, JSON.stringify(defaultApplicationPageContent));
        setContent(defaultApplicationPageContent);
      }
    } catch (e) {
      console.error("Failed to parse application page content from localStorage", e);
      setContent(defaultApplicationPageContent);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncContent();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === APPLICATION_PAGE_STORAGE_KEY) {
        syncContent();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncContent]);

  const updateContent = (newContent: Partial<ApplicationPageContent>) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, ...newContent };
      localStorage.setItem(APPLICATION_PAGE_STORAGE_KEY, JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  return (
    <ApplicationPageContext.Provider value={{ content, loading, updateContent }}>
      {children}
    </ApplicationPageContext.Provider>
  );
};

export const useApplicationPage = (): ApplicationPageContextType => {
  const context = useContext(ApplicationPageContext);
  if (context === undefined) {
    throw new Error('useApplicationPage must be used within an ApplicationPageProvider');
  }
  return context;
};
