
import { Home, Info, Cog, BookText, ClipboardList, Mail, AppWindow, Star, LogIn, LayoutDashboard, UserCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type NavLink = {
  name: string;
  href: string;
  icon: LucideIcon;
  auth?: 'loggedIn' | 'loggedOut';
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'Our Services', href: '/services', icon: Cog },
  { name: 'Case Studies', href: '/case-study', icon: ClipboardList },
  { name: 'Our Apps', href: '/apps', icon: AppWindow },
  { name: 'Contact Us', href: '/contact', icon: Mail },
  { name: 'Login', href: '/login', icon: LogIn, auth: 'loggedOut' },
  { name: 'Profile', href: '/profile', icon: UserCircle, auth: 'loggedIn'},
];
