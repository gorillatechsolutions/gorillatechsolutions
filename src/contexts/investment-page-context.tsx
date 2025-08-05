
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { InvestmentPageContent } from '@/types/investment-page';

const defaultInvestmentPageContent: InvestmentPageContent = {
    metaTitle: "Invest With Us | Gorilla Tech Solutions",
    metaDescription: "Discover the opportunity to partner with a leader in the tech industry and invest in the future of digital innovation.",
    metaKeywords: "invest in tech, digital marketing investment, saas investment",
    metaOgImage: "https://placehold.co/1200x630.png",
    heroTitle: "Invest in the Future of Digital",
    heroSubtitle: "We are at the forefront of digital innovation, driving growth for businesses worldwide. Discover the opportunity to partner with a leader in the tech industry.",
};

interface InvestmentPageContextType {
  content: InvestmentPageContent;
  loading: boolean;
  updateContent: (newContent: Partial<InvestmentPageContent>) => void;
}

const InvestmentPageContext = createContext<InvestmentPageContextType | undefined>(undefined);

const INVESTMENT_PAGE_STORAGE_KEY = 'investmentPageContent';

export const InvestmentPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<InvestmentPageContent>(defaultInvestmentPageContent);
  const [loading, setLoading] = useState(true);

  const syncContent = useCallback(() => {
    try {
      const storedContent = localStorage.getItem(INVESTMENT_PAGE_STORAGE_KEY);
      if (storedContent) {
        const parsed = JSON.parse(storedContent);
        const withDefaults = { ...defaultInvestmentPageContent, ...parsed };
        setContent(withDefaults);
      } else {
        localStorage.setItem(INVESTMENT_PAGE_STORAGE_KEY, JSON.stringify(defaultInvestmentPageContent));
        setContent(defaultInvestmentPageContent);
      }
    } catch (e) {
      console.error("Failed to parse investment page content from localStorage", e);
      setContent(defaultInvestmentPageContent);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncContent();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === INVESTMENT_PAGE_STORAGE_KEY) {
        syncContent();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncContent]);

  const updateContent = (newContent: Partial<InvestmentPageContent>) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, ...newContent };
      localStorage.setItem(INVESTMENT_PAGE_STORAGE_KEY, JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  return (
    <InvestmentPageContext.Provider value={{ content, loading, updateContent }}>
      {children}
    </InvestmentPageContext.Provider>
  );
};

export const useInvestmentPage = (): InvestmentPageContextType => {
  const context = useContext(InvestmentPageContext);
  if (context === undefined) {
    throw new Error('useInvestmentPage must be used within an InvestmentPageProvider');
  }
  return context;
};
