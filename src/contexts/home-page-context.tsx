
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { HomePageContent } from '@/types/home-page';

const defaultHomePageContent: HomePageContent = {
    metaTitle: "Gorilla Tech Solutions | Data-Driven Digital Marketing",
    metaDescription: "Gorilla Tech Solutions is a leading digital marketing agency specializing in SEO, PPC, and content strategies to drive measurable growth for your business.",
    metaOgImage: "https://placehold.co/1200x630.png",
    heroTitle: "Elevate Your Digital Marketing",
    heroSubtitle: "Gorilla Tech Solutions drives growth with data-driven digital marketing strategies that convert. Let's build your brand's future, together.",
    heroImage: "https://placehold.co/600x400.png",
    heroImageAiHint: "digital marketing",
    heroCtaButtonText: "Get Your Free Consultation",
    heroCtaButtonLink: "/contact",
    heroSecondaryButtonText: "Explore Our Services",
    heroSecondaryButtonLink: "/services",
    processTitle: "From Idea to Reality",
    processSubtitle: "in 4 Simple Steps",
    processDescription: "We follow a transparent, proven methodology that ensures your project succeeds. Every step is designed to deliver exceptional results while keeping you informed.",
    processSteps: [
        { imageUrl: 'https://placehold.co/100x100.png', imageAiHint: 'magnifying glass discovery', title: 'Discovery', description: 'We start by understanding your business, goals, and target audience to lay the groundwork for a successful strategy.' },
        { imageUrl: 'https://placehold.co/100x100.png', imageAiHint: 'planning strategy checklist', title: 'Planning', description: 'Our team crafts a detailed, data-driven plan, outlining the key strategies and milestones for your project.' },
        { imageUrl: 'https://placehold.co/100x100.png', imageAiHint: 'rocket launch execution', title: 'Execution', description: 'We launch your campaigns, continuously optimizing for performance and delivering measurable results.' },
        { imageUrl: 'https://placehold.co/100x100.png', imageAiHint: 'trophy award launch', title: 'Review & Launch', description: 'We review the results, provide detailed reports, and successfully launch your project for the world to see.' }
    ],
    commitmentTitle: "Why Our Process Works",
    stats: [
        { imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'calendar checkmark', value: 98, label: 'On-Time Delivery', description: 'of projects delivered on schedule' },
        { imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'happy customer face', value: 99, label: 'Client Satisfaction', description: 'Based on 500+ completed projects' },
        { imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'trophy award', value: 97, label: 'Goal Achievement', description: 'Projects meet or exceed expectations' }
    ],
    benefitsTitle: "Our Commitment to You",
    benefits: ['Clear Communication', 'Regular Updates', 'Quality Assurance', '24/7 Support'],
    ctaTitle: "Ready to Transform Your Business?",
    ctaSubtitle: "Get started with our cutting-edge digital solutions and take your business to the next level.",
    ctaImage: "https://placehold.co/192x192.png",
    ctaImageAiHint: "abstract shape",
    ctaButtonText: "Get Started Now",
    ctaButtonLink: "/contact",
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
