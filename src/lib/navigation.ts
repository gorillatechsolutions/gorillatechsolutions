import { Home, Info, Cog, BookText, FilePenLine, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type NavLink = {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Services', href: '/services', icon: Cog },
  { name: 'Case Studies', href: '/case-study', icon: BookText },
  { name: 'Application', href: '/application', icon: FilePenLine },
  { name: 'Contact', href: '/contact', icon: Mail },
];
