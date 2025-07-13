
import Link from 'next/link';
import { Mail, Phone, MapPin, Github, CheckCircle, BrainCircuit } from 'lucide-react';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: '#dedede' }}>
        <div className="flex flex-col gap-4 items-start">
          <Link href="/" className="flex items-center">
            <BrainCircuit className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
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
          <div className="space-y-2 text-sm flex flex-col items-center">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-0.5 shrink-0" style={{ color: '#383838' }} />
              <p style={{ color: '#383838' }}>123 Marketing Lane<br/>New York, NY 10001</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0" style={{ color: '#383838' }}/>
              <a href="tel:+1234567890" className="hover:text-primary" style={{ color: '#383838' }}>+1 (234) 567-890</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0" style={{ color: '#383838' }}/>
              <a href="mailto:hello@gorillatech.solutions" className="hover:text-primary" style={{ color: '#383838' }}>hello@gorillatech.solutions</a>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="https://github.com" target="_blank">
                      <Github className="mr-2 h-4 w-4" />
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
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-sm text-white/80 gap-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Gorilla Tech Solutions. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ backgroundColor: '#f2f5f7', color: 'black' }}>
                <Image src="https://placehold.co/24x24.png" alt="Meta Business" width={24} height={24} data-ai-hint="logo" loading="lazy" />
                <div className="flex flex-col items-start">
                    <span className="text-sm" style={{ color: '#0081FB' }}>Meta Business</span>
                    <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
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
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs" style={{ color: 'limegreen' }}>Verified Partner</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-black" style={{ backgroundColor: '#f0f4f6' }}>
                <Image src="https://placehold.co/24x24.png" alt="ISO 9001:2015" width={24} height={24} data-ai-hint="certificate" loading="lazy" />
                <div className="flex flex-col items-start text-left">
                    <span className="text-sm">ISO 9001:2015</span>
                    <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
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
