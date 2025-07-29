
'use client';

import { useSiteSettings } from '@/contexts/site-settings-context';
import { useEffect } from 'react';
import Head from 'next/head';

export function SiteSettingsManager() {
  const { settings, loading } = useSiteSettings();

  useEffect(() => {
    if (!loading) {
      // Update favicon
      let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = settings.favicon;

      // Update meta description
      let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = settings.metaDescription;

      // Update meta keywords
      let metaKeywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = settings.metaKeywords;
      
      // Update OG image
      let ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.content = settings.ogImage;

      // Update Google site verification
      let googleVerification = document.querySelector<HTMLMetaElement>('meta[name="google-site-verification"]');
      if (settings.googleSiteVerification) {
        if (!googleVerification) {
          googleVerification = document.createElement('meta');
          googleVerification.name = 'google-site-verification';
          document.head.appendChild(googleVerification);
        }
        googleVerification.content = settings.googleSiteVerification;
      } else if (googleVerification) {
        googleVerification.remove();
      }

      // Update Bing site verification
      let bingVerification = document.querySelector<HTMLMetaElement>('meta[name="msvalidate.01"]');
      if (settings.bingSiteVerification) {
        if (!bingVerification) {
          bingVerification = document.createElement('meta');
          bingVerification.name = 'msvalidate.01';
          document.head.appendChild(bingVerification);
        }
        bingVerification.content = settings.bingSiteVerification;
      } else if (bingVerification) {
        bingVerification.remove();
      }
    }
  }, [settings, loading]);

  return null; // This component does not render anything
}
