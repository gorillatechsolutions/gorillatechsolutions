
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ContactSettings } from '@/types/contact-settings';

const defaultContactSettings: ContactSettings = {
    metaTitle: "Contact Us | Gorilla Tech Solutions",
    metaDescription: "Get in touch with Gorilla Tech Solutions. We're here to answer your questions about our digital marketing services and help you start your next project.",
    metaKeywords: "contact digital marketing agency, get a quote, project inquiry",
    metaOgImage: "https://placehold.co/1200x630.png",
    heroTitle: "Get in Touch",
    heroSubtitle: "Have a project in mind or just want to say hello? We'd love to hear from you.",
    phone: '0381 359 9517',
    email: 'Business@GorillaTechSolution.com',
    address: 'Agartala, Tripura (W) India',
    zip: '799006',
    socialLinks: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
        whatsapp: 'https://wa.me/1234567890',
        telegram: 'https://t.me/yourprofile',
        googleMyBusiness: 'https://google.com',
        github: 'https://github.com'
    }
};

interface ContactSettingsContextType {
  settings: ContactSettings;
  loading: boolean;
  updateSettings: (newSettings: Partial<ContactSettings>) => void;
}

const ContactSettingsContext = createContext<ContactSettingsContextType | undefined>(undefined);

const CONTACT_SETTINGS_STORAGE_KEY = 'contactSettings';

export const ContactSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ContactSettings>(defaultContactSettings);
  const [loading, setLoading] = useState(true);

  const syncSettings = useCallback(() => {
    try {
      const storedSettings = localStorage.getItem(CONTACT_SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        const withDefaults = { ...defaultContactSettings, ...parsed };
        setSettings(withDefaults);
      } else {
        localStorage.setItem(CONTACT_SETTINGS_STORAGE_KEY, JSON.stringify(defaultContactSettings));
        setSettings(defaultContactSettings);
      }
    } catch (e) {
      console.error("Failed to parse contact settings from localStorage", e);
      setSettings(defaultContactSettings);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncSettings();
  }, [syncSettings]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CONTACT_SETTINGS_STORAGE_KEY) {
        syncSettings();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncSettings]);

  const updateSettings = (newSettings: Partial<ContactSettings>) => {
    setSettings(prevSettings => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      localStorage.setItem(CONTACT_SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  return (
    <ContactSettingsContext.Provider value={{ settings, loading, updateSettings }}>
      {children}
    </ContactSettingsContext.Provider>
  );
};

export const useContactSettings = (): ContactSettingsContextType => {
  const context = useContext(ContactSettingsContext);
  if (context === undefined) {
    throw new Error('useContactSettings must be used within a ContactSettingsProvider');
  }
  return context;
};
