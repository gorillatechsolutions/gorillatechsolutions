
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { SiteSettings } from '@/types/site-settings';

const defaultRobotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.yourwebsite.com/sitemap.xml
`;

const defaultSiteSettings: SiteSettings = {
    headerLogo: "https://placehold.co/180x40.png",
    footerLogo: "https://placehold.co/180x40.png",
    favicon: "/favicon.ico",
    ogImage: "https://placehold.co/1200x630.png",
    metaDescription: "Gorilla Tech Solutions is a leading digital marketing agency specializing in SEO, PPC, and content strategies to drive measurable growth for your business.",
    metaKeywords: "digital marketing, seo, ppc, content strategy, growth",
    googleSiteVerification: "",
    bingSiteVerification: "",
    robotsTxt: defaultRobotsTxt,
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

const SITE_SETTINGS_STORAGE_KEY = 'siteSettings';

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);

  const syncSettings = useCallback(() => {
    try {
      const storedSettings = localStorage.getItem(SITE_SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        const withDefaults = { ...defaultSiteSettings, ...parsed };
        setSettings(withDefaults);
      } else {
        localStorage.setItem(SITE_SETTINGS_STORAGE_KEY, JSON.stringify(defaultSiteSettings));
        setSettings(defaultSiteSettings);
      }
    } catch (e) {
      console.error("Failed to parse site settings from localStorage", e);
      setSettings(defaultSiteSettings);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncSettings();
  }, [syncSettings]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === SITE_SETTINGS_STORAGE_KEY) {
        syncSettings();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncSettings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prevSettings => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      localStorage.setItem(SITE_SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = (): SiteSettingsContextType => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
