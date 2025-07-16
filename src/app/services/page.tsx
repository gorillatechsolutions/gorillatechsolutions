
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const services = [
  {
    icon: <i className="fa fa-search fa-2x text-primary" aria-hidden="true"></i>,
    title: 'Search Engine Optimization (SEO)',
    description: 'Boost your organic visibility and climb the search rankings. We use proven strategies to drive qualified traffic to your website.',
    price: 500,
    discount: 15,
    contactHref: '/contact',
    detailsHref: '/case-study/tripled-organic-traffic-ecommerce',
  },
  {
    icon: <i className="fa fa-mouse-pointer fa-2x text-primary" aria-hidden="true"></i>,
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'Get immediate results with targeted ad campaigns on Google, Bing, and social platforms. Maximize your ROI with our expert management.',
    price: 600,
    discount: 10,
    contactHref: '/contact',
    detailsHref: '/case-study/slashing-b2b-saas-cpa',
  },
  {
    icon: <i className="fa fa-share-alt fa-2x text-primary" aria-hidden="true"></i>,
    title: 'Social Media Marketing',
    description: 'Engage your audience and build a loyal community. We create and manage social media campaigns that resonate with your customers.',
    price: 400,
    discount: 20,
    contactHref: '/contact',
    detailsHref: '/case-study/building-community-with-social-media',
  },
  {
    icon: <i className="fa fa-file-text fa-2x text-primary" aria-hidden="true"></i>,
    title: 'Content Creation & Marketing',
    description: 'From compelling blog posts to captivating videos, we produce high-quality content that tells your story and drives engagement.',
    price: 450,
    discount: 10,
    contactHref: '/contact',
    detailsHref: '/case-study/healthcare-content-strategy',
  },
  {
    icon: <i className="fa fa-envelope fa-2x text-primary" aria-hidden="true"></i>,
    title: 'Email Marketing & Automation',
    description: 'Nurture leads and retain customers with personalized email campaigns. We design, write, and manage emails that convert.',
    price: 350,
    discount: 15,
    contactHref: '/contact',
    detailsHref: '/case-study/non-profit-email-marketing',
  },
  {
    icon: <i className="fa fa-bar-chart fa-2x text-primary" aria-hidden="true"></i>,
    title: 'Analytics & Performance Reporting',
    description: 'Understand what\'s working and what\'s not. We provide clear, actionable reports to guide your marketing decisions.',
    price: 300,
    discount: 5,
    contactHref: '/contact',
    detailsHref: '/case-study',
  }
];

const Countdown = ({ discount }: { discount: number }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    
    useEffect(() => {
        const offerEndDate = new Date();
        offerEndDate.setDate(offerEndDate.getDate() + 3);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = offerEndDate.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-right text-xs text-accent font-medium mt-1">
            Offer ends in: <span className="font-mono font-bold tracking-wider">{String(timeLeft.days).padStart(2, '0')}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s</span> | Save {discount}%!
        </div>
    );
};


export default function ServicesPage() {
  return (
    <div className="bg-secondary/40">
        <div className="container mx-auto px-4 py-16 md:py-24">
            <header className="text-center mb-16">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Digital Marketing Services</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    A comprehensive suite of digital marketing services designed to elevate your brand and accelerate growth.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {services.map((service) => (
                  <div key={service.title} className="relative pt-10">
                    <Card className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center ring-4 ring-primary shadow-lg">
                                {service.icon}
                            </div>
                        </div>
                        <CardContent className="p-6 pt-12 text-center flex-1 flex flex-col">
                          <h3 className="font-headline text-xl text-primary font-bold mb-3">{service.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
                          
                           {service.price && service.discount && (
                              <div className="mt-auto pt-4 border-t border-border/50">
                                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                                      <p className="text-sm font-semibold text-primary/80">Starting at</p>
                                      <p className="text-3xl font-bold text-primary">
                                          ${(service.price * (1 - service.discount / 100)).toFixed(2)}
                                      </p>
                                  </div>
                                  <Countdown discount={service.discount} />
                              </div>
                          )}

                          <div className="mt-6 flex gap-3">
                              {service.contactHref && (
                                  <Button asChild size="sm" className="flex-1">
                                      <Link href={service.contactHref}>Contact Us</Link>
                                  </Button>
                              )}
                              {service.detailsHref && (
                                  <Button asChild size="sm" variant="outline" className="flex-1">
                                      <Link href={service.detailsHref}>Read Details</Link>
                                  </Button>
                              )}
                          </div>
                        </CardContent>
                    </Card>
                  </div>
                ))}
            </div>

            <div className="mt-24 text-center bg-card p-10 rounded-lg shadow-xl">
                <h2 className="font-headline text-3xl font-bold text-primary">Ready to Grow Your Business?</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Let's discuss how our digital marketing expertise can help you achieve your business goals. Your journey to digital excellence starts here.
                </p>
                <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                    <Link href="/contact">
                        Get a Free Consultation <i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  );
}
