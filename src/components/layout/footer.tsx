
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAws,
  faFacebook,
  faGithub,
  faGoogle,
  faInstagram,
  faLinkedin,
  faMeta,
  faWikipediaW,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faCheckCircle, faPhone, faMapMarkerAlt, faEnvelope, faCogs } from '@fortawesome/free-solid-svg-icons';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2% py-12" style={{ backgroundColor: '#dedede' }}>
        <div className="flex flex-col gap-4 items-start">
          <Link href="/" className="flex items-center">
             <FontAwesomeIcon icon={faCogs} className="h-8 w-8 text-primary" />
          </Link>
          <p className="text-sm" style={{ color: '#383838' }}>
            Driving growth with data-driven digital marketing strategies that deliver results.
          </p>
          <div className="flex gap-3 mt-2 pl-1">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-facebook text-white">
                <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-instagram text-white">
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-linkedin text-white">
                 <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
            </Link>
            <Link href="https://wa.me/1234567890" target="_blank" aria-label="WhatsApp" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-whatsapp text-white">
                 <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
            </Link>
            <Link href="https://google.com" target="_blank" aria-label="Google Business" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-google text-white">
                <FontAwesomeIcon icon={faGoogle} className="h-5 w-5" />
            </Link>
            <Link href="https://wikipedia.org" target="_blank" aria-label="Wikipedia" className="h-8 w-8 flex items-center justify-center rounded-full bg-black text-white">
                <FontAwesomeIcon icon={faWikipediaW} className="h-5 w-5" />
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

        <div className="flex flex-col items-start text-left">
          <h3 className="font-headline font-semibold mb-4 text-center w-full" style={{ color: '#383838' }}>Connect With Us</h3>
          <div className="space-y-2 text-sm w-full" style={{textAlign: 'center'}}>
            <div className="flex items-center gap-3 justify-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 shrink-0 mt-0.5" style={{ color: '#454545' }}/>
              <p style={{ color: '#383838' }}>Agartala, Tripura (W) India<br/>Pin: 799006</p>
            </div>
            <a href="tel:03813599517" className="flex items-center gap-3 justify-center hover:text-primary" style={{ color: '#383838' }}>
                <FontAwesomeIcon icon={faPhone} className="w-4 shrink-0" style={{color: '#454545'}}/>
                <span>0381 359 9517</span>
            </a>
            <div className="flex items-center gap-3 justify-center">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 shrink-0" style={{ color: '#454545' }}/>
              <a href="mailto:Business@GorillaTechSolution.com" className="hover:text-primary" style={{ color: '#383838' }}>Business@GorillaTechSolution.com</a>
            </div>
            <div className="flex justify-center mt-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild variant="outline" className="mt-4">
                      <Link href="https://github.com" target="_blank">
                        <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
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
      </div>
      <div className="py-4" style={{ backgroundColor: '#243878' }}>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-sm text-white/80 gap-4 px-2%">
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Gorilla Tech Solutions. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ backgroundColor: '#f2f5f7', color: 'black' }}>
                <FontAwesomeIcon icon={faMeta} className="h-6 w-6" style={{color: "#0081FB"}} />
                <div className="flex flex-col items-start">
                    <span className="text-sm" style={{ color: '#0081FB' }}>Meta Business</span>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1 h-3 w-3" style={{color: 'limegreen'}} />
                        <span className="text-xs" style={{ color: 'limegreen' }}>Verified Partner</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-black" style={{ backgroundColor: '#f0f4f6' }}>
                <FontAwesomeIcon icon={faAws} className="h-6 w-6" style={{color: "#f78d38"}} />
                <div className="flex flex-col items-start">
                    <div className="text-sm">
                        <span style={{ color: '#f78f39' }}>AWS </span> 
                        <span style={{ color: '#383838' }}>Startup</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1 h-3 w-3" style={{color: 'limegreen'}} />
                        <span className="text-xs" style={{ color: 'limegreen' }}>Verified Partner</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-black" style={{ backgroundColor: '#f0f4f6' }}>
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6" style={{color: 'limegreen'}} />
                <div className="flex flex-col items-start text-left">
                    <span className="text-sm">ISO 9001:2015</span>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1 h-3 w-3" style={{color: 'limegreen'}} />
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
