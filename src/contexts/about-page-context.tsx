
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AboutPageContent } from '@/types/about-page';

const defaultAboutPageContent: AboutPageContent = {
    metaTitle: "About Our Digital Marketing Agency",
    metaDescription: "Learn about the mission, values, and expert team at Gorilla Tech Solutions, dedicated to delivering exceptional digital marketing results.",
    metaOgImage: "https://placehold.co/1200x630.png",
    heroTitle: "About Gorilla Tech Solutions",
    heroSubtitle: "A passionate team of digital marketing experts dedicated to building powerful brands and driving measurable growth for businesses like yours.",
    storyTitle: "From Vision to Victory: Our Story",
    storyParagraph1: "Founded on the principle that every business deserves a powerful digital presence, Gorilla Tech Solutions began with a singular mission: to empower companies with innovative and effective digital marketing strategies. We saw a gap between agencies and clients and decided to fill it by building true partnerships, not just managing campaigns.",
    storyParagraph2: "By combining data-driven insights with creative excellence, we deliver tangible results that foster sustainable growth and build lasting brand value in a crowded digital world. Our journey is defined by the success of our clients.",
    storyImage: "https://placehold.co/600x450.png",
    storyImageAiHint: "team collaboration",
    valuesTitle: "The Principles That Guide Us",
    valuesSubtitle: "Our core values are the bedrock of our company culture and client relationships, ensuring we deliver excellence in every project.",
    values: [
        { icon: "Bolt", title: "Innovation", description: "We constantly explore new technologies and strategies to keep you ahead of the curve, ensuring your business benefits from the latest digital marketing advancements." },
        { icon: "Bullseye", title: "Results-Driven", description: "Our focus is on delivering measurable results that translate to real business growth. We track key metrics to ensure our campaigns are effective and impactful." },
        { icon: "Users", title: "Client Partnership", description: "We work as an extension of your team, fostering open communication and true collaboration to achieve shared goals and build long-term relationships." },
        { icon: "Handshake", title: "Integrity", description: "We believe in transparency and honesty in all our interactions. You'll receive clear, straightforward reporting on all campaign activities and results." },
    ],
    ctaTitle: "Ready to Elevate Your Brand?",
    ctaSubtitle: "Let's discuss how our digital marketing expertise can help you achieve your business goals. Your journey to digital excellence starts here.",
};

interface AboutPageContextType {
  content: AboutPageContent;
  loading: boolean;
  updateContent: (newContent: Partial<AboutPageContent>) => void;
}

const AboutPageContext = createContext<AboutPageContextType | undefined>(undefined);

const ABOUT_PAGE_STORAGE_KEY = 'aboutPageContent';

export const AboutPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AboutPageContent>(defaultAboutPageContent);
  const [loading, setLoading] = useState(true);

  const syncContent = useCallback(() => {
    try {
      const storedContent = localStorage.getItem(ABOUT_PAGE_STORAGE_KEY);
      if (storedContent) {
        const parsed = JSON.parse(storedContent);
        // Add new fields if they don't exist in stored data
        const withDefaults = { ...defaultAboutPageContent, ...parsed };
        setContent(withDefaults);
      } else {
        localStorage.setItem(ABOUT_PAGE_STORAGE_KEY, JSON.stringify(defaultAboutPageContent));
        setContent(defaultAboutPageContent);
      }
    } catch (e) {
      console.error("Failed to parse about page content from localStorage", e);
      setContent(defaultAboutPageContent);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncContent();
  }, [syncContent]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === ABOUT_PAGE_STORAGE_KEY) {
        syncContent();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncContent]);

  const updateContent = (newContent: Partial<AboutPageContent>) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, ...newContent };
      localStorage.setItem(ABOUT_PAGE_STORAGE_KEY, JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  return (
    <AboutPageContext.Provider value={{ content, loading, updateContent }}>
      {children}
    </AboutPageContext.Provider>
  );
};

export const useAboutPage = (): AboutPageContextType => {
  const context = useContext(AboutPageContext);
  if (context === undefined) {
    throw new Error('useAboutPage must be used within an AboutPageProvider');
  }
  return context;
};
