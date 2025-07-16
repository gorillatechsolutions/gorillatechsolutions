
'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassChart,
  faBullseye,
  faShareNodes,
  faPenRuler,
  faCode,
  faEnvelopeOpenText,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const services = [
    {
        icon: <FontAwesomeIcon icon={faMagnifyingGlassChart} className="h-10 w-10 text-primary" />,
        title: "SEO Optimization",
        description: "Boost your visibility on search engines and drive organic traffic with our data-driven SEO strategies.",
        price: "450.00"
    },
    {
        icon: <FontAwesomeIcon icon={faBullseye} className="h-10 w-10 text-primary" />,
        title: "PPC Management",
        description: "Maximize your ROI with targeted pay-per-click campaigns on Google, Meta, and other platforms.",
        price: "650.00"
    },
    {
        icon: <FontAwesomeIcon icon={faShareNodes} className="h-10 w-10 text-primary" />,
        title: "Social Media Marketing",
        description: "Engage your audience and build a loyal community. We create and manage social media campaigns that resonate.",
        price: "320.00"
    },
    {
        icon: <FontAwesomeIcon icon={faPenRuler} className="h-10 w-10 text-primary" />,
        title: "Content Creation",
        description: "From blog posts to video scripts, our creative team produces high-quality content that captivates your audience.",
        price: "280.00"
    },
    {
        icon: <FontAwesomeIcon icon={faCode} className="h-10 w-10 text-primary" />,
        title: "Web Development",
        description: "We build fast, responsive, and user-friendly websites that provide an exceptional user experience.",
        price: "1,200.00"
    },
    {
        icon: <FontAwesomeIcon icon={faEnvelopeOpenText} className="h-10 w-10 text-primary" />,
        title: "Email Marketing",
        description: "Nurture leads and drive conversions with automated email campaigns and personalized newsletters.",
        price: "250.00"
    }
];

const Countdown = ({ discount }: { discount: number }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const offerEndDate = new Date();
            offerEndDate.setDate(offerEndDate.getDate() + 3); // Offer ends 3 days from now
            offerEndDate.setHours(0, 0, 0, 0);

            const now = new Date();
            const difference = offerEndDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                return {
                    days: String(days).padStart(2, '0'),
                    hours: String(hours).padStart(2, '0'),
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0'),
                };
            }
            return { days: '00', hours: '00', minutes: '00', seconds: '00' };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground font-sans">
                Offer ends in: <span className="font-mono font-bold text-foreground">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span> | <span className="font-semibold text-accent">Save {discount}%!</span>
            </p>
        </div>
    );
};


export default function ServicesPage() {
  return (
    <div className="w-full bg-background text-foreground">
        <section className="bg-secondary/30 pt-16 pb-12 md:pt-24 md:pb-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Our Digital Marketing Services</h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    A comprehensive suite of digital marketing services designed to elevate your brand and accelerate growth.
                </p>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                    {services.map((service) => (
                         <Card key={service.title} className="relative text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl pt-16 border-border/80 flex flex-col">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                                <div className="bg-card w-24 h-24 rounded-full flex items-center justify-center ring-8 ring-background border-4 border-primary/50">
                                    {service.icon}
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl text-primary">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6 flex-grow flex flex-col">
                                <p className="text-muted-foreground flex-grow mb-6">{service.description}</p>
                                
                                <div className="border-t pt-4">
                                    <p className="text-sm text-muted-foreground">Starting at</p>
                                    <p className="text-4xl font-bold font-headline text-foreground">${service.price}</p>
                                    <Countdown discount={10} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Ready to Grow Your Business?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Let's discuss how our digital marketing expertise can help you achieve your business goals. Your journey to digital excellence starts here.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/contact">
                      Get Your Free Consultation <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
