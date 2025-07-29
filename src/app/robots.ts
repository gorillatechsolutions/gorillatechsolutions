
import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  // Note: To make this dynamic based on the site settings, you would need
  // to fetch the settings from a database here. Since the current implementation
  // uses localStorage, we are providing a static default.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.yourwebsite.com/sitemap.xml',
  };
}
