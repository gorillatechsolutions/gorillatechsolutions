import type { Service } from '@/types/service';

export const initialServices: Service[] = [
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'A comprehensive suite of digital marketing services designed to elevate your brand and accelerate growth across all digital channels.',
    icon: 'https://placehold.co/128x128.png',
    price: '950.00',
    originalPrice: '1100.00',
    popular: true,
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    description: 'Engage your audience and build a loyal community. We create and manage social media campaigns that resonate with your followers.',
    icon: 'https://placehold.co/128x128.png',
    price: '320.00',
    originalPrice: '355.00',
    popular: false,
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'We build fast, responsive, and user-friendly websites that provide an exceptional user experience and drive conversions.',
    icon: 'https://placehold.co/128x128.png',
    price: '1200.00',
    originalPrice: '1350.00',
    popular: true,
  },
  {
    slug: 'digital-pr',
    title: 'Digital PR (Press Released)',
    description: 'Enhance your brand\'s reputation and reach with strategic digital press releases and media outreach campaigns.',
    icon: 'https://placehold.co/128x128.png',
    price: '450.00',
    originalPrice: '500.00',
    popular: false,
  },
];
