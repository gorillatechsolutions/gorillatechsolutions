
type NavLink = {
  name: string;
  href: string;
  icon: string;
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/', icon: 'fa-home' },
  { name: 'About Us', href: '/about', icon: 'fa-info-circle' },
  { name: 'Our Services', href: '/services', icon: 'fa-cog' },
  { name: 'Case Studies', href: '/case-study', icon: 'fa-clipboard' },
  { name: 'Our Apps', href: '/apps', icon: 'fa-window-maximize' },
  { name: 'Contact Us', href: '/contact', icon: 'fa-envelope' },
];
