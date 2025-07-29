
import type { StorageFile } from '@/types/storage-file';

export const initialFiles: StorageFile[] = [
  {
    id: '1',
    name: 'hero-image.jpg',
    url: 'https://placehold.co/1200x600.png',
    type: 'image/jpeg',
    size: 150 * 1024, // 150 KB
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'product-demo.mp4',
    url: '#',
    type: 'video/mp4',
    size: 5 * 1024 * 1024, // 5 MB
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'whitepaper.pdf',
    url: '#',
    type: 'application/pdf',
    size: 2 * 1024 * 1024, // 2 MB
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    name: 'logo.svg',
    url: 'https://placehold.co/40x40.png',
    type: 'image/svg+xml',
    size: 15 * 1024, // 15 KB
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    name: 'brand-assets.zip',
    url: '#',
    type: 'application/zip',
    size: 10 * 1024 * 1024, // 10 MB
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
