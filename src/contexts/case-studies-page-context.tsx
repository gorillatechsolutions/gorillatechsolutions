
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CaseStudiesPageContent } from '@/types/case-studies-page';

const defaultCaseStudiesPageContent: CaseStudiesPageContent = {
    metaTitle: "Case Studies | Gorilla Tech Solutions",
    metaDescription: "Explore our success stories and see the real-world results we've delivered for clients across various industries through our expert digital marketing strategies.",
    metaKeywords: "digital marketing case studies, seo results, ppc success stories, client testimonials",
    metaOgImage: "https://placehold.co/1200x630.png",
    heroTitle: "Case Studies",
    heroSubtitle: "Explore our success stories and see the real-world results we've delivered.",
};

interface CaseStudiesPageContextType {
  content: CaseStudiesPageContent;
  loading: boolean;
  updateContent: (newContent: Partial<CaseStudiesPageContent>) => void;
}

const CaseStudiesPageContext = createContext<CaseStudiesPageContextType | undefined>(undefined);

const CASE_STUDIES_PAGE_STORAGE_KEY = 'caseStudiesPageContent';

export const CaseStudiesPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CaseStudiesPageContent>(defaultCaseStudiesPageContent);
  const [loading, setLoading] = useState(true);

  const syncContent = useCallback(() => {
    try {
      const storedContent = localStorage.getItem(CASE_STUDIES_PAGE_STORAGE_KEY);
      if (storedContent) {
        const parsed = JSON.parse(storedContent);
        const withDefaults = { ...defaultCaseStudiesPageContent, ...parsed };
        setContent(withDefaults);
      } else {
        localStorage.setItem(CASE_STUDIES_PAGE_STORAGE_KEY, JSON.stringify(defaultCaseStudiesPageContent));
        setContent(defaultCaseStudiesPageContent);
      }
    } catch (e) {
      console.error("Failed to parse case studies page content from localStorage", e);
      setContent(defaultCaseStudiesPageContent);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncContent();
  }, [syncContent]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CASE_STUDIES_PAGE_STORAGE_KEY) {
        syncContent();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncContent]);

  const updateContent = (newContent: Partial<CaseStudiesPageContent>) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, ...newContent };
      localStorage.setItem(CASE_STUDIES_PAGE_STORAGE_KEY, JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  return (
    <CaseStudiesPageContext.Provider value={{ content, loading, updateContent }}>
      {children}
    </CaseStudiesPageContext.Provider>
  );
};

export const useCaseStudiesPage = (): CaseStudiesPageContextType => {
  const context = useContext(CaseStudiesPageContext);
  if (context === undefined) {
    throw new Error('useCaseStudiesPage must be used within a CaseStudiesPageProvider');
  }
  return context;
};
