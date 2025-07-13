import { Home, Info, Cog, BookText, ClipboardList, Mail, AppWindow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type NavLink = {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'Our Services', href: '/services', icon: Cog },
  { name: 'Case Studies', href: '/case-study', icon: ClipboardList },
  { name: 'Our Apps', href: '/apps', icon: AppWindow },
  { name: 'Contact Us', href: '/contact', icon: Mail },
];
