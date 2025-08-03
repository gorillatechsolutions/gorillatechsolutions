
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CaseStudy } from '@/types/case-study';

interface CaseStudyContextType {
  caseStudies: CaseStudy[];
  loading: boolean;
  getCaseStudyBySlug: (slug: string) => CaseStudy | null;
  addCaseStudy: (post: CaseStudy) => void;
  updateCaseStudy: (slug: string, postData: Partial<CaseStudy>) => void;
  deleteCaseStudy: (slug: string) => void;
  slugExists: (slug: string) => boolean;
}

const CaseStudyContext = createContext<CaseStudyContextType | undefined>(undefined);

const CASE_STUDIES_STORAGE_KEY = 'caseStudies';

export const CaseStudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const syncCaseStudies = useCallback(() => {
    try {
        const storedPosts = localStorage.getItem(CASE_STUDIES_STORAGE_KEY);
        if (storedPosts) {
            setCaseStudies(JSON.parse(storedPosts));
        } else {
            // Initialize with an empty array if nothing is in storage
            const initialData: CaseStudy[] = [];
            localStorage.setItem(CASE_STUDIES_STORAGE_KEY, JSON.stringify(initialData));
            setCaseStudies(initialData);
        }
    } catch (e) {
        console.error("Failed to parse case studies from localStorage", e);
        setCaseStudies([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncCaseStudies();
  }, [syncCaseStudies]);

  // Listen for storage changes to sync across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CASE_STUDIES_STORAGE_KEY) {
        syncCaseStudies();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncCaseStudies]);

  const getCaseStudyBySlug = (slug: string): CaseStudy | null => {
    return caseStudies.find(p => p.slug === slug) || null;
  };

  const addCaseStudy = (post: CaseStudy) => {
    const updatedPosts = [post, ...caseStudies];
    setCaseStudies(updatedPosts);
    localStorage.setItem(CASE_STUDIES_STORAGE_KEY, JSON.stringify(updatedPosts));
  };

  const updateCaseStudy = (slug: string, postData: Partial<CaseStudy>) => {
    const updatedCaseStudies = caseStudies.map(p => {
      if (p.slug === slug) {
        // Create the updated post by merging existing data with new data
        // This ensures fields not in the form (like 'id', 'date') are preserved.
        return { ...p, ...postData };
      }
      return p;
    });
    setCaseStudies(updatedCaseStudies);
    localStorage.setItem(CASE_STUDIES_STORAGE_KEY, JSON.stringify(updatedCaseStudies));
  };

  const deleteCaseStudy = (slug: string) => {
    const updatedPosts = caseStudies.filter(p => p.slug !== slug);
    setCaseStudies(updatedPosts);
    localStorage.setItem(CASE_STUDIES_STORAGE_KEY, JSON.stringify(updatedPosts));
  };
  
  const slugExists = (slug: string): boolean => {
      return caseStudies.some(p => p.slug === slug);
  };

  return (
    <CaseStudyContext.Provider value={{ caseStudies, loading, getCaseStudyBySlug, addCaseStudy, updateCaseStudy, deleteCaseStudy, slugExists }}>
      {children}
    </CaseStudyContext.Provider>
  );
};

export const useCaseStudy = (): CaseStudyContextType => {
  const context = useContext(CaseStudyContext);
  if (context === undefined) {
    throw new Error('useCaseStudy must be used within a CaseStudyProvider');
  }
  return context;
};
