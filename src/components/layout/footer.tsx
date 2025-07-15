
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';

const footerLinks = {
    company: [
        { name: 'Work with Us', href: '/application' },
        { name: 'Invest with Us', href: '/contact' },
        { name: 'Website Roadmap', href: '/case-study' },
    ],
    about: [
        { name: 'Reviews', href: '/reviews' },
        { name: 'Site Map', href: '/'},
        { name: 'About Us', href: '/about' },
        { name: 'Privacy Policy', href: '/contact' },
    ],
    legal: [
        { name: 'Refund Policy', href: '/contact' },
        { name: 'Terms & Conditions', href: '/contact' },
        { name: 'Disclaimer', href: '/contact' },
    ]
}


export function Footer() {
  return (
    <footer className="w-full border-t text-card-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-12" style={{ backgroundColor: '#dedede' }}>
        <div className="flex flex-col gap-4 items-start">
          <Link href="/" className="flex items-center">
            <i className="fa fa-cogs fa-2x sm:fa-3x text-primary" aria-hidden="true"></i>
          </Link>
          <p className="text-sm" style={{ color: '#383838' }}>
            Driving growth with data-driven digital marketing strategies that deliver results.
          </p>
          <div className="flex gap-3 mt-2">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-facebook text-white">
                <Image src="https://placehold.co/24x24.png" alt="Facebook" width={20} height={20} data-ai-hint="facebook logo" />
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-instagram text-white">
                <Image src="https://placehold.co/24x24.png" alt="Instagram" width={20} height={20} data-ai-hint="instagram logo" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-linkedin text-white">
                 <Image src="https://placehold.co/24x24.png" alt="LinkedIn" width={20} height={20} data-ai-hint="linkedin logo" />
            </Link>
            <Link href="https://wa.me/1234567890" target="_blank" aria-label="WhatsApp" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-whatsapp text-white">
                 <Image src="https://placehold.co/24x24.png" alt="WhatsApp" width={20} height={20} data-ai-hint="whatsapp logo" />
            </Link>
            <Link href="https://google.com" target="_blank" aria-label="Google Business" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-google text-white">
                <Image src="https://placehold.co/24x24.png" alt="Google" width={20} height={20} data-ai-hint="google logo" />
            </Link>
            <Link href="https://wikipedia.org" target="_blank" aria-label="Wikipedia" className="h-8 w-8 flex items-center justify-center rounded-full bg-black text-white">
                <Image src="https://placehold.co/24x24.png" alt="Wikipedia" width={20} height={20} data-ai-hint="wikipedia logo" />
            </Link>
          </div>
        </div>

        <div className="lg:text-center">
          <h3 className="font-headline font-semibold mb-4" style={{ color: '#383838' }}>Quick Links</h3>
          <ul className="flex flex-col items-start lg:items-center space-y-2">
            <li className='flex flex-wrap items-center justify-center'>
                {footerLinks.company.map((link, index) => (
                  <div key={link.name} className="flex items-center">
                    <Link href={link.href} className="text-sm hover:text-primary whitespace-nowrap px-2" style={{ color: '#383838' }}>
                      {link.name}
                    </Link>
                    {index < footerLinks.company.length - 1 && <span style={{ color: '#383838' }}>&bull;</span>}
                  </div>
                ))}
            </li>
            <li className='flex flex-wrap items-center justify-center'>
                {footerLinks.about.map((link, index) => (
                    <div key={link.name} className="flex items-center">
                    <Link href={link.href} className="text-sm hover:text-primary whitespace-nowrap px-2" style={{ color: '#383838' }}>
                        {link.name}
                    </Link>
                    {index < footerLinks.about.length - 1 && <span style={{ color: '#383838' }}>&bull;</span>}
                    </div>
                ))}
            </li>
            <li className='flex flex-wrap items-center justify-center'>
                {footerLinks.legal.map((link, index) => (
                    <div key={link.name} className="flex items-center">
                    <Link href={link.href} className="text-sm hover:text-primary whitespace-nowrap px-2" style={{ color: '#383838' }}>
                        {link.name}
                    </Link>
                    {index < footerLinks.legal.length - 1 && <span style={{ color: '#383838' }}>&bull;</span>}
                    </div>
                ))}
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="font-headline font-semibold mb-4" style={{ color: '#383838' }}>Connect With Us</h3>
          <div className="space-y-2 text-sm flex flex-col items-center" style={{ textAlign: 'justify' }}>
            <div className="flex items-start gap-3">
              <i className="fa fa-map-marker h-5 w-5 mt-0.5 shrink-0" style={{ color: '#383838' }} aria-hidden="true"></i>
              <p style={{ color: '#383838', textAlign: 'justify' }}>Agartala, Tripura (W) India<br/>Pin: 799006</p>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa fa-phone h-5 w-5 shrink-0" style={{ color: '#383838' }} aria-hidden="true"></i>
              <a href="tel:03813599517" className="hover:text-primary" style={{ color: '#383838' }}>0381 359 9517</a>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa fa-envelope h-5 w-5 shrink-0" style={{ color: '#383838' }} aria-hidden="true"></i>
              <a href="mailto:Business@GorillaTechSolution.com" className="hover:text-primary" style={{ color: '#383838' }}>Business@GorillaTechSolution.com</a>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="https://github.com" target="_blank">
                      <i className="fa fa-github mr-2 h-4 w-4" aria-hidden="true"></i>
                      Download Source Code
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-[#3F4550] text-white border-0">
                  <p>Important Note: Content and code to be Used for Educational Purposes Only; Restrictions on Use.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="py-4" style={{ backgroundColor: '#243878' }}>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-sm text-white/80 gap-4 px-2">
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Gorilla Tech Solutions. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ backgroundColor: '#f2f5f7', color: 'black' }}>
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#0081FB"><title>Meta</title><path d="M12.0001 0.333252C5.55208 0.333252 0.333496 5.55184 0.333496 11.9999C0.333496 18.448 5.55208 23.6666 12.0001 23.6666C18.4481 23.6666 23.6668 18.448 23.6668 11.9999C23.6668 5.55184 18.4481 0.333252 12.0001 0.333252ZM17.1354 7.2185C16.5925 6.6433 15.9328 6.18371 15.222 5.86224C14.1163 5.3403 13.0645 5.06242 11.9999 5.06242C8.28695 5.06242 5.3059 7.97339 5.25016 11.6874C5.24933 11.7583 5.24933 11.8291 5.25016 11.9C5.25016 12.0233 5.25016 12.1466 5.25349 12.2691C5.3084 15.9848 8.28945 18.8958 11.9999 18.8958C14.1249 18.8958 15.9828 17.9424 17.1362 16.4C17.6525 15.7199 18.0691 14.9458 18.3649 14.1083C18.6749 13.2324 18.8333 12.3083 18.8333 11.3749C18.8333 10.3674 18.6366 9.40409 18.2324 8.52075C17.8424 7.66909 17.1354 7.2185 17.1354 7.2185ZM12.0008 6.72909C13.2841 6.72909 14.5158 7.08659 15.5425 7.74742C15.9925 8.04909 16.3983 8.41492 16.7358 8.84742C17.0666 9.27992 17.1991 9.77659 17.1991 10.2458C17.1991 10.9708 16.8991 11.6608 16.3458 12.1641C15.6591 12.7932 14.7433 13.1674 13.7508 13.1674C12.4675 13.1674 11.2358 12.81 10.2091 12.1491C9.75913 11.8474 9.3533 11.4816 9.01579 11.0491C8.68495 10.6166 8.55245 10.12 8.55245 9.65075C8.55245 8.92575 8.85245 8.23575 9.40579 7.73242C10.0925 7.10325 11.0083 6.72909 12.0008 6.72909Z"/></svg>
                <div className="flex flex-col items-start">
                    <span className="text-sm" style={{ color: '#0081FB' }}>Meta Business</span>
                    <div className="flex items-center gap-1">
                        <i className="fa fa-check-circle h-3 w-3 text-green-500" aria-hidden="true"></i>
                        <span className="text-xs" style={{ color: 'limegreen' }}>Verified Partner</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-black" style={{ backgroundColor: '#f0f4f6' }}>
                <Image src="https://placehold.co/24x24.png" alt="AWS Startup" width={24} height={24} data-ai-hint="logo" loading="lazy" />
                <div className="flex flex-col items-start">
                    <div className="text-sm">
                        <span style={{ color: '#f78f39' }}>AWS </span>
                        <span style={{ color: '#383838' }}>Startup</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <i className="fa fa-check-circle h-3 w-3 text-green-500" aria-hidden="true"></i>
                        <span className="text-xs" style={{ color: 'limegreen' }}>Verified Partner</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-black" style={{ backgroundColor: '#f0f4f6' }}>
                <Image src="https://placehold.co/24x24.png" alt="ISO 9001:2015" width={24} height={24} data-ai-hint="certificate" loading="lazy" />
                <div className="flex flex-col items-start text-left">
                    <span className="text-sm">ISO 9001:2015</span>
                    <div className="flex items-center gap-1">
                        <i className="fa fa-check-circle h-3 w-3 text-green-500" aria-hidden="true"></i>
                        <span className="text-xs" style={{ color: 'limegreen' }}>Trusted</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
