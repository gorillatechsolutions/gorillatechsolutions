
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Note: Metadata is not used in client components but kept for reference
// export const metadata: Metadata = {
//     title: 'Our Digital Marketing Services',
//     description: 'We offer a full suite of digital marketing services, including SEO, PPC, social media marketing, content creation, and email marketing to grow your business.',
// };

const services = [
  {
    icon: <i className="fa fa-search fa-3x text-accent-foreground" aria-hidden="true"></i>,
    title: 'Search Engine Optimization (SEO)',
    description: 'Boost your organic visibility and climb the search rankings. We use proven strategies to drive qualified traffic to your website.',
    price: 500,
    discount: 15,
    contactHref: '/contact',
    detailsHref: '/case-study/tripled-organic-traffic-ecommerce',
  },
  {
    icon: <i className="fa fa-mouse-pointer fa-3x text-accent-foreground" aria-hidden="true"></i>,
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'Get immediate results with targeted ad campaigns on Google, Bing, and social platforms. Maximize your ROI with our expert management.',
    price: 600,
    discount: 10,
    contactHref: '/contact',
    detailsHref: '/case-study/slashing-b2b-saas-cpa',
  },
  {
    icon: <i className="fa fa-share-alt fa-3x text-accent-foreground" aria-hidden="true"></i>,
    title: 'Social Media Marketing',
    description: 'Engage your audience and build a loyal community. We create and manage social media campaigns that resonate with your customers.',
    price: 400,
    discount: 20,
    contactHref: '/contact',
    detailsHref: '/case-study/building-community-with-social-media',
  },
  {
    icon: <i className="fa fa-file-text fa-3x text-accent-foreground" aria-hidden="true"></i>,
    title: 'Content Creation & Marketing',
    description: 'From compelling blog posts to captivating videos, we produce high-quality content that tells your story and drives engagement.',
    price: 450,
    discount: 10,
    contactHref: '/contact',
    detailsHref: '/case-study/healthcare-content-strategy',
  },
  {
    icon: <i className="fa fa-envelope fa-3x text-accent-foreground" aria-hidden="true"></i>,
    title: 'Email Marketing & Automation',
    description: 'Nurture leads and retain customers with personalized email campaigns. We design, write, and manage emails that convert.',
    price: 350,
    discount: 15,
    contactHref: '/contact',
    detailsHref: '/case-study/non-profit-email-marketing',
  },
  {
    icon: <i className="fa fa-bar-chart fa-3x text-accent-foreground" aria-hidden="true"></i>,
    title: 'Analytics & Performance Reporting',
    description: 'Understand what\'s working and what\'s not. We provide clear, actionable reports to guide your marketing decisions.',
    price: 300,
    discount: 5,
    contactHref: '/contact',
    detailsHref: '/case-study',
  }
];

const Countdown = () => {
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
        <span className="font-mono text-xs">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
    );
};


export default function ServicesPage() {
  return (
    <div className="bg-background">
        <div className="container mx-auto px-4 py-12 md:py-20">
            <header className="text-center mb-12 md:mb-16">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Digital Marketing Services</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    A comprehensive suite of digital marketing services designed to elevate your brand and accelerate growth.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
                {services.map((service) => (
                    <Card key={service.title} className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-visible flex flex-col">
                        <div className="flex flex-col h-full p-6 pt-12 flex-1">
                             <div className="absolute -top-10 left-6">
                                <div className="bg-accent p-4 rounded-full ring-8 ring-background flex items-center justify-center w-24 h-24">
                                   {service.icon}
                                </div>
                            </div>
                            <CardHeader className="p-0 mb-2">
                                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 flex-1">
                                <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                                {service.price && service.discount && (
                                    <div className="mt-4 pt-4 border-t">
                                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                                            <p className="text-lg font-bold animated-gradient-text animate-gradient">Starting at</p>
                                            <p className="text-3xl font-bold text-primary">
                                                ${(service.price * (1 - service.discount / 100)).toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="text-sm font-semibold text-accent mt-1 text-right">
                                            Limited offer ends in <Countdown /> | Save {service.discount}%
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </div>
                        {(service.contactHref || service.detailsHref) && (
                            <CardFooter className="p-6 pt-4 flex gap-4">
                                {service.contactHref && (
                                    <Button asChild size="sm" className="flex-1">
                                        <Link href={service.contactHref}>Contact Us</Link>
                                    </Button>
                                )}
                                {service.detailsHref && (
                                    <Button asChild variant="outline" size="sm" className="flex-1">
                                        <Link href={service.detailsHref}>Read Details</Link>
                                    </Button>
                                )}
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>

            <div className="mt-16 md:mt-20 text-center bg-secondary/50 p-10 rounded-lg">
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
